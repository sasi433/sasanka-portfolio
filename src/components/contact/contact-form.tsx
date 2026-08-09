"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/contact/schema";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { company: "", turnstileToken: "" },
  });

  async function onSubmit(values: ContactInput) {
    setServerError("");
    const result = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const payload = (await result.json()) as {
      message: string;
      requestId?: string;
    };
    if (result.ok) {
      router.push("/contact/sent");
      return;
    }
    setServerError(
      `${payload.message}${payload.requestId ? ` Reference: ${payload.requestId}` : ""}`,
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-2xl space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
    >
      <Field label="Name" error={errors.name?.message}>
        <input
          {...register("name")}
          autoComplete="name"
          className="form-input"
        />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          className="form-input"
        />
      </Field>
      <Field label="Subject" error={errors.subject?.message}>
        <input {...register("subject")} className="form-input" />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={7}
          className="form-input resize-y"
        />
      </Field>
      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label>
          Company
          <input {...register("company")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {siteKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
          />
          <div
            className="cf-turnstile"
            data-sitekey={siteKey}
            data-callback="portfolioTurnstileCallback"
          />
        </>
      ) : (
        <p className="text-sm text-[var(--text-secondary)]">
          The secure contact form is awaiting its anti-bot configuration. Email
          remains available below.
        </p>
      )}
      <input type="hidden" {...register("turnstileToken")} />
      {errors.turnstileToken ? (
        <p role="alert" className="text-sm text-[var(--accent-emphasis)]">
          {errors.turnstileToken.message}
        </p>
      ) : null}
      {serverError ? (
        <p role="alert" className="text-sm text-[var(--accent-emphasis)]">
          {serverError}
        </p>
      ) : null}
      <Button type="submit" disabled={isSubmitting || !siteKey}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
      {siteKey ? (
        <TurnstileBridge
          onToken={(token) =>
            setValue("turnstileToken", token, { shouldValidate: true })
          }
        />
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <span className="mt-2 block">{children}</span>
      {error ? (
        <span
          role="alert"
          className="mt-2 block font-normal text-[var(--accent-emphasis)]"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

function TurnstileBridge({ onToken }: { onToken: (token: string) => void }) {
  if (typeof window !== "undefined")
    (
      window as typeof window & {
        portfolioTurnstileCallback?: (token: string) => void;
      }
    ).portfolioTurnstileCallback = onToken;
  return null;
}
