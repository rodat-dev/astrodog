"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import { LucideInstagram } from "lucide-react";

export function Navbar(props: NavigationMenuProps) {
  return (
    <NavigationMenu
      className="pointer-events-auto sticky left-0 top-0 flex h-fit w-fit"
      {...props}
    >
      <NavigationMenuList className="flex h-fit w-screen justify-start gap-1 p-1 backdrop-blur-md md:gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink
            className={`relative flex h-fit w-fit cursor-pointer`}
            asChild
          >
            <Link href={"/"} passHref>
              <Image
                src={"/nasa-dog.svg"}
                aria-label="link to homepage"
                alt="Dogsitting Manchester Logo"
                width={60}
                height={60}
                className="peer relative flex scale-75 gap-1 rounded-lg p-1 transition-all duration-500 hover:[filter:drop-shadow(0_0_4px_var(--violet-8))] md:scale-100 md:p-2"
              />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="rounded-full bg-transparent p-2 text-sm backdrop-blur-lg [box-shadow:inset_0_0_6px_var(--violet-8)]">
          <NavigationMenuLink
            className={`h-fit w-fit cursor-pointer rounded-xl backdrop-blur-lg transition-all duration-300 will-change-contents hover:scale-105`}
            asChild
          >
            <Link
              className="text-foreground/70 md:text-lg"
              href={"/booking"}
              passHref
            >
              Book Now
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="rounded-full bg-transparent p-2 text-sm backdrop-blur-lg [box-shadow:inset_0_0_6px_var(--violet-8)]">
          <NavigationMenuLink
            className={`h-fit w-fit cursor-pointer rounded-xl backdrop-blur-lg transition-all duration-300 will-change-contents hover:scale-105`}
            asChild
          >
            <Link
              className="text-foreground/70"
              href={"https://www.instagram.com/dogsittingmanchester"}
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <LucideInstagram className="h-5 w-5 md:h-7 md:w-7" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
