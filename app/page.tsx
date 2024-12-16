import { clickerClass } from "@/components/styles/clicker";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main
      role="main"
      className="pointer-events-auto absolute bottom-[10dvh] left-0 right-0 z-10 mx-auto flex h-fit w-fit flex-col items-center justify-center"
    >
      <Link
        href={"/booking"}
        className={cn(
          clickerClass({
            fontSize: "[font-size:var(--font-size-fluid-2)] md:text-3xl",
          }),
          "motion-preset-blur-down-lg motion-loop-once motion-duration-300",
        )}
      >
        Book Now
      </Link>
    </main>
  );
}
