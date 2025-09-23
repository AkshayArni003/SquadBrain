import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }, { hostname: "lh3.googleusercontent.com" }]
  }
};

export default nextConfig;
