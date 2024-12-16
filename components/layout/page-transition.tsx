/// note for posteriority: If an element is marked as absolutely positioned, scrolling does not work on mobile.
"use client";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef, useState } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
      <motion.div
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
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
