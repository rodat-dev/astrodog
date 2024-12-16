"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TitleWithGradient } from "@/components/ui/title";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Rocket } from "lucide-react";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export function AstrodogChat() {
  const ref = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Card
        className={`pointer-events-auto z-10 w-full border-none bg-black/10 p-4 backdrop-blur-lg transition-all duration-500 [box-shadow:inset_0_0_10px_rgba(255,255,255,0.1)] md:w-[60dvw] ${messages.length > 0 ? "h-full" : "h-fit"}`}
      >
        <div
          className={`flex flex-col gap-8 p-8 ${messages.length > 0 ? "h-full" : ""}`}
        >
          <TitleWithGradient>Chat with Astrodog AI</TitleWithGradient>

          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                ref={index === messages.length - 1 ? ref : null}
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-purple-500/20 text-purple-100"
                      : "bg-blue-500/20 text-blue-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className={`mx-auto flex w-full border-collapse flex-col items-center gap-2 md:max-w-[42ch] md:flex-row md:gap-0 ${messages.length > 0 ? "mt-auto" : ""}`}
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Astrodog a question..."
              className="peer w-full rounded-r-none border-none bg-black/50 p-3 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:outline-none focus:ring-0"
            />
            <GlowingButton
              type="submit"
              isPending={isLoading}
              fromColor="#c084fc"
              toColor="#3b82f6"
              viaColor="#6d28d9"
              className="w-full p-2 px-4 hover:scale-105 peer-focus:scale-105 md:w-fit md:rounded-l-none"
            >
              <Rocket className="h-6 w-6" />
            </GlowingButton>
          </form>
        </div>
      </Card>
    </div>
  );
}
