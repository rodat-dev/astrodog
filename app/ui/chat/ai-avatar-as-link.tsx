'use client'
import { PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/app/lib/utils'

export default function AIAvatarAsLink({
    href,
    children,
    className,
}: {
    href: string
} & PropsWithChildren &
    React.HTMLProps<HTMLButtonElement>) {
    const router = useRouter()

    useEffect(() => {
        router.prefetch(href)
    })

    const routeTo = () => {
        router.push(href)
    }

    return (
        <button
            type="button"
            onClick={routeTo}
            className={cn(
                'border-1 dark:grayscale-100 bg-primary bottom-4.5 md:h-18 md:w-18 pointer-events-auto absolute right-2 flex h-10 w-10 cursor-pointer items-center justify-center text-nowrap rounded-lg px-6 py-1 text-center text-sm backdrop-blur-2xl transition-all duration-500 hover:grayscale-0 md:right-8 md:px-5',
                className
            )}
        >
            {children}
            <span className="relative h-full w-full">
                <span className="border-1 absolute right-0 top-0 -translate-x-[30%] -translate-y-[100%] rounded-lg border-black bg-white p-0.5 text-xs text-slate-950">
                    AI 🐶
                </span>
            </span>
        </button>
    )
}
