import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with BACKLINE VENTURES about what your business could build next.",
};

// Replace with your real details.
const WHATSAPP_NUMBER = "15551234567"; // digits only, country code first, no "+" or spaces
const EMAIL_ADDRESS = "hello@backlineventures.example";
const INSTAGRAM_HANDLE = "backlineventures"; // no "@"

const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi BACKLINE VENTURES, I'd like to talk about a project."
)}`;
const EMAIL_HREF = `mailto:${EMAIL_ADDRESS}`;
const INSTAGRAM_HREF = `https://instagram.com/${INSTAGRAM_HANDLE}`;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.96 9.96 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2Zm5.82 14.17c-.25.7-1.24 1.29-2.02 1.45-.55.11-1.26.2-3.66-.79-2.87-1.19-4.72-4.08-4.86-4.27-.14-.19-1.16-1.55-1.16-2.95 0-1.4.72-2.08.98-2.36.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.61.85 2.11.92 2.26.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.27 1.64 2.06 1.13 1.02 2.08 1.34 2.36 1.49.29.15.46.13.63-.07.18-.2.75-.89.95-1.19.2-.3.4-.25.66-.15.27.1 1.72.83 2.02.98.29.15.49.22.56.34.07.13.07.72-.18 1.42Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6 8.5 6.5L20.5 6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <section className="container-px pt-40 pb-28 md:pt-52 md:pb-36">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.08] tracking-[-0.01em] mt-6">
              Let&apos;s build
              <br />
              <span className="text-accent">what&apos;s next.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 text-ink-soft leading-relaxed max-w-sm">
              Tell us about your business and the opportunity you&apos;re
              exploring. We&apos;ll follow up to start the conversation.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label="Message us on WhatsApp"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-accent-soft px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bg"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>

              <a
                href={EMAIL_HREF}
                aria-label={`Email us at ${EMAIL_ADDRESS}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-accent-soft px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bg"
              >
                <EmailIcon />
                Email
              </a>

              <a
                href={INSTAGRAM_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-accent-soft px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bg"
              >
                <InstagramIcon />
                Instagram
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}