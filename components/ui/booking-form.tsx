"use client";

import { useActionState, useEffect } from "react";
import { createBooking } from "@/app/actions/booking";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { TitleWithGradient } from "@/components/ui/title";
import { GlowingButton } from "@/components/ui/glowing-button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export default function BookingForm() {
  const [state, action, isPending] = useActionState(createBooking, {
    message: "",
    errors: {},
  });
  const stayTypes = ["daycare", "overnight"];
  const temperaments = ["shy", "friendly", "nervous", "anxious"];

  const { toast } = useToast();
  useEffect(() => {
    if (state.message) {
      toast({
        variant: state.variant as "destructive" | "default",
        title: state.success ? "*Woofs of Joy*!" : "*Sad Woof*",
        description: state.message,
        action: (
          <ToastAction altText="Close">
            {state.success ? "Try again" : "Close"}
          </ToastAction>
        ),
        duration: 5000,
      });
    }
  }, [state.message, state.success, toast]);

  return (
    <Card className="mx-auto max-w-2xl border-none bg-black/10 backdrop-blur-lg [box-shadow:inset_0_0_10px_rgba(255,255,255,0.1)]">
      <form action={action} className="flex flex-col gap-8 p-8">
        <TitleWithGradient>Book Your Dog&apos;s Adventure</TitleWithGradient>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-400 md:text-center">
            Dog parent
          </h2>
          <div className="grid gap-8">
            <div className="w-full space-y-4 text-center md:px-24">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                className="border-none bg-black/50 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:outline-none focus:ring-0 md:p-6"
              />
            </div>
            <div className="w-full space-y-4 text-center md:px-24">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="border-none bg-black/50 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:outline-none focus:ring-0 md:p-6"
              />
            </div>
            <div className="w-full space-y-4 text-center md:px-24">
              <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                pattern="^(\+44(0)?|0)\d{10}$"
                placeholder="+44 or 0 followed by 10 digits"
                className="border-none bg-black/50 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:outline-none focus:ring-0 md:p-6"
              />
            </div>
            <div className="mx-auto flex w-full flex-col items-center space-y-4 rounded-lg bg-violet-800/10 p-6 text-center md:w-[300px] md:justify-center">
              <Label>Stay Type</Label>
              <div className="flex gap-4 rounded-md">
                {stayTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={type} name="stayType" value={type} />
                    <Label htmlFor={type} className="capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dog Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-400 md:text-center">
            Your Dog
          </h2>
          <div className="grid gap-8">
            <div className="w-full space-y-2 text-center md:px-24">
              <Label htmlFor="dogName">Name</Label>
              <Input
                id="dogName"
                name="dogName"
                required
                className="border-none bg-black/50 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:outline-none focus:ring-0 md:p-6"
              />
            </div>
            <div className="w-full space-y-2 text-center md:px-24">
              <Label htmlFor="breed">Breed</Label>
              <Input
                id="breed"
                name="breed"
                required
                className="border-none bg-black/50 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:outline-none focus:ring-0 md:p-6"
              />
            </div>
            <div className="mx-auto flex w-full flex-col items-center space-y-4 rounded-lg bg-violet-800/10 p-6 text-center md:w-[300px] md:justify-center">
              <Label>Neutered</Label>
              <RadioGroup
                name="neutered"
                className="flex gap-4 md:justify-center"
                defaultValue="no"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mx-auto flex w-full flex-col items-center space-y-4 rounded-lg bg-violet-800/10 p-6 text-center md:w-[300px] md:justify-center">
              <Label>Gender</Label>
              <RadioGroup
                name="gender"
                className="flex gap-4 md:justify-center"
                defaultValue="male"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="w-full space-y-2 text-center md:px-24">
              <Label htmlFor="age">Age</Label>
              <div className="flex gap-2">
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="50"
                  required
                  className="border-none bg-black/50 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:[box-shadow:inset_0_0_10px_var(--violet-8)] md:p-6"
                />
                <select
                  name="ageUnit"
                  className="rounded-md border border-none bg-black/50 px-3 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:[box-shadow:inset_0_0_10px_var(--violet-8)]"
                  defaultValue="years"
                >
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
            <div className="w-full space-y-2 text-center md:px-24">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                min="0"
                max="40"
                required
                className="border-none bg-black/50 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:[box-shadow:inset_0_0_10px_var(--violet-8)] md:p-6"
              />
            </div>
          </div>
        </div>

        {/* Temperament */}
        <div className="mx-auto flex w-full flex-col items-center space-y-4 rounded-lg bg-violet-800/10 p-6 text-center md:w-[300px] md:justify-center">
          <Label>Temperament</Label>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-2 md:justify-center">
            {temperaments.map((temp) => (
              <div key={temp} className="flex items-center space-x-2">
                <Checkbox id={temp} name="temperament" value={temp} />
                <Label htmlFor={temp} className="capitalize">
                  {temp}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Comments */}
        <div className="w-full space-y-2 text-center md:px-24">
          <Label htmlFor="additionalComments">Additional Comments</Label>
          <Textarea
            id="additionalComments"
            name="additionalComments"
            className="min-h-[100px] border-none bg-black/50 transition-all duration-300 [box-shadow:inset_0_0_10px_var(--violet-8)] focus:scale-105 focus:[box-shadow:inset_0_0_10px_var(--violet-8)] md:p-6"
          />
        </div>

        {/* Submit Button */}
        <GlowingButton
          type="submit"
          isPending={isPending}
          fromColor="#c084fc"
          toColor="#3b82f6"
          viaColor="#6d28d9"
          className="mx-auto w-full p-6 md:w-fit md:min-w-[20ch]"
        >
          {isPending ? "Submitting..." : "Book Now"}
        </GlowingButton>
      </form>
    </Card>
  );
}
