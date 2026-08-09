import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  ...props
}: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_60px_var(--shadow)] transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] sm:p-7",
        className,
      )}
      {...props}
    />
  );
}
