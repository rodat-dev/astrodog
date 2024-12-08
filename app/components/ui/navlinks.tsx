"use client";
import { usePathname } from "next/navigation";
import MobileMenu from "../client/mobile-menu";
import Link from "next/link";
import { motion } from "motion/react";

const NAV_LINKS = [
  {
    href: "/",
    text: "Home",
    target: "_self",
    hoverColor: "var(--color-sky-200)",
  },
  {
    href: "/book",
    text: "Book Now",
    target: "_self",
    hoverColor: "var(--color-teal-300)",
  },
  {
    href: "/stars",
    text: "Star Dogs ★",
    target: "_self",
    hoverColor: "var(--color-amber-200)",
  },
  {
    href: "/faq",
    text: "FAQ",
    target: "_self",
    hoverColor: "var(--color-indigo-400)",
  },
  {
    href: "https://www.instagram.com/dog_sitting_manchester/",
    text: "Instagram",
    target: "_blank",
    hoverColor: "var(--color-pink-400)",
  },
];

export default function NavLinks() {
  const p = usePathname();
  return (
    <ul className="border-1 relative flex h-full w-fit flex-row items-center justify-center rounded-l-full border-slate-200/40 bg-transparent px-3 shadow-lg ring-1 backdrop-blur-md transition-all duration-300">
      {NAV_LINKS.map((nl, i) => (
        <li key={`${i}-li`}>
          <Link key={`${i}-link`} href={nl.href} target={nl.target}>
            <motion.span
              layout
              style={{
                color: p === nl.href ? nl.hoverColor : "inherit",
              }}
              whileHover={{
                translateY: "-5%",
                color: nl.hoverColor,
                transition: {
                  default: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                  color: {
                    duration: 0.3,
                    ease: "linear",
                  },
                },
              }}
              className={`text relative block cursor-pointer px-3 py-2 transition-all duration-200 ${p === nl.href ? `underline-offset-3 pointer-events-none scale-110 underline` : ""}`}
            >
              {nl.text}
            </motion.span>
          </Link>
        </li>
      ))}
      <li className="h-full w-fit md:hidden">
        <MobileMenu />
      </li>
    </ul>
  );
}
