import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

export function SectionContainer({
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",
        className,
      )}
      {...props}
    />
  );
}
