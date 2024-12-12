'use client'
import { SendIcon } from 'lucide-react'
import AIAvatarAsLink from './ai-avatar-as-link'
import { ChatBubble } from './astrodog-chat-bubble'
import { useEffect, useRef } from 'react'
import { useChat } from 'ai/react'

export function Chat() {
    const ref = useRef<HTMLDivElement>(null)
    const { messages, input, handleInputChange, handleSubmit } = useChat({})

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <section className="relative grid h-full w-dvw justify-center gap-4 p-4 [grid-template-rows:1fr_auto]">
            <article className="h-max-full flex w-full flex-col gap-2">
                <ChatBubble
                    shouldWelcome
                    message={{
                        role: 'system',
                        id: 'welcome-message',
                        content: '',
                    }}
                />
                {messages.map((m) => (
                    <ChatBubble key={m.id} message={m} />
                ))}
            </article>
            <form
                onSubmit={handleSubmit}
                className="z-1 pointer-events-auto absolute bottom-0 left-0 grid h-max w-full grid-flow-col items-center justify-center p-4"
            >
                <textarea
                    className="border-1 w-full rounded-l-lg bg-black/10 backdrop-blur-2xl"
                    name="userInput"
                    value={input}
                    onChange={handleInputChange}
                    rows={1}
                    placeholder="Help me Astrodog..."
                />
                <button
                    type="submit"
                    className="border-r-1 border-t-1 border-b-1 inset-shadow-black bg-primary h-full w-fit border-collapse rounded-r-lg border-gray-300/80 text-white"
                >
                    <SendIcon fontWeight={200} className="p-1" />
                </button>
                <AIAvatarAsLink href="/">Home</AIAvatarAsLink>
            </form>
        </section>
    )
}
