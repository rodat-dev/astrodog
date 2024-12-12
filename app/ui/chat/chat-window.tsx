'use client'

import { PropsWithChildren } from 'react'
import { Drawer } from 'vaul'

export default function ChatWindow({ children }: PropsWithChildren) {
    return (
        <Drawer.Root>
            <Drawer.Trigger>{children}</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Content className="z-1 absolute bottom-0 left-0 h-full w-screen overflow-hidden bg-gray-100 outline-none">
                    <Drawer.Title className="text-center text-black">
                        Astrodog AI 🐶
                    </Drawer.Title>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
