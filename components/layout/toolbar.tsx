"use client";

import { Home, Calendar, MessageSquareText, Play, Pause } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NavToolbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <nav className="z-1 pointer-events-auto flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 p-2 shadow-lg backdrop-blur-md">
        <audio ref={audioRef} src="/notification.mp3" />

        <Button
          asChild
          variant="ghost"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full text-violet-100 hover:bg-violet-500/20",
            "transition-colors duration-200",
          )}
        >
          <Link href="/">
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full text-violet-100 hover:bg-violet-500/20",
            "transition-colors duration-200",
          )}
        >
          <Link href="/booking">
            <Calendar className="h-5 w-5" />
            <span className="sr-only">Book Now</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full text-violet-100 hover:bg-violet-500/20",
            "transition-colors duration-200",
          )}
        >
          <Link href="/chat">
            <MessageSquareText className="h-5 w-5" />
            <span className="sr-only">Chat with AI</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className={cn(
            "h-12 w-12 rounded-full text-violet-100 hover:bg-violet-500/20",
            "transition-colors duration-200",
          )}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
          <span className="sr-only">
            {isPlaying ? "Pause Audio" : "Play Audio"}
          </span>
        </Button>
      </nav>
    </div>
  );
}
