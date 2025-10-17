import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Pattern untuk semua domain Supabase
      }
    ],
  },
};

export default nextConfig;
