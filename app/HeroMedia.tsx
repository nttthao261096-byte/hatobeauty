"use client";

import type { Lang } from "./content";

const scenes = [
  "/video/hero-head-spa.mp4",
  "/video/hero-hair-removal.mp4",
  "/video/hero-brow-warm.mp4",
  "/video/hero-care-beige-clinic.mp4",
];

export function HeroMedia(_props: { lang: Lang }) {
  void _props;

  return (
    <div className="hero-media" aria-hidden="true">
      {scenes.map((src, index) => (
        <video
          className={`hero-video hero-video-${index + 1}`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          key={src}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
