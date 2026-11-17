import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The About Us page used to live at /collection
  async redirects() {
    return [{ source: "/collection", destination: "/about", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
