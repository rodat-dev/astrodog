import { PropsWithChildren } from "react";

export default function FormField({ children, ...rest }: PropsWithChildren) {
  return (
    <div className="flex h-fit w-full flex-col gap-2 p-2" {...rest}>
      {children}
    </div>
  );
}
