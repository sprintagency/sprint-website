import type { Metadata } from "next";

// The admin area is never indexed (also Disallowed in robots.ts).
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
