import type { Metadata, Viewport } from "next";
import { DM_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "KERNEL 1.0 | Jadavpur University",
    template: "%s | KERNEL 1.0"
  },
  description:
    "KERNEL 1.0 — The official technology event of the Department of Information Technology, Jadavpur University.",
  applicationName: "KERNEL 1.0"
};

export const viewport: Viewport = {
  themeColor: "#0B241A"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${dmMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
