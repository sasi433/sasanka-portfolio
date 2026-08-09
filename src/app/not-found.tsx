import { ButtonLink } from "@/components/ui/button";
import { PageIntro } from "@/components/content/page-intro";

export default function NotFound() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="404"
        title="That page could not be found."
        description="The address may be outdated, or the page may have moved."
        actions={
          <>
            <ButtonLink href="/">Return home</ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              Browse work
            </ButtonLink>
          </>
        }
      />
    </div>
  );
}
