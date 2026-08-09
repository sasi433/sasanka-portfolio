import type { ContactInput } from "@/lib/contact/schema";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ]!,
  );

export function createContactEmail(input: ContactInput, requestId: string) {
  const text = [
    `Portfolio contact from ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
    "",
    `Request ID: ${requestId}`,
  ].join("\n");
  const html = `<h1>Portfolio contact</h1><p><strong>From:</strong> ${escapeHtml(input.name)} &lt;${escapeHtml(input.email)}&gt;</p><p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p><p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p><hr><p>Request ID: ${escapeHtml(requestId)}</p>`;
  return { text, html };
}
