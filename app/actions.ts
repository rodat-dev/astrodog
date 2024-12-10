"use server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { parseWithZod } from "@conform-to/zod";
import { BookingFormSchema } from "./utils/form";

const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function setTheme(formData: FormData) {
  const tv = formData.get("theme");
  console.log("theme", tv);
  if (!tv || !["dark", "light"].includes(tv.toString())) {
    console.error(`invalid theme value: ${tv}`);
  } else {
    const cookieStore = await cookies();
    console.log("Setting cookies");
    cookieStore.set("theme", tv.toString());
    console.log("server:", cookieStore.get("theme")?.value);
  }
}

export async function submitBookingForm(
  previousState: any,
  formData: FormData,
) {
  const submission = parseWithZod(formData, { schema: BookingFormSchema });
  if (submission.status === "error") {
    console.error(submission.error);
    return submission.reply({
      resetForm: true,
      formErrors: Object.entries(submission.error || {}).map(
        ([field, errors]) => `${field}: ${errors?.join(", ")}`,
      ),
    });
  }

  const payload = Object.fromEntries(
    Object.entries(submission.payload).filter(
      ([key]) => !key.startsWith("$ACTION"),
    ),
  );

  const { error } = await supabase
    .from("bookingforms")
    .insert(payload)
    .select();

  if (error) {
    return submission.reply({ formErrors: [error.message], resetForm: true });
  }

  revalidatePath("/book");
  return submission.reply({ resetForm: true });
}
