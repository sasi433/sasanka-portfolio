"use client";

import Image from "next/image";
import Link from "next/link";
import { useHeaderIdentity } from "@/components/layout/header-identity-provider";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

export function SiteHeader() {
  const { showHeaderPortrait } = useHeaderIdentity();

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
            data-header-identity={showHeaderPortrait ? "portrait" : "initials"}
            className="relative grid size-9 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition-colors group-hover:border-[var(--accent)]"
          >
            <span
              className={`absolute inset-0 grid place-items-center font-mono text-xs font-bold tracking-[-0.03em] text-[var(--accent-emphasis)] transition-[opacity,transform] duration-300 ${showHeaderPortrait ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}
            >
              SM
            </span>
            <Image
              src="/images/profile/sasanka-maddala.png"
              alt=""
              width={72}
              height={72}
              sizes="36px"
              loading="eager"
              className={`size-full object-cover transition-[opacity,transform] duration-300 ${showHeaderPortrait ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
            />
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
