"use client";
import { toHumanReadable } from "@/app/utils/form";
import { HTMLMotionProps, motion, MotionProps, useAnimate } from "motion/react";
import { PropsWithChildren, useEffect, useRef } from "react";

export function Checkbox(props: HTMLMotionProps<"input">) {
  const [scope, animate] = useAnimate<HTMLInputElement>();
  const { name, type, ["aria-label"]: ariaLabel, ...rest } = props;

  useEffect(() => {
    if (scope.current && scope.current.checked) {
      animate(scope.current, { scale: 1.05, rotateX: "360deg" });
    }
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <label htmlFor={name}>{toHumanReadable(name!)}</label>
      <motion.input
        type={type || "radio"}
        ref={scope}
        name={name}
        id={name}
        className="not-checked:before:hidden relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 checked:text-transparent checked:after:content-['🐶'] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
        {...rest}
      />
    </div>
  );
}

interface CheckGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend: string;
  info?: string;
}

export default function CheckboxGroup(props: CheckGroupProps) {
  const { legend, info, children, ...rest } = props;
  return (
    <fieldset {...rest}>
      <legend className="text-sm/6 font-semibold">{legend}</legend>
      {info && <p className="mt-1 text-sm/6 text-gray-600">{info}</p>}
      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-x-3">{children}</div>
      </div>
    </fieldset>
  );
}
