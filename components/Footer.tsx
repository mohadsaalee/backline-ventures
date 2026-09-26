import Link from "next/link";

const links = [
  { href: "/#pillars", label: "What We Do" },
  { href: "/how-we-build", label: "How We Build" },
  { href: "/ventures", label: "Ventures" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
  { href: "/", label: "Home" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-bg mt-32">
      <div className="container-px pt-20 pb-10 md:pt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <p className="font-display text-3xl sm:text-4xl md:text-8xl tracking-tight">
              BACKLINE VENTURES
            </p>
            <p className="mt-4 text-sm tracking-[0.14em] uppercase text-bg/50">
              Strategic Venture Partner
            </p>
          </div>

          {/* <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:flex sm:flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="underline-link text-sm text-bg/70 hover:text-bg transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav> */}
        </div>

        <div className="mt-20 pt-8 border-t border-bg/15 flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6 text-xs text-bg/50">
          <p>© 2026 BACKLINE VENTURES. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@backlineventures.example"
              className="underline-link hover:text-bg transition-colors"
            >
              hello@backlineventures.example
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="underline-link hover:text-bg transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
