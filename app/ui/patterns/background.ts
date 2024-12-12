import { tv } from 'tailwind-variants'

export const background = tv({
    base: 'bg-primary dark:grayscale-100',
    variants: {
        elements: {
            avatar: '!bg-none dark:grayscale-100',
        },
        colorify: {
            hover: 'hover:grayscale-0 transition-all duration-300 will-change-contents',
        },
    },
})
