'use client'
import { motion } from 'motion/react'
import { background } from '@/app/ui/patterns/background'
import { cn } from '@/app/lib/utils'
import { Chat } from '../ui/chat/chat'
import { Suspense } from 'react'

export default function Page() {
    return (
        <motion.div
            layout
            exit={{ translateY: '100dvh' }}
            transition={{
                duration: 0.5,
                ease: 'easeInOut',
            }}
            className="starting:translate-y-[100dvh] bottom-0 left-0 h-full w-full bg-transparent transition-all duration-500"
        >
            <Suspense fallback={null}>
                <Chat />
            </Suspense>
        </motion.div>
    )
}
