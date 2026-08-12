"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type JourneyStop = {
  id: string;
  label: string;
};

type JourneyContextValue = {
  showHeaderPortrait: boolean;
};

const JourneyContext = createContext<JourneyContextValue>({
  showHeaderPortrait: false,
});

export function useJourney() {
  return useContext(JourneyContext);
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const routePathRef = useRef<SVGPathElement>(null);
  const travelledPathRef = useRef<SVGPathElement>(null);
  const travellerRef = useRef<SVGCircleElement>(null);
  const activeIdRef = useRef("");
  const [stops, setStops] = useState<JourneyStop[]>([]);
  const [activeId, setActiveId] = useState("");
  const [homePortraitExited, setHomePortraitExited] = useState(false);
  const showHeaderPortrait = pathname !== "/" || homePortraitExited;

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const cleanupObserver: { current: () => void } = {
      current: () => undefined,
    };
    const frame = requestAnimationFrame(() => {
      setHomePortraitExited(false);
      const portrait = document.querySelector<HTMLElement>(
        "[data-hero-portrait]",
      );
      if (!portrait) return;

      const observer = new IntersectionObserver(
        ([entry]) => setHomePortraitExited(!entry.isIntersecting),
        { threshold: 0.28 },
      );
      observer.observe(portrait);
      cleanupObserver.current = () => observer.disconnect();
    });

    return () => {
      cancelAnimationFrame(frame);
      cleanupObserver.current();
    };
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    let animationFrame = 0;
    let routeStops: HTMLElement[] = [];

    function discoverStops() {
      routeStops = Array.from(
        document.querySelectorAll<HTMLElement>("[data-route-stop]"),
      );
      const discovered = routeStops
        .filter((stop) => stop.id && stop.dataset.routeLabel)
        .map((stop) => ({ id: stop.id, label: stop.dataset.routeLabel ?? "" }));
      setStops(discovered);
      const firstId = discovered[0]?.id ?? "";
      activeIdRef.current = firstId;
      setActiveId(firstId);
      updateJourney();
    }

    function updateJourney() {
      animationFrame = 0;
      const scrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      root.style.setProperty("--route-progress", progress.toFixed(4));
      root.style.setProperty("--route-shift", `${progress * 160}px`);

      const path = routePathRef.current;
      const travelled = travelledPathRef.current;
      const traveller = travellerRef.current;
      if (path && travelled && traveller) {
        const length = path.getTotalLength();
        travelled.style.strokeDasharray = `${length}`;
        travelled.style.strokeDashoffset = `${length * (1 - progress)}`;
        const point = path.getPointAtLength(length * progress);
        traveller.setAttribute("cx", `${point.x}`);
        traveller.setAttribute("cy", `${point.y}`);
      }

      if (routeStops.length) {
        const focusLine = window.innerHeight * 0.38;
        const closest = routeStops.reduce((selected, candidate) => {
          const selectedDistance = Math.abs(
            selected.getBoundingClientRect().top - focusLine,
          );
          const candidateDistance = Math.abs(
            candidate.getBoundingClientRect().top - focusLine,
          );
          return candidateDistance < selectedDistance ? candidate : selected;
        });
        if (closest.id !== activeIdRef.current) {
          activeIdRef.current = closest.id;
          setActiveId(closest.id);
        }
      }
    }

    function requestJourneyUpdate() {
      if (!animationFrame)
        animationFrame = requestAnimationFrame(updateJourney);
    }

    const discoveryFrame = requestAnimationFrame(discoverStops);
    window.addEventListener("scroll", requestJourneyUpdate, { passive: true });
    window.addEventListener("resize", requestJourneyUpdate);

    return () => {
      cancelAnimationFrame(discoveryFrame);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestJourneyUpdate);
      window.removeEventListener("resize", requestJourneyUpdate);
      root.style.removeProperty("--route-progress");
      root.style.removeProperty("--route-shift");
    };
  }, [pathname]);

  const activeIndex = Math.max(
    stops.findIndex((stop) => stop.id === activeId),
    0,
  );

  return (
    <JourneyContext.Provider value={{ showHeaderPortrait }}>
      <div className="journey-atmosphere" aria-hidden="true" />
      {stops.length > 1 ? (
        <nav className="journey-map" aria-label="Page journey">
          <svg
            aria-hidden="true"
            viewBox="0 0 76 640"
            preserveAspectRatio="none"
          >
            <path
              ref={routePathRef}
              className="journey-map-path"
              d="M38 0 C68 72 8 126 38 204 S68 334 38 410 S8 548 38 640"
            />
            <path
              ref={travelledPathRef}
              className="journey-map-travelled"
              d="M38 0 C68 72 8 126 38 204 S68 334 38 410 S8 548 38 640"
            />
            <circle
              ref={travellerRef}
              className="journey-map-traveller"
              cx="38"
              cy="0"
              r="5"
            />
          </svg>
          <ol>
            {stops.map((stop, index) => (
              <li
                key={stop.id}
                className={stop.id === activeId ? "active" : ""}
              >
                <a href={`#${stop.id}`} aria-label={`Go to ${stop.label}`}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{stop.label}</strong>
                </a>
              </li>
            ))}
          </ol>
          <p className="journey-map-status" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            {stops[activeIndex]?.label}
          </p>
        </nav>
      ) : null}
      {children}
    </JourneyContext.Provider>
  );
}
