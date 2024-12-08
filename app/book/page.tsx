"use client";
import { AnimatePresence, motion } from "motion/react";

export default function Page() {
  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0)" }}
        exit={{ opacity: 0, filter: "blur(6px)" }}
        transition={{
          duration: 1.5,
          stiffness: 0.5,
          power: 1.2,
          bounce: true,
          bounceDamping: true,
          staggerChildren: 0.3,
        }}
        className="grid w-full grid-flow-row place-items-center gap-4"
      >
        <h1 className="prose prose-2xl text-stone-200">Booking Form</h1>
      </motion.section>
    </AnimatePresence>
  );
}
