import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true, // Displays fetch path + cache
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", //! Insecure, don't do this with an actual app.
      },
      {
        protocol: "http",
        hostname: "**", //! Insecure, don't do this with an actual app.
      },
    ],
  },
  // experimental: {
  //   reactCompiler: true // Gotta go fast 🦔
  // }
}

export default nextConfig
