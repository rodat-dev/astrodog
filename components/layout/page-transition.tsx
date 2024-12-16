"use client";
import { motion, AnimatePresence, Variants } from "motion/react";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  if (!frozen) {
    return <>{props.children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

export default function Main({ children }: { children: React.ReactNode }) {
  const key = usePathname();

  const variants = {
    start: {
      opacity: 0,
      filter: "blur(6px)",
    },
    in: {
      opacity: 1,
      filter: "blur(0)",
    },
    out: {
      opacity: 0,
      filter: "blur(6px)",
    },
  };

  return (
    <AnimatePresence presenceAffectsLayout mode="wait" initial={false}>
      <motion.main
        role="main"
        key={key}
        variants={variants}
        initial="start"
        animate="in"
        exit="out"
        transition={{
          ease: "easeInOut",
          staggerChildren: 0.15,
          duration: 0.4,
        }}
        className={
          "z-10 flex h-full w-full flex-col overflow-y-auto overflow-x-hidden p-6"
        }
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.main>
    </AnimatePresence>
  );
}
