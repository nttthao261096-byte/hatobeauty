"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "./content";

export function HeroMedia({ lang }: { lang: Lang }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (paused || motion.matches || document.hidden || !visible) {
        video.pause();
        return;
      }
      // Only the visible scene is attached. No inactive MP4 is fetched.
      if (!video.getAttribute("src")) video.src = "/video/hero-head-spa.mp4";
      void video.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [paused]);

  return (
    <>
      <div className="hero-media" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video hero-video-1"
          loop
          muted
          playsInline
          preload="none"
          poster="/images/service-hair-v2.webp"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
      <button
        className="hero-motion-toggle"
        type="button"
        onClick={() => setPaused(!paused)}
        aria-label={
          lang === "vi"
            ? paused
              ? "Cho phép phát video nền"
              : "Tạm dừng video nền"
            : paused
              ? "Allow background video"
              : "Pause background video"
        }
        aria-pressed={paused}
      >
        <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
      </button>
    </>
  );
}
