import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

export function SectionContainer({
  className,
  routeLabel,
  ...props
}: ComponentPropsWithoutRef<"section"> & { routeLabel?: string }) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",
        routeLabel && "route-stage",
        className,
      )}
      data-route-stop={routeLabel ? "" : undefined}
      data-route-label={routeLabel}
      {...props}
    />
  );
}
