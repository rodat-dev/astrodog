import { HTMLProps } from "react";
import { vstack } from "../patterns/vstack";

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  label: string;
  type: "checkbox" | "radio";
}

export default function Checkbox({
  name,
  label,
  value,
  id,
  type,
  ...rest
}: CheckboxProps) {
  return (
    <div className={vstack("gap-2 text-stone-200/60")}>
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        className="z-1 rounded-full bg-transparent p-2.5 shadow-[0_0_4px_1px] shadow-stone-100/90 transition-all hover:scale-110 focus:outline-none focus:ring-transparent active:scale-95"
        value={value}
        {...rest}
      />
    </div>
  );
}
