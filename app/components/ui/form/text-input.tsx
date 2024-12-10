import { cn, on } from "@/app/lib/utils";
import { HTMLAttributes, HTMLProps } from "react";

const wrapperCls = cn(
  "group relative", // position and grouping
  "w-full h-fit", // dimensions
  "starting:opacity-0 starting:blur-sm transition-all duration-300", // transitions
  "focus-within:z-10",
);

const inputCls = cn(
  "focus:outline-none focus:ring-transparent", // input reset
  "peer", // base peer class
  "block w-full", // dimensions and position
  "group-first:rounded-t-2xl group-fist:rounded-b-sm group-last:rounded-b-2xl px-5 pt-8", // group-based styling
  "bg-transparent border-none caret-white text-base/6 text-stone-200", // baseline tones
  "transition-all duration-300", // transitions and animation
  "valid:not-focus:not-placeholder-shown:text-teal-400",
  "invalid:not-focus:not-placeholder-shown:text-pink-500 invalid:not-focus:not-placeholder-shown:underline invalid:not-focus:not-placeholder-shown:decoration-wavy",
);

const labelCls = cn(
  "[&+span#error]:hidden", // hiding error span by default
  "transition-all duration-300",
  "absolute left-5 top-1/2 -mt-3 origin-left text-nowrap text-base/6 text-stone-300/60 pointer-events-none", // base styles
  "not-peer-focus:not-peer-placeholder-shown:peer-valid:after:content-['_✅'] not-peer-focus:not-peer-placeholder-shown:peer-valid:text-teal-400 not-peer-focus:not-peer-placeholder-shown:peer-valid:-translate-y-4 not-peer-focus:not-peer-placeholder-shown:peer-valid:scale-75 font-semibold",
  "peer-focus:-translate-y-4 peer-focus:text-teal-300 peer-focus:scale-75 peer-focus:font-semibold", // input focus styles
  "not-peer-focus:not-peer-placeholder-shown:peer-invalid:after:content-['_❌'] not-peer-focus:not-peer-placeholder-shown:peer-invalid:text-pink-500 not-peer-focus:not-peer-placeholder-shown:peer-invalid:[&+span#error]:inline",
  "peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-teal-400",
);

const errorMessageCls =
  "ml-8 md:ml-1 text-pretty italic leading-3 text-pink-500/90 absolute top-[50%] left-1/6 -mt-5.5 text-[0.75rem]";

export default function TextInputWithLabel(
  props: {
    label: string;
  } & HTMLProps<HTMLInputElement>,
) {
  return (
    <div className={wrapperCls}>
      <input {...props} placeholder=" " className={inputCls} />
      <label htmlFor={props.id} className={labelCls}>
        {props.label}
      </label>
      {props["aria-errormessage"] && (
        <span id="error" data-error className={errorMessageCls}>
          {props["aria-errormessage"]}
        </span>
      )}
    </div>
  );
}

export function TextAreaWithLabel(
  props: {
    label: string;
  } & HTMLProps<HTMLTextAreaElement>,
) {
  return (
    <div className={cn(wrapperCls, "mt-3")}>
      <textarea rows={3} {...props} placeholder=" " className={inputCls} />
      <label htmlFor={props.id} className={cn(labelCls, "-mt-9")}>
        {props.label}
      </label>
      {props["aria-errormessage"] && (
        <span id="error" data-error className={errorMessageCls}>
          {props["aria-errormessage"]}
        </span>
      )}
    </div>
  );
}
