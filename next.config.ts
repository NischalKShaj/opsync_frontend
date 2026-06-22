import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  allowedDevOrigins: ["192.168.1.34", "localhost:3000"],
};

export default nextConfig;
