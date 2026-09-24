"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Our Team" },
  { href: "/ventures", label: "Ventures" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

/**
 * Liquid-glass surface: frosted blur + saturation lift, a soft translucent
 * gradient body, a bright hairline edge, an inner top highlight and a deep
 * drop shadow so the bar looks like a piece of glass floating over the hero.
 */
const GLASS_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.10) 100%)",
  backdropFilter: "blur(18px) saturate(180%) brightness(1.08)",
  WebkitBackdropFilter: "blur(18px) saturate(180%) brightness(1.08)",
  border: "1px solid rgba(255,255,255,0.22)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.45)", // top rim light
    "inset 0 -1px 0 rgba(255,255,255,0.10)", // bottom rim
    "inset 0 0 22px rgba(255,255,255,0.05)", // inner glow
    "0 10px 34px rgba(0,0,0,0.45)", // float shadow
  ].join(", "),
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="relative mx-auto w-full px-6 pt-3 md:px-8 lg:px-10">
        <nav
          className="
            relative
            flex
            h-[58px]
            items-center
            justify-between
            rounded-[22px]
            px-5
            md:h-[64px]
            md:px-7
          "
          style={GLASS_STYLE}
        >
          {/* Liquid sheen — soft light band across the top + a faint bottom glint */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]"
          >
            <span
              className="absolute inset-x-0 top-0 h-1/2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 100%)",
              }}
            />
            <span
              className="absolute -left-[10%] top-0 h-full w-[45%]"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)",
              }}
            />
            <span
              className="absolute inset-x-8 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              }}
            />
          </span>

          {/* LEFT — BRAND */}
          <Link
            href="/"
            className="
              relative
              flex
              items-center
              gap-3
              text-white
              transition-opacity
              duration-300
              hover:opacity-75
            "
            onClick={() => setIsMenuOpen(false)}
          >
            <span
              className="
                text-[19px]
                font-bold
                tracking-[-0.04em]
                md:text-[21px]
              "
            >
              BACKLINE
            </span>
          </Link>

          {/* CENTER — NAVIGATION */}
          <div
            className="
              absolute
              left-1/2
              hidden
              -translate-x-1/2
              items-center
              gap-10
              lg:flex
            "
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  text-[14px]
                  font-medium
                  text-white/80
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-white/10
              text-white
              md:hidden
            "
          >
            <span className="flex flex-col gap-[4px]">
              <span
                className={`block h-px w-4 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-[2.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-4 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-[2.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>

        </nav>

        {/* MOBILE MENU PANEL — sibling of <nav> so its own glass blur sees the page behind it */}
        {isMenuOpen && (
          <div
            className="
              absolute
              inset-x-6
              top-[78px]
              flex
              flex-col
              rounded-[22px]
              p-5
              md:hidden
            "
            style={{
              ...GLASS_STYLE,
              background:
                "linear-gradient(135deg, rgba(60,60,60,0.55) 0%, rgba(8,8,8,0.82) 100%)",
              backdropFilter: "blur(22px) saturate(180%)",
              WebkitBackdropFilter: "blur(22px) saturate(180%)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="
                  border-b
                  border-white/10
                  py-3
                  text-[15px]
                  font-medium
                  text-white/85
                  transition-colors
                  duration-300
                  last:border-b-0
                  hover:text-white
                "
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}