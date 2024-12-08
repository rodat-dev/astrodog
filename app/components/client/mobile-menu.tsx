"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="relative h-full w-[18px]">
      <Bars3Icon
        onClick={() => setOpen((prev) => !prev)}
        className="size-6 h-full"
      />
      <ul
        className={`transition-discrete border-1 relative h-fit w-fit -translate-x-[30%] translate-y-3 overflow-visible rounded-full bg-black p-1 backdrop-blur-3xl transition-all ${!open ? "scale-0 blur-lg" : "scale-100 blur-none"}`}
      >
        <li>
          <Link
            className="relative hidden cursor-pointer px-3 py-2 transition hover:text-amber-200"
            href="/projects"
          >
            Star Dogs ★
          </Link>
        </li>
        <li>
          <Link
            className="relative cursor-pointer px-3 py-2 transition hover:text-indigo-400"
            href="/faq"
          >
            FAQ
          </Link>
        </li>
        <li>
          <Link
            className="relative cursor-pointer px-3 py-2 transition hover:text-pink-400"
            href="https://www.instagram.com/dog_sitting_manchester/"
          >
            Instagram
          </Link>
        </li>
      </ul>
    </aside>
  );
}
