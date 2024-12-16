import { cn } from "@/lib/utils";
import { animations } from "@/components/styles/animations";

export const clicker = {
  entry: animations.entry,
  pointer: "pointer-events-auto z-10 cursor-pointer",
  style: "bg-black/40 p-4 text-foreground backdrop-blur-xl",
  hover:
    "transition-all [box-shadow:inset_0_0_8px_var(--violet-8),0_0_8px_2px_var(--violet-8)] hover:[box-shadow:inset_0_0_7px_var(--violet-8),0_0_10px_4px_var(--violet-8)]",
  active:
    "active:[box-shadow:inset_0_1px_10px_var(--violet-8),0_0_4px_1px_var(--violet-8)] active:scale-95",
};

export const clickerClass = ({
  fontSize,
  borderRadius = "rounded-full",
  className,
}: {
  fontSize?: string;
  borderRadius?: string;
  className?: string;
}) =>
  cn(
    clicker.entry,
    clicker.pointer,
    clicker.style,
    clicker.hover,
    clicker.active,
    fontSize,
    borderRadius,
    className,
  );
