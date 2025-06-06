import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  allowedDevOrigins: [
    "http://10.0.0.65:3000",
    "https://8718-45-191-38-22.ngrok-free.app",
    "https://36d4-45-191-38-22.ngrok-free.app",
  ],
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
};

export default nextConfig;
