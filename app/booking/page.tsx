import BookingForm from "@/components/ui/booking-form";

export default function Page() {
  return (
    <main
      role="main"
      className="pointer-events-auto h-full w-full overflow-y-auto p-2 md:py-4"
    >
      <BookingForm />
    </main>
  );
}
