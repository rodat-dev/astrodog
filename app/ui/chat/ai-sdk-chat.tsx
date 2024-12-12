'use client'
import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'

export default function Chat() {
    const ref = useRef<HTMLDivElement>(null)
    const { messages, input, handleInputChange, handleSubmit } = useChat({})

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <>
            <section
                aria-label="messages"
                className="relative m-0 flex h-full w-full flex-col items-center justify-start gap-2 overflow-y-auto scroll-smooth rounded-2xl p-3 shadow-2xl shadow-black/70"
            >
                {messages.map((message) => (
                    <div
                        autoFocus={true}
                        className={`${
                            message.role !== 'user'
                                ? 'not-dark:bg-linear-to-br from-blue-600/20 via-blue-300/20 to-pink-500/20 shadow-lg dark:bg-black/50'
                                : 'bg-transparent'
                        } field-sizing-content starting:scale-0 starting:blur-2xl flex min-h-max w-full scale-100 flex-row gap-2 overflow-y-auto rounded-2xl border-2 p-4 blur-none transition-all duration-300`}
                        key={message.id}
                    >
                        {message.role === 'user' ? 'User: ' : 'Astrodog: '}
                        {message.content}
                    </div>
                ))}
            </section>

            <form
                className="flex h-[30%] w-full flex-col items-center justify-end gap-4"
                onSubmit={handleSubmit}
            >
                <input
                    className="h-fit w-fit rounded-lg border-2 p-2 shadow-2xl shadow-black/60 backdrop-blur-3xl placeholder:opacity-70 focus:placeholder:opacity-0"
                    name="prompt"
                    value={input}
                    placeholder="Ask Astrodog..."
                    onChange={handleInputChange}
                />
                <button
                    className="cursor-pointer rounded-full border-2 px-2 py-1"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </>
    )
}
