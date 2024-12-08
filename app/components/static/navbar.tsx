import { Suspense } from "react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(
  () => import("@/app/components/client/theme-toggle"),
);

const NavLinks = dynamic(() => import("@/app/components/ui/navlinks"));

export async function Navbar() {
  return (
    <nav className="text @container pointer-events-auto sticky left-0 top-0 z-10 flex h-[90px] w-full flex-row items-center justify-center gap-1 p-6">
      <Suspense fallback={null}>
        <NavLinks />
      </Suspense>
      <Suspense fallback={null}>
        <ThemeToggle />
      </Suspense>
    </nav>
  );
}
