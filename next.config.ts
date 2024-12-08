import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    appDocumentPreloading: true,
    scrollRestoration: true,
    strictNextHead: true,
    preloadEntriesOnStart: true,
    webpackMemoryOptimizations: true,
    inlineCss: true,
    reactCompiler: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
