import { ExternalLinkIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

export function ExternalLink({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[var(--text-secondary)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--text-primary)] hover:decoration-[var(--accent)]",
        className,
      )}
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    >
      {children}
      <ExternalLinkIcon aria-hidden="true" className="size-4" />
    </a>
  );
}
