'use client'
import React, { useEffect, useState } from 'react'
import * as Toggle from '@radix-ui/react-toggle'
import { MagicWandIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'motion/react'
import DogSkeletonIcon from '@/app/ui/skeleton/dog-skeleton-icon'
import AnimatedText from '../animated/text'

const AnimatedWand = motion.create(MagicWandIcon, { forwardMotionProps: true })

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    })

    if (!mounted) return <DogSkeletonIcon />

    return (
        <Toggle.Root
            aria-label="Toggle Theme"
            className="duration-400 flex scale-100 cursor-pointer items-center justify-center rounded border-transparent stroke-1 leading-4 transition-all will-change-contents hover:scale-105 hover:text-emerald-200"
            onClick={() => setTheme(theme === 'magic' ? 'light' : 'magic')}
        >
            <AnimatePresence mode="wait">
                <AnimatedWand className="size-6 text-xl" />
            </AnimatePresence>
        </Toggle.Root>
    )
}
