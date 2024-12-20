import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    inlineCss: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
