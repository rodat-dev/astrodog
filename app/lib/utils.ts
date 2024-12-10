import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function on(condition: string, inputClasses: ClassValue) {
  return twMerge(
    clsx(
      inputClasses
        ?.toString()
        .split(" ")
        .map((cls) => `${condition}:${cls}`),
    ),
  );
}
