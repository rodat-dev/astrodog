import Link from "next/link";
import MobileMenu from "@/app/components/client/mobile-menu";
import ThemeToggle from "@/app/components/server/theme-toggle";

export async function Navbar({ theme }: UserSettingsProps) {
  return (
    <nav className="text @container pointer-events-auto sticky left-0 top-0 z-10 flex h-fit w-full flex-row items-center justify-center gap-1 p-6">
      <ul className="border-1 relative flex h-[40px] w-fit flex-row items-center justify-center rounded-l-full border-slate-200/40 bg-transparent px-3 shadow-lg ring-1 backdrop-blur-md transition-all duration-300">
        <li>
          <Link
            className="text relative block cursor-pointer px-3 py-2 transition-all duration-200 hover:text-sky-200"
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="relative block cursor-pointer px-3 py-2 transition hover:text-teal-500"
            href="/book"
          >
            Book Now
          </Link>
        </li>
        <li>
          <Link
            className="relative hidden cursor-pointer px-3 py-2 transition hover:text-amber-200 md:block"
            href="/projects"
          >
            Star Dogs ★
          </Link>
        </li>
        <li>
          <Link
            className="relative hidden cursor-pointer px-3 py-2 transition hover:text-indigo-400 md:block"
            href="/faq"
          >
            FAQ
          </Link>
        </li>
        <li>
          <Link
            className="relative hidden cursor-pointer px-3 py-2 transition hover:text-pink-400 md:block"
            href="https://www.instagram.com/dog_sitting_manchester/"
            target="_blank"
          >
            Instagram
          </Link>
        </li>
        <li className="h-full w-fit md:hidden">
          <MobileMenu />
        </li>
      </ul>
      <ThemeToggle theme={theme} />
    </nav>
  );
}
