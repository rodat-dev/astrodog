import { cn } from "@/app/lib/utils";
import { type ClassValue } from "clsx";

export const hstack = (...classes: ClassValue[]) =>
  cn(
    "grid grid-cols-2 md:flex md:flex-row w-full h-fit gap-4 justify-center items-center",
    ...classes,
  );
