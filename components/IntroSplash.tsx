"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLayoutEffect, useState } from "react";

const WORDS = ["BACKLINE", "VENTURES"];

const WORD_STAGGER = 0.25;
const WORD_DURATION = 0.7;
const HOLD_AFTER_REVEAL = 1200;
const TEXT_FADE_OUT = 400;
const COLUMN_COUNT = 5;
const COLUMN_STAGGER = 0.12;
const COLUMN_DURATION = 0.8;

export const INTRO_SPLASH_COMPLETE_EVENT = "introSplashComplete";

// Module-scoped flag — persists across client-side route changes within
// the same page session (resets only on a full page reload), since the
// module itself stays loaded in memory during SPA navigation.
let introHasCompleted = false;

export function isIntroSplashComplete() {
  return introHasCompleted;
}

export default function IntroSplash() {
  const [visible, setVisible] = useState(!introHasCompleted);
  const [textVisible, setTextVisible] = useState(!introHasCompleted);
  const [wiping, setWiping] = useState(false);

  useLayoutEffect(() => {
    // If it already played earlier in this session, don't play it again.
    if (introHasCompleted) return;

    document.body.style.overflow = "hidden";

    const revealMs = (WORD_STAGGER * (WORDS.length - 1) + WORD_DURATION) * 1000;
    const wipeStartMs = revealMs + HOLD_AFTER_REVEAL;
    const wipeAnimMs =
      wipeStartMs +
      TEXT_FADE_OUT +
      (COLUMN_STAGGER * (COLUMN_COUNT - 1) + COLUMN_DURATION) * 1000;

    const t1 = window.setTimeout(() => setTextVisible(false), wipeStartMs);
    const t2 = window.setTimeout(
      () => setWiping(true),
      wipeStartMs + TEXT_FADE_OUT
    );
    const t3 = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      introHasCompleted = true;
      window.dispatchEvent(new Event(INTRO_SPLASH_COMPLETE_EVENT));
    }, wipeAnimMs);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{
        visibility: visible ? "visible" : "hidden",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      {/* Staircase column wipe — sits BEHIND the text (z-0) */}
      <div className="absolute inset-0 z-0 flex">
        {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={wiping ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{
              duration: COLUMN_DURATION,
              delay: wiping ? (COLUMN_COUNT - 1 - i) * COLUMN_STAGGER : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ transformOrigin: "top" }}
            className="flex-1 bg-black"
          />
        ))}
      </div>

      {/* Word-by-word brightness reveal — sits ABOVE the columns (z-10) */}
      <AnimatePresence>
        {textVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TEXT_FADE_OUT / 1000, ease: "easeInOut" }}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          >
            <div className="flex items-center gap-3 px-6">
              {WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ color: "rgba(255,255,255,0.15)" }}
                  animate={{ color: "rgba(255,255,255,1)" }}
                  transition={{
                    duration: WORD_DURATION,
                    delay: i * WORD_STAGGER,
                    ease: "easeOut",
                  }}
                  className="font-display text-4xl sm:text-6xl md:text-7xl tracking-[-0.01em]"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}