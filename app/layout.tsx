import type { Metadata } from 'next'
import '@/app/globals.css'
import StarryBackground from '@/app/ui/layout/starry-background'
import Navbar from '@/app/ui/navigation/navbar'
import { text } from '@/app/ui/styles/text'
import ThemeProvider from '@/app/providers/theme'
import PageTransitionEffect from '@/app/ui/navigation/page-effect'
import React, { Suspense } from 'react'
import AstrodogScene from '@/app/ui/3d/astrodog-scene'
import { cn } from '@/app/lib/utils'

export const metadata: Metadata = {
    title: 'Astrodog',
    description: 'The home of Dog Sitting Manchester and more!',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    text().base(),
                    'pointer-events-none m-0 h-dvh w-dvw p-0'
                )}
            >
                <ThemeProvider>
                    {/* <StarryBackground /> */}

                    <Suspense fallback={null}>
                        <AstrodogScene />
                    </Suspense>

                    <section
                        id="app-shell"
                        className={
                            'z-1 absolute left-0 top-0 flex h-dvh w-dvw flex-col'
                        }
                    >
                        <Navbar />
                        <PageTransitionEffect>{children}</PageTransitionEffect>
                    </section>
                </ThemeProvider>
            </body>
        </html>
    )
}
