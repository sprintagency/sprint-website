import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The showreel video is served from the Vidzflow CDN; nothing else external.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "r2.vidzflow.com" },
    ],
  },
};

export default nextConfig;
