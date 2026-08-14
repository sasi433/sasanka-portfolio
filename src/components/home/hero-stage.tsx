"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Code2, Network, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { profile } from "@/content/profile";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export function HeroStage() {
  const { resolvedTheme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mediaTheme = mounted && resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const compactViewport = window.matchMedia("(max-width: 720px)").matches;
    const saveData = (navigator as NavigatorWithConnection).connection
      ?.saveData;
    const frame = requestAnimationFrame(() =>
      setVideoEnabled(!reducedMotion && !compactViewport && !saveData),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!videoEnabled || !videoRef.current) return;
    void videoRef.current.play().catch(() => setPaused(true));
  }, [mediaTheme, videoEnabled]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().then(() => setPaused(false));
    } else {
      video.pause();
      setPaused(true);
    }
  }

  return (
    <section
      id="home-intro"
      data-hero-stage
      className="hero-stage"
      aria-labelledby="hero-heading"
    >
      <div
        className="hero-stage__poster hero-stage__poster--dark"
        aria-hidden="true"
      />
      <div
        className="hero-stage__poster hero-stage__poster--light"
        aria-hidden="true"
      />
      {videoEnabled ? (
        <video
          key={mediaTheme}
          ref={videoRef}
          className="hero-stage__video"
          data-media-theme={mediaTheme}
          aria-hidden="true"
          muted
          loop
          playsInline
          preload="metadata"
          poster={`/media/hero-engineering-${mediaTheme}-poster.jpg`}
        >
          <source
            src={`/media/hero-engineering-${mediaTheme}.webm`}
            type="video/webm"
          />
          <source
            src={`/media/hero-engineering-${mediaTheme}.mp4`}
            type="video/mp4"
          />
        </video>
      ) : null}
      <div className="hero-stage__scrim" aria-hidden="true" />

      <div className="hero-stage__content">
        <div className="hero-stage__copy">
          <Badge>Senior Software Engineer</Badge>
          <h1
            id="hero-heading"
            className="mt-6 text-4xl leading-[1.03] font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Backend systems built for{" "}
            <span className="text-[var(--accent-emphasis)]">
              reliable delivery.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--hero-text-secondary)] sm:text-lg sm:leading-8">
            {profile.summary}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/work">View My Work</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Me
            </ButtonLink>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <ExternalLink
              aria-label="Sasanka Maddala on GitHub"
              href={profile.githubUrl}
              className="hero-stage__external-link"
            >
              <Code2 aria-hidden="true" className="size-4" /> GitHub
            </ExternalLink>
            <ExternalLink
              aria-label="Sasanka Maddala on LinkedIn"
              href={profile.linkedInUrl}
              className="hero-stage__external-link"
            >
              <Network aria-hidden="true" className="size-4" /> LinkedIn
            </ExternalLink>
          </div>
          <Link
            href="#engineering-summary"
            className="mt-9 inline-flex min-h-11 items-center gap-2 text-sm text-[var(--hero-text-secondary)]"
          >
            Explore the portfolio{" "}
            <ArrowDown aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div data-hero-portrait className="hero-stage__portrait">
          <div className="hero-stage__portrait-glow" aria-hidden="true" />
          <div className="hero-stage__portrait-frame">
            <Image
              src={profile.headshot.src}
              alt={profile.headshot.alt}
              width={900}
              height={900}
              priority
              loading="eager"
              sizes="(max-width: 1024px) 85vw, 36vw"
              className="aspect-square w-full rounded-[1.55rem] object-cover"
            />
          </div>
        </div>
      </div>

      {videoEnabled ? (
        <button
          type="button"
          className="hero-stage__motion-control"
          onClick={togglePlayback}
          aria-label={`${paused ? "Play" : "Pause"} background animation`}
          aria-pressed={paused}
        >
          {paused ? (
            <Play aria-hidden="true" className="size-4" />
          ) : (
            <Pause aria-hidden="true" className="size-4" />
          )}
          <span className="sr-only">
            {paused ? "Play motion" : "Pause motion"}
          </span>
        </button>
      ) : null}
    </section>
  );
}
