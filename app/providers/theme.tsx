'use client'
import {
    ThemeProvider as NextThemeProvider,
    ThemeProviderProps,
} from 'next-themes'
import { PropsWithChildren } from 'react'

export default function ThemeProvider(
    props: ThemeProviderProps & PropsWithChildren
) {
    const { children, ...rest } = props
    return (
        <NextThemeProvider
            storageKey="theme"
            attribute="class"
            enableSystem
            {...rest}
        >
            {children}
        </NextThemeProvider>
    )
}
