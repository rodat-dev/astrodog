import { Suspense } from "react";
import Chat from "@/app/components/client/chat";

export default function Default() {
  return (
    <section
      role="form"
      className="pointer-events-auto absolute bottom-0 right-0 z-30 m-4 flex h-[500px] w-[300px] flex-col items-center justify-start gap-2 overflow-y-auto rounded-2xl p-4 shadow-xl shadow-black/20 backdrop-blur-3xl"
    >
      <Suspense fallback={null}>
        <Chat />
      </Suspense>
    </section>
  );
}
