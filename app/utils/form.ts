import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";

export const toHumanReadable = (name: string) => {
  let humanName = "";
  humanName = name.charAt(0).toUpperCase() + name.slice(1);
  const matches = /[A-Z]+/.exec(name);
  if (matches && matches.length > 0) {
    matches.forEach((m) => {
      const matchIdx = humanName.indexOf(m);
      humanName =
        humanName.slice(0, matchIdx) + " " + humanName.slice(matchIdx);
    });
  }
  return humanName;
};

export const BookingFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  phoneNumber: z
    .string()
    .regex(/^(\+44(0)?|0)\d{10}$/)
    .optional(),
  stayType: z.array(z.enum(["daycare", "overnight"])),
  dogName: z.string().min(1),
  breed: z.string().min(1),
  neutered: z.enum(["yes", "no"]),
  age: z.number().min(0).max(30),
  ageUnit: z.enum(["weeks", "months", "years"]),
  gender: z.enum(["male", "female"]),
  weight: z.number().min(0).max(40),
  temperament: z.array(z.enum(["shy", "friendly", "nervous", "anxious"])),
  additionalComments: z.string().optional(),
});

export type IBookingForm = z.infer<typeof BookingFormSchema>;

export function convertFormDataToBookingForm(
  formData: FormData,
): Record<string, any> {
  const submission = parseWithZod(formData, { schema: BookingFormSchema });
  if (submission.status === "error") {
    throw new Error(
      `Error! failed messages: ${Object.entries(submission.error || {})}`,
    );
  }

  return submission.payload;
}
