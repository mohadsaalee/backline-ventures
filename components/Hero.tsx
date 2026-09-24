"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  INTRO_SPLASH_COMPLETE_EVENT,
  isIntroSplashComplete,
} from "./IntroSplash";
import LaneFunnel from "./hero/LaneFunnel";
import LogoMarquee from "./hero/LogoMarquee";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINES = ["BACKLINE", "VENTURES"] as const;
const TYPE_SPEED = 95; // ms per character
const LINE_GAP = 320; // pause between the two lines

function Chevrons() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 2.5L6.5 7L2 11.5M7.5 2.5L12 7L7.5 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  // Content waits for the intro splash to finish, then the headline types in.
  const [ready, setReady] = useState(false);
  const [line0, setLine0] = useState("");
  const [line1, setLine1] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const onDone = () => setReady(true);
    if (isIntroSplashComplete()) {
      const id = window.setTimeout(onDone, 0);
      return () => window.clearTimeout(id);
    }
    window.addEventListener(INTRO_SPLASH_COMPLETE_EVENT, onDone);
    return () => window.removeEventListener(INTRO_SPLASH_COMPLETE_EVENT, onDone);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const timers: number[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: show the finished headline straight away.
    if (reduced) {
      timers.push(
        window.setTimeout(() => {
          setLine0(LINES[0]);
          setLine1(LINES[1]);
          setTypingDone(true);
        }, 0)
      );
      return () => timers.forEach(window.clearTimeout);
    }

    const typeLine = (index: 0 | 1, onComplete: () => void) => {
      const text = LINES[index];
      let i = 0;
      const step = () => {
        i += 1;
        const slice = text.slice(0, i);
        if (index === 0) setLine0(slice);
        else setLine1(slice);
        if (i < text.length) timers.push(window.setTimeout(step, TYPE_SPEED));
        else onComplete();
      };
      timers.push(window.setTimeout(step, 250));
    };

    typeLine(0, () => {
      timers.push(
        window.setTimeout(() => {
          typeLine(1, () => setTypingDone(true));
        }, LINE_GAP)
      );
    });

    return () => timers.forEach(window.clearTimeout);
  }, [ready]);

  // Caret sits on whichever line is currently being typed.
  const caretOnLine0 = ready && line0.length < LINES[0].length;
  const caretOnLine1 = ready && !typingDone && !caretOnLine0;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  const caret = (visible: boolean) => (
    <span
      aria-hidden="true"
      className="ml-[0.06em] inline-block h-[0.72em] w-[0.05em] animate-pulse bg-white align-middle"
      style={{ visibility: visible ? "visible" : "hidden" }}
    />
  );

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black text-white">
      {/* Lane funnel + travelling light dots */}
      <LaneFunnel interactive />

      {/* soft vignette keeps the edges dark like the reference */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="container-px relative z-10 flex flex-1 flex-col items-center justify-center pt-40 pb-36 text-center sm:pb-40">
        <div className="w-fit max-w-full">
        <h1
          aria-label="BACKLINE VENTURES"
          className="font-display text-[clamp(2.2rem,13vw,4.2rem)] leading-[0.88] tracking-[-0.045em] sm:text-[clamp(3.2rem,10.5vw,11.5rem)]"
        >
          {/* Each line reserves its full width invisibly, so nothing shifts while typing */}
          <span aria-hidden="true" className="relative block">
            <span className="relative inline-block text-left">
              <span className="invisible">{LINES[0]}</span>
              <span className="absolute left-0 top-0 whitespace-nowrap text-white">
                {line0}
                {caret(caretOnLine0)}
              </span>
            </span>
          </span>

          <span aria-hidden="true" className="relative block">
            <span className="relative inline-block text-left">
              <span className="invisible">{LINES[1]}</span>
              <span className="absolute left-0 top-0 whitespace-nowrap">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #f2f2f2 8%, rgba(190,190,190,0.85) 55%, rgba(120,120,120,0.55) 100%)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {line1}
                </span>
                {caret(caretOnLine1)}
              </span>
            </span>
          </span>
        </h1>

        <motion.p
          className="mt-5 ml-auto w-0 min-w-full max-w-[640px] text-right text-[clamp(1rem,4.4vw,1.2rem)] leading-[1.6] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.9)] sm:mt-8 sm:w-auto sm:min-w-0 sm:text-[1.2rem] sm:leading-[1.75] md:text-[1.3rem]"
          {...fade(0.05)}
        >
          Every business has a backline. We&apos;re the strategic and
          <br className="hidden sm:block" /> execution partner behind
          what&apos;s next.
        </motion.p>
        </div>
{/* 
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          {...fade(0.2)}
        >
          <Link
            href="/contact"
            className="group relative inline-flex h-[50px] items-center gap-3 overflow-hidden rounded-full border border-white/25 bg-black px-7 text-[0.95rem] font-semibold uppercase tracking-[-0.01em] text-white transition-colors duration-300 hover:border-white/60"
          >
            Get started
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              <Chevrons />
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
            />
          </Link>

          <Link
            href="/how-we-build"
            className="inline-flex h-[50px] items-center rounded-full bg-white px-7 text-[0.95rem] font-medium uppercase tracking-[-0.01em] text-black transition-opacity duration-300 hover:opacity-85"
          >
            Request a demo
          </Link>
        </motion.div> */}
      </div>

      {/* Logo strip */}
      {/* <motion.div
        className="absolute inset-x-0 bottom-0 z-10 pb-9 sm:pb-11"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.1, delay: 0.6 }}
      >
        <LogoMarquee />
      </motion.div> */}
    </section>
  );
}