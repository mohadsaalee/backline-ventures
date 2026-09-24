// components/AboutIntro.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

function Counter({
  to,
  suffix = "+",
}: {
  to: number;
  suffix?: string;
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-40px",
  });

  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame: number;

    const duration = 1000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(
        (now - start) / duration,
        1
      );

      setVal(
        Math.round(
          progress * to
        )
      );

      if (progress < 1) {
        frame =
          requestAnimationFrame(
            tick
          );
      }
    };

    frame =
      requestAnimationFrame(
        tick
      );

    return () =>
      cancelAnimationFrame(
        frame
      );
  }, [inView, to]);

  return (
    <span className="font-display text-7xl leading-none sm:text-8xl">
      <span ref={ref}>
        {val}
      </span>
      {suffix}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutIntro() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      
      {/* =========================================================
          MAIN TWO-COLUMN LAYOUT
          ========================================================= */}

      <div
        className="
          grid
          w-full
          grid-cols-1
          items-start
          gap-x-10
          gap-y-14
          md:grid-cols-2
          lg:gap-x-12
          xl:gap-x-16
        "
      >

        {/* =======================================================
            LEFT COLUMN — IMAGE
            ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 1,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="relative w-full self-start"
        >
          <div
            className="
              relative
              aspect-video
              w-full
              overflow-hidden
              bg-[#0d0d0d]
              md:aspect-[16/11]
            "
            style={{
              clipPath:
                "polygon(0 0, 82% 0, 96% 22%, 96% 78%, 82% 100%, 0 100%)",

              WebkitClipPath:
                "polygon(0 0, 82% 0, 96% 22%, 96% 78%, 82% 100%, 0 100%)",
            }}
          >

            {/* ===================================================
                IMAGE
                =================================================== */}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/who-we-are.png"
              alt="BACKLINE VENTURES"
              loading="lazy"
              decoding="async"
              className="
                h-full
                w-full
                object-cover
                grayscale
              "
            />

            {/* ===================================================
                IMAGE VIGNETTE
                =================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/55
                via-black/0
                to-black/10
              "
            />

            {/* ===================================================
                ANIMATED OUTLINE
                =================================================== */}

            <motion.svg
              className="
                pointer-events-none
                absolute
                inset-0
                h-full
                w-full
              "
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <motion.path
                d="
                  M0,0
                  L82,0
                  L96,22
                  L96,78
                  L82,100
                  L0,100
                "
                vectorEffect="non-scaling-stroke"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1"
                initial={{
                  pathLength: 0,
                }}
                whileInView={{
                  pathLength: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.6,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </motion.svg>

            {/* ===================================================
                TOP RIGHT FLOATING LABEL
                =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.6,
              }}
              className="
                absolute
                right-[10%]
                top-[10%]
                text-right
              "
            >
              <p
                className="
                  text-[0.7rem]
                  font-medium
                  leading-relaxed
                  tracking-[0.25em]
                  text-white/85
                  sm:text-xs
                "
              >
                PEOPLE
                <br />
                POWER
                <br />
                POSSIBILITIES
              </p>

              <span
                className="
                  mt-3
                  inline-block
                  h-px
                  w-8
                  bg-white/50
                "
              />
            </motion.div>

            {/* ===================================================
                BOTTOM LEFT FLOATING LABEL
                =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.75,
              }}
              className="
                absolute
                bottom-6
                left-6
                sm:bottom-8
                sm:left-8
              "
            >
              <p
                className="
                  text-[0.7rem]
                  font-medium
                  leading-relaxed
                  tracking-[0.25em]
                  text-white
                  sm:text-xs
                "
              >
                TURNING
                <br />
                POTENTIAL
                <br />
                INTO PROGRESS
              </p>
            </motion.div>

          </div>
        </motion.div>


        {/* =======================================================
            RIGHT COLUMN — CONTENT
            ======================================================== */}

        <div
          className="
            flex
            w-full
            flex-col
            self-start
            px-6
            md:px-0
          "
        >

          {/* =====================================================
              EYEBROW
              ====================================================== */}

          <Reveal delay={0}>
            <div
              className="
                mb-6
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-ink/40
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  tracking-[0.25em]
                  text-ink-soft
                "
              >
                BACKLINE VENTURES
              </span>
            </div>
          </Reveal>


          {/* =====================================================
              MAIN HEADING
              ====================================================== */}

          <Reveal delay={0.1}>
            <h2
              className="
                max-w-[850px]
                font-display
                text-[2.1rem]
                leading-[1.08]
                tracking-[-0.01em]
                sm:text-[2.6rem]
                md:text-[3.1rem]
              "
            >
              BACKLINE VENTURES IS THE
              EXECUTION PARTNER BEHIND
              YOUR NEXT VENTURE
            </h2>
          </Reveal>


          {/* =====================================================
              DESCRIPTION
              ====================================================== */}

          <Reveal delay={0.22}>
            <p
              className="
                mt-7
                max-w-xl
                text-base
                leading-relaxed
                text-ink-soft
                sm:text-lg
              "
            >
              Every business already has a
              backline — products, customers,
              capital, infrastructure,
              knowledge. What&apos;s often
              missing is the strategy, brand
              and execution to turn that
              strength into a new venture.
              That&apos;s where we come in.
            </p>
          </Reveal>


          {/* =====================================================
              ABOUT LINK
              ====================================================== */}

          <Reveal delay={0.34}>
            <Link
              href="/about"
              className="
                group
                mt-10
                inline-flex
                items-center
                gap-4
              "
            >
              <span
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-ink/25
                  transition-colors
                  group-hover:border-ink
                  group-hover:bg-ink
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:stroke-white
                  "
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>

              <span
                className="
                  text-xs
                  font-semibold
                  tracking-[0.2em]
                  sm:text-sm
                "
              >
                ABOUT US
              </span>
            </Link>
          </Reveal>


          {/* =====================================================
              STATS
              ====================================================== */}

          <div
            className="
              mt-14
              grid
              grid-cols-1
              items-start
              gap-x-12
              gap-y-8
              sm:grid-cols-2
            "
          >

            {/* ===================================================
                STAT 1
                =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.15,
              }}
              className="max-w-[220px]"
            >
              <Counter to={3} />

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-ink-soft
                "
              >
                Partnership models built
                around how a business wants
                to grow.
              </p>
            </motion.div>


            {/* ===================================================
                STAT 2
                =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.25,
              }}
              className="max-w-[220px]"
            >
              <Counter to={7} />

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  text-ink-soft
                "
              >
                Stages from first discovery
                to a scaled operating
                venture.
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}