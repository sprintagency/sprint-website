import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The showreel video is served from the Vidzflow CDN; nothing else external.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "r2.vidzflow.com" },
    ],
  },
  // Sensible SEO/security response headers on every route.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
