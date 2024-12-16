"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TitleWithGradient } from "@/components/ui/title";
import { Loader2, Rocket } from "lucide-react";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { Button } from "./button";
import { clickerClass } from "@/components/styles/clicker";
import { cn } from "@/lib/utils";
import { animations } from "@/components/styles/animations";
import { cardStyles } from "@/components/styles/cards";
import { motion, AnimatePresence } from "motion/react";

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
        className={`pointer-events-auto z-10 w-full touch-auto ${cardStyles.glassy} transition-all duration-500 md:w-[60dvw] ${messages.length > 0 ? "h-full" : "h-fit"}`}
      >
        <div
          className={`flex flex-col gap-8 p-8 ${messages.length > 0 ? "h-full" : ""}`}
        >
          <TitleWithGradient>Chat with Astrodog AI</TitleWithGradient>

          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.map((message, index) => (
              <AnimatePresence
                presenceAffectsLayout
                key={`${index}-presence`}
                mode="wait"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  ref={index === messages.length - 1 ? ref : null}
                  key={`${index}-${message.role}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 backdrop-blur-lg [box-shadow:inset_0_0_6px_1px_var(--violet-8)] ${
                      message.role === "user"
                        ? "bg-violet-500/10 text-foreground"
                        : "bg-blue-500/10 text-blue-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
            {messages.length > 0 && !isLoading && <div ref={ref} />}
          </div>
          <form
            onSubmit={handleSubmit}
            className={`relative mx-auto flex h-fit w-full border-collapse flex-col items-center gap-2 md:max-w-[42ch] md:flex-row md:gap-0 ${messages.length > 0 ? "mt-auto" : ""}`}
          >
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  className={`absolute -top-16 left-0 w-full rounded-b-none rounded-t-lg p-2 ${cardStyles.glassy}`}
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  Thinking... <Loader2 className="h-4 w-4 animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>
            <Input
              value={input}
              readOnly={isLoading}
              onChange={handleInputChange}
              placeholder="Ask Astrodog a question..."
              className={cn(
                "peer w-full rounded-r-none border-none bg-black/50 p-3 transition-all duration-300 [box-shadow:inset_0_0_4px_var(--violet-8),0_0_4px_1px_var(--violet-8)] focus:scale-105 focus:outline-none focus:ring-0",
                animations.entry,
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className={clickerClass({
                className:
                  "w-full rounded-lg p-2 px-4 hover:scale-105 peer-focus:scale-105 md:w-fit md:rounded-l-none",
              })}
            >
              Send <Rocket className="h-6 w-6" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
