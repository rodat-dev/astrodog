"use client";
import Toast from "@/app/components/tw/toast";
import { SubmissionResult } from "@conform-to/dom";
import { HTMLMotionProps, motion } from "motion/react";
import { MouseEvent, RefObject, useState } from "react";
import ConfettiCannon from "../ui/confetti";

export default function XButton(
  props: HTMLMotionProps<"button"> & {
    result: SubmissionResult<string[]> | undefined;
    isLoading: boolean;
    formRef: RefObject<HTMLFormElement | null>;
  },
) {
  const [displayToaster, setDisplayToaster] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  return (
    <>
      <Toast
        error={props.result?.error}
        setDisplayToaster={setDisplayToaster}
        displayToaster={displayToaster}
        message="Thank you for your booking enquiry! 🐶 I'll reach out to you ASAP!"
      />
      <ConfettiCannon hidden={!celebrate} />
      <div className="@container relative m-0 box-content h-[40px] w-[100px] p-0">
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={(ev: MouseEvent) => {
            if (props.formRef.current?.checkValidity()) {
              if (!props.isLoading) {
                setDisplayToaster(true);

                if (!props.result?.error) {
                  setCelebrate(true);
                }
              }
            }
          }}
          className="z-1 border-1 -col-end-1 not-dark:bg-linear-to-br peer absolute left-0 top-0 col-start-1 flex h-full w-full cursor-pointer items-center justify-center self-center rounded-2xl border-white from-blue-600/90 via-sky-800/60 to-purple-500/10 px-4 py-3 backdrop-blur-3xl dark:bg-black"
          {...props}
        >
          Submit
        </motion.button>
        <div className="pointer-events-none absolute isolate h-full w-full animate-[shimmer_10s_linear_infinite] bg-[conic-gradient(from_var(--conic-angle),_var(--color-sky-300),_var(--color-red-500),_var(--color-violet-500))] p-[0.75px] blur-md transition-all peer-hover:scale-110 peer-active:scale-95" />
      </div>
    </>
  );
}
