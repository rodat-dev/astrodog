import { cn } from '@/app/lib/utils'

export default function AnimatedText({
    active,
    children,
    className,
    ...rest
}: {
    active?: boolean
    children: React.ReactNode
} & React.HTMLProps<HTMLDivElement>) {
    return active ? (
        <h1 className={cn(className, 'scale-105 text-emerald-200/80')}>
            {children}
        </h1>
    ) : (
        <div className={cn('relative')} {...rest}>
            <span className={cn(className, 'block font-bold')}>{children}</span>

            <span
                className={cn(
                    className,
                    'absolute left-0 top-0 block font-bold',
                    'text-emerald-200/80 hover:text-emerald-200'
                )}
                aria-hidden="true"
            >
                {children}
            </span>
        </div>
    )
}
