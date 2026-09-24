import type { Metadata } from "next";
import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntroSplash from "@/components/IntroSplash";
import SmoothScroll from "@/components/SmoothScroll";

const siteUrl = "https://backlineventures.example.com";
const inter = Inter({ subsets: ["latin"] });
const fraunces = Fraunces({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BACKLINE VENTURES — Strategic Venture Partner",
    template: "%s — BACKLINE VENTURES",
  },
  description:
    "BACKLINE VENTURES partners with established businesses to identify, build and scale their next growth ventures.",
  openGraph: {
    title: "BACKLINE VENTURES — Strategic Venture Partner",
    description:
      "BACKLINE VENTURES partners with established businesses to identify, build and scale their next growth ventures.",
    url: siteUrl,
    siteName: "BACKLINE VENTURES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BACKLINE VENTURES — Strategic Venture Partner",
    description:
      "BACKLINE VENTURES partners with established businesses to identify, build and scale their next growth ventures.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        <IntroSplash />
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
