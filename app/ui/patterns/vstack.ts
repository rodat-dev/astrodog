import clsx, { ClassValue } from 'clsx'

export const vstack = (...classes: ClassValue[]) =>
    clsx(
        'absolute top-0 left-0 flex flex-col content-center gap-4 pointer-events-none w-full h-dvh',
        ...classes
    )
