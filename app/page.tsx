import { clickerClass } from "@/components/styles/clicker";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pointer-events-auto absolute bottom-[10dvh] left-0 right-0 z-10 mx-auto flex h-fit w-fit flex-col items-center justify-center">
      <Link
        href={"/booking"}
        className={clickerClass({
          fontSize: "[font-size:var(--font-size-fluid-2)] md:text-3xl",
        })}
      >
        Book Now
      </Link>
    </div>
  );
}
