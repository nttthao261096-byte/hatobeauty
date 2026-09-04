"use client";

import { useEffect, useRef, useState } from "react";
import Image from "./OptimizedImage";
import type { Lang } from "./content";

const scenes = [
  "/video/hero-head-spa.mp4",
  "/video/hero-hair-removal.mp4",
  "/video/hero-brow-warm.mp4",
  "/video/hero-care-beige-clinic.mp4",
];

export function HeroMedia({ lang }: { lang: Lang }) {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [scene, setScene] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (started) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "")) return;
    const start = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(".hero-playback")) return;
      setStarted(true);
      setPlaying(true);
      document.removeEventListener("pointerdown", start);
      document.removeEventListener("keydown", start);
    };
    document.addEventListener("pointerdown", start, { passive: true });
    document.addEventListener("keydown", start);
    return () => {
      document.removeEventListener("pointerdown", start);
      document.removeEventListener("keydown", start);
    };
  }, [started]);

  useEffect(() => {
    const element = container.current;
    if (!element || !started) return;
    let visible = false;
    const syncPlayback = () => {
      if (playing && visible && !document.hidden) {
        video.current?.play().catch(() => setPlaying(false));
      } else video.current?.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });
    observer.observe(element);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [playing, started, scene]);

  return <>
    <div className="hero-media hero-media-optimized" ref={container} aria-hidden="true">
      <Image className="hero-poster" src="/images/service-hair-v2.webp" alt="" fill sizes="(max-width: 760px) 100vw, 64vw" priority fetchPriority="high" />
      {started && <video ref={video} className={`hero-video hero-video-${scene + 1}`} muted playsInline preload="none" src={scenes[scene]} onEnded={() => setScene((current) => (current + 1) % scenes.length)} />}
    </div>
    <button type="button" className="hero-playback" aria-pressed={playing} onClick={() => { setStarted(true); setPlaying((current) => !current); }}>
      {playing ? (lang === "vi" ? "Tạm dừng video" : "Pause video") : (lang === "vi" ? "Phát video" : "Play video")}
    </button>
  </>;
}
