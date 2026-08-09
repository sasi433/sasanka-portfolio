import Link from "next/link";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-background)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label="Sasanka Maddala home"
          className="group inline-flex min-h-11 items-center gap-3 rounded-lg"
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono text-xs font-bold tracking-[-0.03em] text-[var(--accent-emphasis)] transition-colors group-hover:border-[var(--accent)]"
          >
            SM
          </span>
          <span className="hidden text-sm font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:inline">
            Sasanka Maddala
          </span>
        </Link>
        <DesktopNavigation />
        <MobileNavigation />
      </div>
    </header>
  );
}
