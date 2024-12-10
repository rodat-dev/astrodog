import { convertFormDataToBookingForm } from "@/app/utils/form";
import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function POST(req: Request) {
  const bf = convertFormDataToBookingForm((await req.json()) as FormData);

  const { data, error } = await supabase
    .from("bookingforms")
    .insert(bf)
    .select();
  if (error) {
    console.error(`Failed to persist data to supabase: ${error.message}`);
    return new Response(JSON.stringify(error), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
