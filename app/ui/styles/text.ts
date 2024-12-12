import { tv } from 'tailwind-variants'
import { Nova_Square, Offside, Oxanium, Turret_Road } from 'next/font/google'
import { cn } from '@/app/lib/utils'

const t = Turret_Road({
    subsets: ['latin'],
    display: 'swap',
    weight: '200',
})

const o = Offside({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
})

const ns = Nova_Square({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    weight: '400',
})

export const text = tv({
    slots: {
        base: cn(
            o.className,
            'font-stretch-extra-condensed font-normal text-lg dark:text-neutral-200 text-black  antialiased'
        ),
        title: 'text-2xl leading-tight dark:text-white',
        subtitle: 'text-xl leading-snug dark:text-neutral-200',
        info: 'text-md italic font-light dark:text-emerald-300',
    },
})
