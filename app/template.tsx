"use client";
import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren) {
  return (
    <AnimatePresence>
      <motion.main
        layout
        initial={{
          opacity: 0,
          filter: "blur(6px)",
        }}
        animate={{
          opacity: 1,
          filter: "blur(0)",
        }}
        exit={{
          opacity: 0,
          filter: "blur(6px)",
        }}
        transition={{
          duration: 0.6,
          staggerChildren: 0.2,
          ease: "easeInOut",
          power: 0.8,
        }}
        role="main"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
