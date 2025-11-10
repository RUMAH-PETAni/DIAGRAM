import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 💡 Nonaktifkan optimasi CSS modern yang bikin HP lama error
  experimental: {
    optimizeCss: false, // Masih valid untuk build biasa
  },

  // 💡 Tambahkan fallback modern build
  compiler: {
    // pastikan styled-components dan lain-lain tetap bisa jalan
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
