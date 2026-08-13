import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/ui/section-container";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  routeId?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  actions,
  routeId,
}: PageIntroProps) {
  const id = routeId ?? `${eyebrow.toLowerCase().replaceAll(" ", "-")}-intro`;
  return (
    <SectionContainer id={id} className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-3xl">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
          {description}
        </p>
        {actions ? (
          <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        ) : null}
      </div>
    </SectionContainer>
  );
}
