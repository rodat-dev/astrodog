"use client";
import { cn } from "@/app/lib/utils";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { SetStateAction } from "jotai/vanilla";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

export default function Toast({
  error,
  message,
  displayToaster,
  setDisplayToaster,
}: {
  error: Record<string, string[] | null> | undefined;
  message: string;
  displayToaster: boolean;
  setDisplayToaster: React.Dispatch<SetStateAction<boolean>>;
}) {
  const toaster = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setDisplayToaster(false);
    }, 5000);
    return () => clearTimeout(t);
  });

  return (
    <AnimatePresence>
      {displayToaster && (
        <motion.div
          layout
          initial={{
            backdropFilter: "blur(0)",
          }}
          animate={{
            backdropFilter: "blur(3px)",
          }}
          exit={{
            backdropFilter: "blur(0)",
          }}
          ref={toaster}
          className="fixed left-0 top-0 grid h-screen w-full place-items-center self-center"
        >
          <motion.div
            initial={{
              bottom: "-5dvh",
              filter: "blur(6px)",
            }}
            animate={{
              bottom: "50dvh",
              filter: "blur(0)",
            }}
            exit={{
              bottom: "-5dvh",
              filter: "blur(6px)",
            }}
            className="bg-linear-to-br absolute flex h-fit w-fit translate-y-10 rounded-2xl from-blue-400/70 via-sky-600/40 to-purple-500/20 p-4 backdrop-blur-md dark:from-black/70 dark:via-black/90 dark:to-slate-900/20"
          >
            <div className="shrink-0">
              {error ? (
                <CheckCircleIcon className="size-5 text-teal-300" />
              ) : (
                <XMarkIcon className="size-5 text-pink-500" />
              )}
            </div>
            <div className="ml-3">
              <p
                className={cn(
                  "text-sm font-medium",
                  error ? "text-pink-400" : "text-teal-200",
                )}
              >
                {error ? JSON.stringify(error) : message}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => setDisplayToaster(false)}
                  className={cn(
                    status === "error"
                      ? "focus:ring-pink-500"
                      : "focus:ring-teal-400",
                    "focus:outline-hidden inline-flex cursor-pointer rounded-md p-1.5 focus:ring-2 focus:ring-offset-2 dark:bg-transparent dark:text-stone-200",
                  )}
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
