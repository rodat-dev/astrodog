'use client'
import Typewriter from 'typewriter-effect'
import * as Avatar from '@radix-ui/react-avatar'
import { useEffect, useRef, useState } from 'react'
import { AvatarIcon } from '@radix-ui/react-icons'
import { Message } from 'ai/react'

export function ChatBubble({
    shouldWelcome,
    message,
}: {
    shouldWelcome?: boolean
    message?: Message
}) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    })

    if (!mounted) return null

    return (
        <div
            key={message!.id}
            className="box-border grid w-full grid-cols-[repeat(2,auto)] justify-start gap-2 rounded-lg bg-transparent p-2 md:w-[80dvw]"
        >
            {message?.role === 'user' ? (
                <AvatarIcon className="size-14 rounded-full [filter:drop-shadow(0_0_14px_skyblue)]" />
            ) : (
                <Avatar.Root>
                    <Avatar.Image
                        src="/nasa-dog.svg"
                        fetchPriority="high"
                        className="size-14 rounded-full [filter:drop-shadow(0_0_14px_rebeccapurple)]"
                    />
                    <Avatar.Fallback />
                </Avatar.Root>
            )}
            <div className="border-1 bg-linear-0 flex w-full flex-col gap-2 rounded-lg from-purple-400/50 to-black/10 p-2 backdrop-blur-2xl">
                <header className="flex flex-row items-center justify-between gap-2">
                    <span className="text-md text-center leading-tight">
                        {message?.role === 'user' ? 'Dog parent' : 'Astrodog'}
                    </span>
                    <small className="text-xs opacity-50">
                        {new Date().toLocaleString()}
                    </small>
                </header>

                <span className="text-sm">
                    {shouldWelcome ? (
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .changeDelay(30)
                                    .typeString(
                                        "Hi, I'm Astrodog, Dog Sitting Manchester's AI assistant! How can I help?"
                                    )
                                    .pauseFor(2500)
                                    .start()
                            }}
                        />
                    ) : (
                        message?.content
                    )}
                </span>
            </div>
        </div>
    )
}
