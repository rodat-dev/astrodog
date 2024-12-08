import nextDynamic from "next/dynamic";
import { Suspense } from "react";
import AstrodogSkeleton from "./components/static/astrodog-skeleton";
import { headers } from "next/headers";

const Astrodog = nextDynamic(() => import("@/app/components/client/astrodog"));

export const dynamic = "force-static";

export default async function Home() {
  console.log((await headers()).get("x-path"));
  return (
    <>
      {/* <section
        id="astrodog-scene"
        className="pointer-events-auto fixed left-0 top-0 m-0 h-dvh w-dvw p-0"
      >
        <Suspense fallback={<AstrodogSkeleton />}>
          <Astrodog />
        </Suspense>
      </section> */}
    </>
  );
}
