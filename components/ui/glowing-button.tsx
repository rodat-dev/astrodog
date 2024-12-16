"use client";

import { motion, HTMLMotionProps } from "motion/react";
import { Button } from "./button";
import { borderGlow } from "../styles/border";
import { cn } from "@/lib/utils";

const MotionButton = motion(Button);

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
  isPending?: boolean;
  fromColor?: string;
  toColor?: string;
  viaColor?: string;
  duration?: number;
}

export function GlowingButton({
  children,
  className,
  isPending,
  fromColor = "blue",
  toColor = "crimson",
  viaColor = "skyblue",
  duration = 10,
  ...props
}: GlowingButtonProps) {
  return (
    <MotionButton
      disabled={isPending}
      initial={{
        "--angle": "0deg",
        "--from-color": fromColor,
        "--to-color": toColor,
        "--via-color": viaColor,
      }}
      animate={{
        "--angle": "360deg",
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className={cn(
        "relative w-full bg-black",
        borderGlow,
        isPending && "cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {children}
    </MotionButton>
  );
}
