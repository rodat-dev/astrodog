import { HTMLProps, PropsWithChildren } from "react";
import { hstack } from "../patterns/hstack";

export default function CheckboxGroup({
  name,
  className,
  children,
  ...rest
}: PropsWithChildren & HTMLProps<HTMLFieldSetElement>) {
  return (
    <fieldset name={name} className={hstack(className)} {...rest}>
      {children}
    </fieldset>
  );
}
