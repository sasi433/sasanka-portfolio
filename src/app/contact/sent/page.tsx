import { ButtonLink } from "@/components/ui/button";
import { PageIntro } from "@/components/content/page-intro";

export default function ContactSentPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Message sent"
        title="Thank you for getting in touch."
        description="Your message has been accepted. I will respond through the email address you provided."
        actions={<ButtonLink href="/">Return home</ButtonLink>}
      />
    </div>
  );
}
