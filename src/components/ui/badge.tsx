import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

export function Badge({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 font-mono text-[0.6875rem] font-semibold tracking-[0.12em] text-[var(--accent-emphasis)] uppercase",
        className,
      )}
      {...props}
    />
  );
}
