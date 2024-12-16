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
import { usePathname } from "next/navigation";
import { HomeIcon, Rocket, SpaceIcon } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Dog Sitting Manchester",
    href: "/",
    description: "Homepage of Dogsitting Manchester",
  },
  {
    title: "Book Now",
    href: "/booking",
    description: "Fill in an enquiry form to book a dog sitting service",
  },
];

export function Navbar(props: NavigationMenuProps) {
  const [mounted, setMounted] = React.useState(false);
  const id = React.useId();
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="relative flex h-fit w-full flex-1 flex-row justify-center gap-4 rounded-lg p-2 md:gap-8 md:p-4 md:text-xl">
        <NavigationMenuItem>
          <Link href={"/"} prefetch legacyBehavior passHref>
            <NavigationMenuLink
              active={"/" === pathname}
              className={`motion-preset-blur-down-lg motion-loop-once relative flex h-fit w-fit flex-col gap-4`}
            >
              <span
                data-active={"/" === pathname}
                className="peer relative flex gap-1 rounded-lg p-2 transition-all duration-500 hover:[box-shadow:inset_0_0_8px_var(--violet-8)] data-[active=true]:[box-shadow:inset_0_0_8px_var(--violet-8)]"
              >
                <HomeIcon /> Home
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/booking"} prefetch legacyBehavior passHref>
            <NavigationMenuLink
              active={"/booking" === pathname}
              className={`motion-preset-blur-down-lg motion-loop-once relative flex h-fit w-fit flex-col gap-2`}
            >
              <span
                data-active={"/booking" === pathname}
                className="peer relative flex gap-1 rounded-lg p-2 transition-all duration-500 hover:[box-shadow:inset_0_0_8px_var(--violet-8)] data-[active=true]:[box-shadow:inset_0_0_8px_var(--violet-8)]"
              >
                <Rocket />
                Book Now
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
