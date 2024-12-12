'use client'
import { motion, AnimatePresence, Variants } from 'motion/react'
import { usePathname } from 'next/navigation'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useContext, useRef } from 'react'
import { vstack } from '../patterns/vstack'

function FrozenRouter(props: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext ?? {})
    const frozen = useRef(context).current

    if (!frozen) {
        return <>{props.children}</>
    }

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {props.children}
        </LayoutRouterContext.Provider>
    )
}

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
    const key = usePathname()

    const variants = (path: string): Variants => {
        switch (path) {
            case '/chat': {
                return {
                    start: {
                        translateY: '100dvh',
                    },
                    in: {
                        translateY: 0,
                    },
                    out: {
                        translateY: '100dvh',
                    },
                } as Variants
            }
            default: {
                return {
                    start: {
                        opacity: 0,
                        filter: 'blur(6px)',
                    },
                    in: {
                        opacity: 1,
                        filter: 'blur(0)',
                    },
                    out: {
                        opacity: 0,
                        filter: 'blur(6px)',
                    },
                } as Variants
            }
        }
    }

    return (
        <AnimatePresence presenceAffectsLayout mode="wait" initial={false}>
            <motion.div
                key={key}
                variants={variants(key)}
                initial="start"
                animate="in"
                exit="out"
                transition={{
                    ease: 'easeInOut',
                    staggerChildren: 0.15,
                    duration: 0.15,
                }}
                className="pointer-events-auto h-full w-full overflow-y-auto"
            >
                <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
        </AnimatePresence>
    )
}

export default PageTransitionEffect
