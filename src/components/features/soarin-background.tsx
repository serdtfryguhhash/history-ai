"use client";

import React, { useState, useEffect, useCallback } from "react";

const SCENES = [
  {
    url: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=1920&q=80",
    alt: "Ancient Greek ruins at sunset",
  },
  {
    url: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1920&q=80",
    alt: "Egyptian pyramids at golden hour",
  },
  {
    url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=80",
    alt: "The Colosseum in Rome",
  },
  {
    url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80",
    alt: "Taj Mahal at sunrise",
  },
  {
    url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&q=80",
    alt: "Ancient temple in morning mist",
  },
  {
    url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1920&q=80",
    alt: "Great Wall of China through mountains",
  },
  {
    url: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=1920&q=80",
    alt: "Paris with the Eiffel Tower",
  },
  {
    url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80",
    alt: "Machu Picchu aerial view",
  },
];

// Each scene gets a different Ken Burns animation direction
const ANIMATIONS = [
  "soarin-zoom-tl",    // zoom into top-left
  "soarin-zoom-tr",    // zoom into top-right
  "soarin-zoom-bl",    // zoom into bottom-left
  "soarin-zoom-br",    // zoom into bottom-right
  "soarin-pan-left",   // slow pan left
  "soarin-pan-right",  // slow pan right
  "soarin-zoom-center", // zoom into center
  "soarin-zoom-out",   // start zoomed, pull out
];

export default function SoarinBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  const advance = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SCENES.length);
      setNextIndex((prev) => (prev + 1) % SCENES.length);
      setTransitioning(false);
    }, 2000); // 2s crossfade
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 8000); // Change every 8 seconds
    return () => clearInterval(interval);
  }, [advance]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Current Scene */}
      <div
        key={`scene-${currentIndex}`}
        className={`absolute inset-0 transition-opacity duration-[2000ms] ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          src={SCENES[currentIndex].url}
          alt={SCENES[currentIndex].alt}
          className={`absolute inset-0 w-full h-full object-cover ${ANIMATIONS[currentIndex % ANIMATIONS.length]}`}
        />
      </div>

      {/* Next Scene (fades in) */}
      <div
        key={`scene-next-${nextIndex}`}
        className={`absolute inset-0 transition-opacity duration-[2000ms] ${
          transitioning ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={SCENES[nextIndex].url}
          alt={SCENES[nextIndex].alt}
          className={`absolute inset-0 w-full h-full object-cover ${ANIMATIONS[nextIndex % ANIMATIONS.length]}`}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Warm parchment tint overlay */}
      <div className="absolute inset-0 bg-amber-900/20 mix-blend-overlay" />
    </div>
  );
}
