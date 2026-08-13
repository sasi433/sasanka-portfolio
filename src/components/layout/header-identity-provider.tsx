"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type HeaderIdentityContextValue = {
  showHeaderPortrait: boolean;
};

const HeaderIdentityContext = createContext<HeaderIdentityContextValue>({
  showHeaderPortrait: false,
});

export function useHeaderIdentity() {
  return useContext(HeaderIdentityContext);
}

export function HeaderIdentityProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [homePortraitExited, setHomePortraitExited] = useState(false);
  const showHeaderPortrait = pathname !== "/" || homePortraitExited;

  useEffect(() => {
    if (pathname !== "/") return;

    let observer: IntersectionObserver | undefined;
    const frame = requestAnimationFrame(() => {
      setHomePortraitExited(false);
      const hero = document.querySelector<HTMLElement>("[data-hero-stage]");
      if (!hero) return;

      observer = new IntersectionObserver(
        ([entry]) => setHomePortraitExited(!entry.isIntersecting),
        { threshold: 0.12 },
      );
      observer.observe(hero);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <HeaderIdentityContext.Provider value={{ showHeaderPortrait }}>
      {children}
    </HeaderIdentityContext.Provider>
  );
}
