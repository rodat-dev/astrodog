import { tv } from 'tailwind-variants'
import { background } from '@/app/ui/patterns/background'
import { cn } from '@/app/lib/utils'

const star = tv({
    base: ['bg-transparent absolute'],
    variants: {
        style: {
            stars: 'shadow-sm animate-animStar h-px w-px',
            stars2: 'shadow-md animate-animStar2 h-2 w-2',
            stars3: 'shadow-lg animate-animStar3 h-3 w-3',
        },
    },
})

function Star({ index }: { index: number }) {
    return (
        <div
            id={`stars${index > 1 ? index : ''}`}
            className={
                index === 1
                    ? star({ style: `stars` })
                    : index === 2
                      ? star({ style: 'stars2' })
                      : star({ style: 'stars3' })
            }
        />
    )
}

export default function StarryBackground() {
    return (
        <div
            className={cn(
                background(),
                'pointer-events-none fixed left-0 top-0 h-dvh w-screen overflow-hidden contain-layout'
            )}
        >
            <Star index={1} />
            <Star index={2} />
            <Star index={3} />
        </div>
    )
}
