import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageIntro } from "@/components/content/page-intro";
import { ExternalLink } from "@/components/ui/external-link";
import { SectionContainer } from "@/components/ui/section-container";
import { profile } from "@/content/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Contact",
  "Contact Sasanka Maddala to discuss backend engineering, developer tooling or cloud-native delivery.",
  "/contact",
);

export default function ContactPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Contact"
        title="Start a professional conversation."
        description="Interested in discussing software engineering, backend systems, developer tooling or cloud-native delivery? Get in touch."
      />
      <SectionContainer className="pb-20 sm:pb-24">
        <ContactForm />
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <p className="max-w-2xl leading-7 text-[var(--text-secondary)]">
            Prefer email? Use the professional address below.
          </p>
          <ExternalLink className="mt-4" href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" className="size-4" /> {profile.email}
          </ExternalLink>
        </div>
      </SectionContainer>
    </div>
  );
}
