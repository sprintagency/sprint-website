import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://madebysprint.com"),
  title: "Sprint — Creative & tech that work",
  description:
    "Creative services and business platforms powered by AI, built to save you time, freeing your team to move faster and focus on what matters.",
  openGraph: {
    title: "Sprint — Creative & tech that work",
    description:
      "Your creative department and AI platform team. Established 2011.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${montserrat.variable}`}
    >
      <body
        style={{
          background: "#0c1321",
          color: "#ffffff",
          fontFamily: "var(--font-sans)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
