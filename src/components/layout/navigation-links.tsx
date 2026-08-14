"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/content/navigation";
import { cn } from "@/lib/utils/cn";

type NavigationLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function NavigationLinks({
  className,
  linkClassName,
  onNavigate,
  variant = "desktop",
}: NavigationLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center", className)}>
      {primaryNavigation.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(`${item.href}/`) || pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "relative inline-flex min-h-11 items-center rounded-md text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] after:absolute after:rounded-full after:bg-[var(--accent)] after:transition-transform",
                variant === "mobile"
                  ? "w-full justify-start px-4 py-3 text-lg hover:bg-[var(--surface)] after:top-1/2 after:left-0 after:h-7 after:w-1 after:origin-center after:-translate-y-1/2 after:scale-y-0 hover:after:scale-y-100"
                  : "px-2.5 after:right-2.5 after:bottom-1 after:left-2.5 after:h-0.5 after:origin-left after:scale-x-0 hover:after:scale-x-100",
                active &&
                  (variant === "mobile"
                    ? "bg-[var(--surface)] text-[var(--text-primary)] after:scale-y-100"
                    : "text-[var(--text-primary)] after:scale-x-100"),
                linkClassName,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
