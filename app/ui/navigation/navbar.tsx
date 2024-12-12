'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, Suspense } from 'react'
import ThemeToggle from '../theme/theme-toggle'
import { tv } from 'tailwind-variants'
import { background } from '../patterns/background'
import { cn } from '@/app/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import AnimatedText from '../animated/text'

const AnimatedNavList = motion.create(NavigationMenu.List, {
    forwardMotionProps: true,
})

function NextLink({
    href,
    active,
    children,
    ...props
}: PropsWithChildren & LinkProps & { active: boolean }) {
    return (
        <NavigationMenu.Link
            className="flex items-center justify-center gap-1"
            asChild
            active={active}
        >
            <Link
                href={href}
                className="z-5 data-active:pointer-events-none data-active:text-emerald-100 scale-100 text-lg text-emerald-100/60 transition-all duration-300 hover:scale-105 hover:text-emerald-100 md:text-2xl"
                {...props}
            >
                {children}
            </Link>
        </NavigationMenu.Link>
    )
}

const Links = [
    { href: '/', content: 'Home' },
    { href: '/book-now', content: 'Book Now' },
    { href: '/instagram', content: 'Instagram' },
]

const navbar = tv({
    slots: {
        root: cn(
            background({ colorify: 'hover' }),
            'z-1 pointer-events-auto sticky top-0 left-0 h-[8dvh] h-min-[80px] w-full self-center items-center justify-start p-5 shadow-lg  backdrop-blur-xl transition-all duration-300 flex'
        ),
        list: '',
        item: '',
    },
})

const { root, list, item } = navbar()

export default function Navbar() {
    const pathname = usePathname()

    return (
        <NavigationMenu.Root
            className={
                'z-1 pointer-events-auto sticky top-0 h-fit w-dvw bg-transparent p-2 font-bold text-emerald-100'
            }
        >
            <AnimatePresence mode="wait">
                <Suspense fallback={null}>
                    <AnimatedNavList
                        layout={'preserve-aspect'}
                        className="starting:blur-2xl starting:opacity-0 starting:scale-0 m-0 flex w-full scale-100 list-none items-center justify-center gap-3 opacity-100 transition-all duration-300"
                    >
                        {Links.map((l, i) => (
                            <NavigationMenu.Item
                                key={`link-${i}-navbar`}
                                className="flex justify-between gap-3"
                            >
                                <Suspense fallback={null}>
                                    <NextLink
                                        href={l.href}
                                        active={l.href === pathname}
                                        prefetch
                                    >
                                        {l.content}
                                    </NextLink>
                                    {i < 2 && (
                                        <div className="h-[2dvh] w-[2px] self-center bg-emerald-100/60"></div>
                                    )}
                                </Suspense>
                            </NavigationMenu.Item>
                        ))}
                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger asChild>
                                <ThemeToggle />
                            </NavigationMenu.Trigger>
                        </NavigationMenu.Item>
                    </AnimatedNavList>
                </Suspense>
            </AnimatePresence>
        </NavigationMenu.Root>
    )
}
