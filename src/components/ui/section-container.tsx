import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

export function SectionContainer({
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={cn(
        "content-section mx-auto w-full max-w-[96rem] px-5 sm:px-8 lg:px-12",
        className,
      )}
      {...props}
    />
  );
}
