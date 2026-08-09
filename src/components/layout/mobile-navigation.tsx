"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavigationLinks } from "@/components/layout/navigation-links";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => {
        dialog.querySelector<HTMLAnchorElement>("a[href]")?.focus();
      });
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function closeMenu({ restoreFocus = true } = {}) {
    setOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="mobile-navigation-title"
        className="mobile-navigation-dialog"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => setOpen(false)}
      >
        <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-5 py-4 sm:px-8">
          <div className="flex min-h-14 items-center justify-between border-b border-[var(--border)]">
            <p
              id="mobile-navigation-title"
              className="text-sm font-semibold tracking-[-0.01em]"
            >
              Navigation
            </p>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => closeMenu()}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col py-8"
          >
            <NavigationLinks
              className="flex-col items-stretch gap-1"
              linkClassName="w-full justify-between px-3 py-3 text-lg after:right-3 after:bottom-2 after:left-3"
              onNavigate={() => closeMenu({ restoreFocus: false })}
            />
            <div className="mt-auto border-t border-[var(--border)] pt-6">
              <ThemeToggle showLabel className="w-full justify-start" />
            </div>
          </nav>
        </div>
      </dialog>
    </div>
  );
}
