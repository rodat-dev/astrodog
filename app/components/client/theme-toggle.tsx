"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true));
  if (!mounted) return null;
  return (
    <div className="grid h-full w-[35px] place-items-center rounded-r-full border-slate-200/40 bg-transparent p-1.5 shadow-lg ring-1 backdrop-blur-md">
      <AnimatePresence>
        <motion.button
          initial={{ scale: 0, filter: "blur(6px)" }}
          animate={{ scale: 1, filter: "blur(0)" }}
          exit={{ scale: 0, filter: "blur(6px)" }}
          className="ring-offset-background focus-visible:ring-ring flex h-full w-full cursor-pointer items-center justify-center bg-transparent opacity-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:[&>*]:text-indigo-300/90 dark:hover:[&>*]:text-amber-200/90"
          type="submit"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <MoonIcon
              data-theme="dark"
              className="pointer-events-none grow transition-all duration-300"
            />
          ) : (
            <SunIcon
              data-theme="light"
              className="pointer-events-none grow transition-all duration-300"
            />
          )}
        </motion.button>
      </AnimatePresence>
    </div>
  );
}
