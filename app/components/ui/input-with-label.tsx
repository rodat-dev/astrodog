"use client";
import { toHumanReadable } from "@/app/utils/form";
import { HTMLMotionProps, motion } from "motion/react";

export interface InputWithLabelProps
  extends React.HTMLAttributes<HTMLInputElement> {}

export default function InputWithLabel(props: HTMLMotionProps<"input">) {
  const { name, autoComplete, ...rest } = props;
  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <motion.input
        layout
        whileFocus={{
          scale: 1.1,
        }}
        id={name}
        autoComplete={autoComplete}
        placeholder=" "
        className="border-1 not-focus:not-placeholder-shown:invalid:[&+i]:opacity-100 not-focus:not-placeholder-shown:invalid:border-pink-500 not-dark:focus:ring-sky-200 not-placeholder-shown:backdrop-blur-md peer block w-full border-white/90 bg-transparent px-6 pb-4 pt-12 text-base/6 text-stone-200 ring-4 ring-transparent focus:border-neutral-950 focus:outline-none focus:ring-2 focus:backdrop-blur-md group-first:rounded-t-2xl group-last:rounded-b-2xl peer-[data-errormessage]:opacity-0 dark:focus:ring-stone-200 [&+i]:opacity-0"
        name={name}
        {...rest}
      />
      <i
        data-errormessage
        className="peer absolute left-0 top-0 -translate-y-6 text-xs text-pink-500"
      >
        {props["aria-errormessage"]}
      </i>
      <label
        htmlFor={name}
        className="not-peer-focus:not-peer-placeholder-shown:*:opacity-0 peer pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-300 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-teal-300 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-teal-300"
      >
        {toHumanReadable(name!)}
        {props.required ? (
          <span className="ml-2 text-sm text-pink-500 opacity-100 transition-all">
            *<i className="text-xs">required</i>
          </span>
        ) : (
          <></>
        )}
      </label>
    </div>
  );
}
