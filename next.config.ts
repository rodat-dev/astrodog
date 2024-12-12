import type { NextJsWebpackConfig } from 'next/dist/server/config-shared'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    experimental: {
        ppr: true,
        scrollRestoration: true,
        preloadEntriesOnStart: true,
        webpackMemoryOptimizations: true,
        inlineCss: true,
        reactCompiler: true,
    },
    webpack(config: NextJsWebpackConfig) {
        //@ts-expect-error - no type defs
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        return config
    },
    reactStrictMode: true,
}

export default nextConfig
