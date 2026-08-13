import { PageIntro } from "@/components/content/page-intro";
import { SectionContainer } from "@/components/ui/section-container";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Privacy",
  "How contact submissions, abuse prevention and privacy-focused analytics are handled on this portfolio.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Privacy"
        title="A minimal, purpose-specific privacy approach."
        description="This portfolio is designed to collect only what is necessary for professional communication and basic private traffic measurement."
      />
      <SectionContainer id="privacy-details" className="pb-20 sm:pb-24">
        <div className="max-w-3xl space-y-8 leading-7 text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Contact messages
            </h2>
            <p className="mt-3">
              When the contact form is enabled, submitted name, email and
              message content will be used only to respond to the enquiry.
              Messages will be delivered by email and will not be stored in an
              application database.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Abuse prevention
            </h2>
            <p className="mt-3">
              The contact form will use Cloudflare Turnstile and rate limiting
              to reduce automated abuse. Technical request data may be processed
              for security and delivery.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Analytics
            </h2>
            <p className="mt-3">
              When enabled, Cloudflare Web Analytics provides privacy-focused
              aggregate traffic information. No public visitor counter is
              displayed.
            </p>
          </section>
        </div>
      </SectionContainer>
    </div>
  );
}
