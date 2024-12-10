import { cn } from "@/app/lib/utils";
import { ClassValue } from "clsx";

export const vstack = (...classes: ClassValue[]) =>
  cn("grid grid-flow-row place-items-center h-fit w-full", ...classes);
