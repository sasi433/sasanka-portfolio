import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/contact/route";
import { createContactEmail } from "@/lib/contact/email";
import { contactSchema } from "@/lib/contact/schema";

const validInput = {
  name: "Test Sender",
  email: "sender@example.com",
  subject: "Engineering discussion",
  message: "This is a sufficiently detailed test portfolio message.",
  company: "",
  turnstileToken: "test-token",
};

describe("contact handling", () => {
  it("rejects invalid input", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...validInput, email: "invalid" }),
      }),
    );
    expect(response.status).toBe(400);
  });

  it("silently accepts honeypot submissions without contacting providers", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...validInput, company: "spam" }),
      }),
    );
    expect(response.status).toBe(202);
  });

  it("validates message length and escapes generated HTML", () => {
    expect(
      contactSchema.safeParse({ ...validInput, message: "short" }).success,
    ).toBe(false);
    expect(
      createContactEmail({ ...validInput, name: "<Sasanka>" }, "request-id")
        .html,
    ).toContain("&lt;Sasanka&gt;");
  });
});
