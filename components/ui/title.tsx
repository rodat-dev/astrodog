import { cn } from "@/lib/utils";

export function Title({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-center text-2xl md:text-4xl", className)}
      {...props}
    >
      {children}
    </h1>
  );
}
Title.displayName = "Title";

export function TitleWithGradient({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Title
      className={cn(
        "bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </Title>
  );
}
TitleWithGradient.displayName = "TitleWithGradient";
