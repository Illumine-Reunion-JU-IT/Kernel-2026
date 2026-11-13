import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { Cursor } from "@/components/effects/cursor";
import { Preloader } from "@/components/effects/preloader";
import { ScrollRail } from "@/components/effects/scroll-rail";
import { siteContent } from "@/lib/content";

/* Archivo is a variable family with a width axis: its 125% black italic carries the brochure wordmark. */
const display = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap"
});
const body = Archivo({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const condensed = Anton({ subsets: ["latin"], weight: "400", variable: "--font-condensed", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "KERNEL 1.0 | Jadavpur University", template: "%s | KERNEL 1.0" },
  description:
    "KERNEL 1.0: the official technology event of the Department of Information Technology, Jadavpur University. Compete, create, connect.",
  applicationName: "KERNEL 1.0",
  openGraph: { title: "KERNEL 1.0", description: siteContent.tagline, type: "website" }
};

export const viewport: Viewport = { themeColor: "#050308" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${condensed.variable} ${mono.variable}`}>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-20 bg-sand px-4 py-2 font-mono text-sm font-bold text-void focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <ScrollRail />
        <Navbar />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
