"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Adds smooth, eased ("buttery") scroll momentum to mouse-wheel scrolling
 * site-wide, on top of the native scroll the browser already does.
 *
 * Kept deliberately light:
 * - Skipped entirely for prefers-reduced-motion.
 * - Touch scrolling on phones/tablets is left as native (Lenis only
 *   intercepts wheel input by default), since native touch scroll is
 *   already smooth and hijacking it tends to feel worse, not better.
 * - Runs its own single requestAnimationFrame loop and cleans up fully
 *   on unmount, same pattern as the WebGL effects elsewhere in the site.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
    });

    let frameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
