"use server";
import { BookingFormSchema } from "@/lib/schema";
import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function createBooking(prevState: any, formData: FormData) {
  const validatedFields = BookingFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    stayType: formData.getAll("stayType") || "",
    dogName: formData.get("dogName"),
    breed: formData.get("breed"),
    neutered: formData.get("neutered"),
    age: Number(formData.get("age")),
    ageUnit: formData.get("ageUnit"),
    gender: formData.get("gender"),
    weight: Number(formData.get("weight")),
    temperament: formData.getAll("temperament"),
    additionalComments: formData.get("additionalComments") || "",
  });

  if (!validatedFields.success) {
    console.log(JSON.stringify(validatedFields.error.flatten().fieldErrors));
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: `Please check the form for errors: ${JSON.stringify(validatedFields.error.flatten().fieldErrors)}`,
      success: false,
      variant: "destructive",
    };
  }

  try {
    const { data, error } = await supabase
      .from("bookingforms")
      .insert(validatedFields.data)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return {
      errors: [],
      message: "Enquiry submitted successfully!",
      success: true,
      variant: "success",
    };
  } catch (error) {
    return {
      errors: [error],
      message: "Something went wrong. Please try again.",
      success: false,
      variant: "destructive",
    };
  }
}
