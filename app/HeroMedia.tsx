"use client";

import { useEffect, useRef } from "react";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (motion.matches || document.hidden || !visible) {
        video.pause();
        return;
      }
      // Only the visible scene is attached. No inactive MP4 is fetched.
      if (!video.getAttribute("src")) video.src = "/video/hero-head-spa.mp4";
      void video.play().catch(() => undefined);
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
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-video hero-video-1"
        loop
        muted
        playsInline
        preload="none"
        poster="/images/service-hair-v2.webp"
      />
    </div>
  );
}
