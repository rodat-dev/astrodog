"use client";
import { usePathname } from "next/navigation";
import MobileMenu from "../client/mobile-menu";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  {
    href: "/",
    text: "Home",
    target: "_self",
    hoverColor: "skyblue",
  },
  {
    href: "/book",
    text: "Book Now",
    target: "_self",
    hoverColor: "violet",
  },
  {
    href: "/stars",
    text: "Star Dogs ★",
    target: "_self",
    hoverColor: "gold",
  },
  {
    href: "/faq",
    text: "FAQ",
    target: "_self",
    hoverColor: "lightblue",
  },
  {
    href: "https://www.instagram.com/dog_sitting_manchester/",
    text: "Instagram",
    target: "_blank",
    hoverColor: "pink",
  },
];

export default function NavLinks() {
  const p = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true));
  if (!mounted) return null;

  return (
    <ul className="border-1 not-dark:bg-linear-to-br relative flex h-full w-fit flex-row items-center justify-center rounded-l-full border-slate-200/80 from-blue-600/20 via-blue-300/10 to-pink-500/5 px-3 shadow-lg ring-1 backdrop-blur-md transition-all duration-300 dark:bg-black/50">
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
              className={`text relative block cursor-pointer ${nl.href !== "/" && nl.href !== "/book" ? "not-md:hidden" : ""} px-3 py-2 transition-all duration-200 ${p === nl.href ? `underline-offset-3 pointer-events-none scale-110 underline` : ""}`}
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
