import { Cloud, Layers3, MonitorSmartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";
import { SectionContainer } from "@/components/ui/section-container";

export default function Home() {
  return (
    <div className="page-shell">
      <SectionContainer className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <Badge>Phase 1 foundation</Badge>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            A clear, accessible interface foundation for the portfolio.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            The shared layout, responsive navigation, theme system and reusable
            components are ready. Final portfolio content and deeper routes
            remain intentionally deferred to later phases.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#component-foundation">
              Review the foundation
            </ButtonLink>
            <ExternalLink href="https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/">
              Cloudflare runtime
            </ExternalLink>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer
        id="component-foundation"
        aria-labelledby="foundation-heading"
        className="pb-20 sm:pb-24 lg:pb-32"
      >
        <div className="mb-8 max-w-2xl">
          <p className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-emphasis)] uppercase">
            Shared system
          </p>
          <h2
            id="foundation-heading"
            className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)] sm:text-3xl"
          >
            Built for the work ahead
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <Layers3
              aria-hidden="true"
              className="size-5 text-[var(--focus)]"
            />
            <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
              Reusable by default
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Focused layout and UI primitives keep future pages consistent and
              maintainable.
            </p>
          </Card>
          <Card>
            <MonitorSmartphone
              aria-hidden="true"
              className="size-5 text-[var(--focus)]"
            />
            <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
              Responsive and accessible
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Keyboard focus, reduced motion and mobile navigation are part of
              the foundation rather than later fixes.
            </p>
          </Card>
          <Card>
            <Cloud aria-hidden="true" className="size-5 text-[var(--focus)]" />
            <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
              Workers-ready
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              The interface remains compatible with the established Next.js and
              Cloudflare OpenNext runtime.
            </p>
          </Card>
        </div>
      </SectionContainer>
    </div>
  );
}
