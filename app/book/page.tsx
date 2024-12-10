import dynamic from "next/dynamic";
import { Suspense } from "react";
import { vstack } from "../components/ui/patterns/vstack";

const BookingForm = dynamic(() => import("@/app/components/ui/booking-form"));

export const experimental_ppr = true;

export default function Page() {
  return (
    <section className={vstack("h-full w-screen p-4")}>
      <h1 className="prose prose-2xl text-stone-200">Booking Form</h1>
      <Suspense fallback={null}>
        <BookingForm />
      </Suspense>
    </section>
  );
}
