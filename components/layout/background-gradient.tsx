"use client";
import { cn } from "@/lib/utils";
import {
  animate,
  HTMLMotionProps,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { useEffect } from "react";

// colors need to be in an animatable format like HSL or RGB
const COLORS = [
  "hsl(252, 100%, 20%)", // darker purple
  "hsl(204, 90%, 15%)", // darker sky
  "hsl(280, 53%, 15%)", // darker violet
  "hsl(252, 77%, 25%)", // darker vivid purple
];

export default function BackgroundGradient({
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, rgb(5 8 14) 30%, ${color})`;

  useEffect(() => {
    const controls = animate(color, COLORS, {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror",
    });

    return controls.stop;
  }, [color]);

  return (
    <motion.div
      style={{
        backgroundImage,
      }}
      className={cn(
        "pointer-events-none fixed inset-0 z-[-1] m-0 flex h-full w-full touch-none overflow-hidden bg-fixed bg-no-repeat",
        className,
      )}
      aria-hidden={true}
      {...props}
    />
  );
}
