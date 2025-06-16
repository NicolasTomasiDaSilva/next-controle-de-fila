import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "sistema-de-filas-cervantes-temp-bucket.s3.us-east-2.amazonaws.com",
      "sistema-de-filas-cervantes-perm-bucket.s3.us-east-2.amazonaws.com",
    ],
  },
  allowedDevOrigins: ["http://10.0.0.65:3000"],
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
};

export default nextConfig;
