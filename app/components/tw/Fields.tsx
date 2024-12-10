"use client";
import PhoneInput, { PhoneNumber, Props } from "react-phone-number-input";
import { HTMLMotionProps, motion } from "motion/react";
import { PropsWithoutRef, useId, useRef, useState } from "react";
import clsx from "clsx";

const formClasses =
  "block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm";

function Label({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  );
}

export function TextInput({
  label,
  className,
  ...props
}: HTMLMotionProps<"input"> & { label: string }) {
  let id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const validateOnBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    if (!props.pattern) {
      inputRef.current?.setCustomValidity("");
    } else {
      const regex = new RegExp(props.pattern);
      try {
        const matches = regex.exec(ev.target.value);
        if (matches && matches.length > 0) {
          inputRef.current?.setCustomValidity("");
        } else {
          throw new Error(
            `Invalid input: ${ev.target.name} according to pattern: ${props.pattern}`,
          );
        }
      } catch (err) {
        console.debug(`Failed to validate field: ${ev.target.name}: ${err}`);
        const error = err as Error;
        inputRef.current?.setCustomValidity(error.message);
      }
    }
  };

  return (
    <div className="group relative z-0 w-full transition-all focus-within:z-10">
      <motion.input
        layout
        ref={inputRef}
        type="text"
        id={id}
        onBlur={validateOnBlur}
        {...props}
        placeholder=" "
        className="group-first:rounded-b-xs invalid:not-focus:not-placeholder-shown:text-pink-600 invalid:not-focus:not-placeholder-shown:underline invalid:not-focus:not-placeholder-shown:decoration-wavy invalid:not-focus:not-placeholder-shown:underline-offset-2 valid:not-focus:text-teal-300 [span#error]:opacity-0 peer block w-full border border-none bg-transparent px-6 pb-4 pt-12 text-base/6 text-stone-200 caret-white ring-4 ring-transparent transition-all duration-300 focus:outline-none group-first:rounded-t-2xl group-last:rounded-b-2xl [&_span-data-error]:hidden"
      />
      <label
        htmlFor={id}
        className="not-peer-focus:not-peer-placeholder-shown:peer-valid:after:content-['_✅'] not-peer-focus:not-peer-placeholder-shown:not-peer-valid:after:content-['_❌'] not-peer-focus:not-peer-placeholder-shown:not-peer-valid:text-pink-600 not-peer-focus:peer-invalid:not-peer-placeholder-shown:[&_span#error]:inline pointer-events-none absolute left-5 top-1/2 -mt-3 origin-left text-nowrap text-base/6 text-stone-300/60 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-teal-300 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-teal-300 [&_span#error]:hidden"
      >
        {label}
        {!props.required ? (
          <span className="ml-2 text-xs leading-3">
            *<i>optional</i>
          </span>
        ) : (
          <></>
        )}
        {props["aria-errormessage"] && (
          <span
            id="error"
            data-error
            className="ml-2 text-xs italic leading-3 text-pink-500/90"
          >
            {props["aria-errormessage"]}
          </span>
        )}
      </label>
    </div>
  );
}

export function MobileInput({ label, name }: { label: string; name: string }) {
  let id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="group relative z-0 flex w-full flex-col gap-2 transition-all focus-within:z-10">
      <label
        htmlFor={id}
        className="pointer-events-none relative left-5 top-1/2 -mt-3 origin-left text-nowrap text-base/6 text-stone-300/60 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-teal-300"
      >
        {label}
        <span className="ml-2 text-xs leading-3">
          *<i>optional</i>
        </span>
      </label>
      <PhoneInput
        name={name}
        required={false}
        formNoValidate
        placeholder="Your phone number"
        defaultCountry="GB"
        international={false}
        initialValueFormat="national"
        onChange={() => {}}
        autoComplete="mobile tel"
        className="**:h-[40px] [&_input[type='tel']]:focuse:outline-none peer relative left-4 top-0 flex h-[40px] w-fit flex-row outline-none [&_img]:hidden [&_input[type='tel']]:rounded-2xl [&_input[type='tel']]:border-none [&_input[type='tel']]:bg-transparent [&_input[type='tel']]:text-sm [&_select]:w-[180px] [&_select]:rounded-2xl [&_select]:bg-transparent [&_select]:text-xs"
      />
    </div>
  );
}

export function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  );
}

export function TextField({
  label,
  type = "text",
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"input">, "id"> & { label?: string }) {
  let id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  );
}

export function SelectField({
  label,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"select">, "id"> & { label?: string }) {
  let id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, "pr-8")} />
    </div>
  );
}
