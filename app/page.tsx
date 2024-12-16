import { clickerClass } from "@/components/styles/clicker";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="absolute bottom-[10dvh] left-0 mx-auto flex h-fit w-full flex-col items-center justify-center">
        <Link
          href={"/booking"}
          className={clickerClass({
            fontSize: "[font-size:var(--font-size-fluid-2)] md:text-3xl",
          })}
        >
          Book Now
        </Link>
      </section>
    </>
  );
}
