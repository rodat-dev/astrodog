import type { PropsWithChildren } from "react";

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <main
      role="main"
      aria-roledescription="app shell"
      className="animate-in fade-in pointer-events-none z-10 h-dvh w-dvw overflow-y-auto bg-black/90"
    >
      {children}
    </main>
  );
}
