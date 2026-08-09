import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Resend } from "resend";
import { createContactEmail } from "@/lib/contact/email";
import { contactSchema } from "@/lib/contact/schema";

export const runtime = "nodejs";

function response(message: string, status: number, requestId: string) {
  return Response.json(
    { message, requestId },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return response("Invalid request.", 400, requestId);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success)
    return response("Check the form fields and try again.", 400, requestId);
  if (parsed.data.company) return response("Message accepted.", 202, requestId);

  let env: CloudflareEnv;
  try {
    env = getCloudflareContext().env;
  } catch {
    env = process.env as CloudflareEnv;
  }

  const clientAddress = request.headers.get("cf-connecting-ip") ?? "local";
  if (env.CONTACT_RATE_LIMITER) {
    const result = await env.CONTACT_RATE_LIMITER.limit({ key: clientAddress });
    if (!result.success)
      return response(
        "Please wait before sending another message.",
        429,
        requestId,
      );
  }

  if (
    !env.TURNSTILE_SECRET_KEY ||
    !env.RESEND_API_KEY ||
    !env.CONTACT_TO_EMAIL ||
    !env.CONTACT_FROM_EMAIL
  ) {
    return response(
      "The contact service is not configured yet. Please use email instead.",
      503,
      requestId,
    );
  }

  const verification = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: parsed.data.turnstileToken,
        remoteip: clientAddress,
      }),
    },
  );
  const turnstile = (await verification.json()) as { success?: boolean };
  if (!turnstile.success)
    return response(
      "The anti-bot check could not be verified.",
      400,
      requestId,
    );

  const content = createContactEmail(parsed.data, requestId);
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: parsed.data.email,
      subject: `[Portfolio] ${parsed.data.subject}`,
      ...content,
    });
    if (result.error) throw new Error("provider rejected request");
  } catch {
    return response(
      "The message could not be sent. Please use email or try again later.",
      502,
      requestId,
    );
  }
  return response("Message sent.", 200, requestId);
}
