import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-[var(--text-secondary)] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <p>Copyright © 2026 Sasanka Maddala. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="rounded-sm font-medium text-[var(--text-primary)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]"
          >
            Privacy
          </Link>
          <Link
            href="/"
            className="rounded-sm font-medium text-[var(--text-primary)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]"
          >
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}
