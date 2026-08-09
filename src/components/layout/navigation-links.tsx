"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/content/navigation";
import { cn } from "@/lib/utils/cn";

type NavigationLinksProps = {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

export function NavigationLinks({
  className,
  linkClassName,
  onNavigate,
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
                "relative inline-flex min-h-11 items-center rounded-md px-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] after:absolute after:right-2.5 after:bottom-1 after:left-2.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[var(--accent)] after:transition-transform hover:after:scale-x-100",
                active && "text-[var(--text-primary)] after:scale-x-100",
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
