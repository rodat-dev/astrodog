import { z } from "zod";

export const BookingFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  phoneNumber: z
    .string()
    .regex(/^(\+44(0)?|0)\d{10}$/, { message: "Invalid UK phone number" })
    .optional(),
  stayType: z.array(z.enum(["daycare", "overnight"])),
  dogName: z.string().min(1, { message: "Dog name is required" }),
  breed: z.string().min(1, { message: "Breed is required" }),
  neutered: z.enum(["yes", "no"]),
  age: z.number().min(0, { message: "Age must be a positive number" }).max(50),
  ageUnit: z.enum(["weeks", "months", "years"]),
  gender: z.enum(["male", "female"]),
  weight: z
    .number()
    .min(0, { message: "Weight must be a positive number" })
    .max(40),
  temperament: z.array(z.enum(["shy", "friendly", "nervous", "anxious"])),
  additionalComments: z.string().optional(),
});

export type IBookingForm = z.infer<typeof BookingFormSchema>;
