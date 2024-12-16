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

export function Navbar(props: NavigationMenuProps) {
  return (
    <NavigationMenu
      className="motion-preset-blur-down-lg motion-loop-once motion-duration-300 pointer-events-auto sticky left-0 top-0 flex h-[80px] w-full !max-w-full items-center justify-start p-2 backdrop-blur-lg"
      {...props}
    >
      <NavigationMenuList className="flex h-fit w-full flex-1 flex-row items-center justify-start p-1 md:gap-2 md:p-2 md:text-xl">
        <NavigationMenuItem>
          <Link href={"/"} legacyBehavior passHref>
            <NavigationMenuLink
              className={`motion-preset-blur-down-lg motion-loop-once relative flex h-fit w-fit`}
            >
              <Image
                src={"/nasa-dog.svg"}
                aria-label="link to homepage"
                alt="Dogsitting Manchester Logo"
                width={80}
                height={80}
                className="peer relative flex scale-75 gap-1 rounded-lg p-1 transition-all duration-500 hover:[filter:drop-shadow(0_0_4px_var(--violet-8))] md:scale-100 md:p-2"
              />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`motion-preset-blur-down-lg motion-loop-once relative flex h-fit w-fit`}
        >
          <Link
            className="text-lg font-bold text-violet-400"
            href={"/booking"}
            legacyBehavior
            passHref
          >
            Book Now
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
