import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    reactCompiler: true,
    inlineCss: true,
    workerThreads: true,
    webpackBuildWorker: true,
  },
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
