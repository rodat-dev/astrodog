"use client";

import {
  InputHTMLAttributes,
  ReactNode,
  useActionState,
  useEffect,
  useRef,
} from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { createBooking } from "@/app/actions/booking";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { TitleWithGradient } from "@/components/ui/title";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Button } from "./button";
import { clickerClass } from "../styles/clicker";
import { CheckIcon, CrossIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardStyles } from "../styles/cards";
import { createPortal } from "react-dom";

function InputFieldWithLabel({
  id,
  name,
  label,
  type = "text",
  className,
  children,
  isTextArea = false,
  ...props
}: {
  label: string;
  className?: string;
  children?: ReactNode;
  isTextArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className="relative mx-auto flex h-fit w-full rounded-lg p-1 text-center [box-shadow:inset_0_0_6px_var(--violet-8)] md:w-[60%]">
      {isTextArea ? (
        <Textarea
          id={id}
          name={name}
          placeholder=" "
          {...props}
          className={cn(
            "peer border-none bg-black/50 p-4 transition-all duration-300 valid:ring-1 valid:ring-green-300 valid:placeholder-shown:ring-0 invalid:ring-1 invalid:ring-red-500 invalid:placeholder-shown:ring-0 focus:outline-none focus:ring-0",
            className,
          )}
        />
      ) : (
        <Input
          id={id}
          name={name}
          placeholder=" "
          type={type}
          className={cn(
            "peer border-none bg-black/50 p-4 transition-all duration-300 valid:ring-1 valid:ring-green-300 valid:placeholder-shown:ring-0 invalid:ring-1 invalid:ring-red-500 invalid:placeholder-shown:ring-0 focus:outline-none focus:ring-0",
            className,
          )}
          {...props}
        />
      )}
      <Label
        className="absolute bottom-0 left-5 -translate-y-full text-foreground/50 opacity-0 peer-placeholder-shown:opacity-100 peer-focus-visible:opacity-0"
        htmlFor={id}
      >
        {label}
      </Label>
      <CheckIcon className="absolute bottom-0 right-2 h-4 w-4 -translate-y-full text-green-300 peer-placeholder-shown:hidden peer-valid:visible peer-invalid:hidden peer-valid:peer-focus:hidden md:right-5" />
      <CrossIcon className="absolute bottom-0 right-2 h-4 w-4 -translate-y-full text-red-400 peer-placeholder-shown:hidden peer-valid:hidden peer-invalid:visible peer-invalid:peer-focus:hidden md:right-5" />
      {children}
    </div>
  );
}

export default function BookingForm() {
  const [state, action, isPending] = useActionState(createBooking, {
    message: "",
    errors: {},
    success: false,
    variant: "default",
  });

  const confettiRef = useRef<HTMLCanvasElement>(null);
  const { width } = useWindowSize();
  const stayTypes = ["daycare", "overnight"];
  const temperaments = ["shy", "friendly", "nervous", "anxious"];
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  useEffect(() => {
    if (state.message.length > 0) {
      toast({
        variant: state.variant as "destructive" | "default",
        title: state.success ? "*Woofs of Joy*!" : "*Sad Woof*",
        description: state.message,
        action: (
          <ToastAction altText="Close">
            {state.success ? "Close" : "Try again"}
          </ToastAction>
        ),
        duration: 5000,
      });
    }

    if (state.success && confettiRef.current) {
      setTimeout(() => {
        confettiRef.current?.remove();
      }, 10000);
    }
  }, [state.message, state.success, toast]);

  return (
    <>
      {state.success &&
        createPortal(
          <Confetti
            ref={confettiRef}
            width={width}
            height={2000}
            className="pointer-events-none touch-none"
          />,
          document.body,
        )}

      <Card
        ref={cardRef}
        className={`mx-auto flex h-fit w-full flex-col border-none md:w-[60%] ${cardStyles.glassy}`}
      >
        <form
          action={action}
          className="pointer-events-auto flex flex-1 flex-col gap-8 p-8"
        >
          <TitleWithGradient>Booking Form</TitleWithGradient>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-violet-300 md:text-center">
              Dog parent
            </h2>
            <div className="grid gap-8">
              <InputFieldWithLabel
                label="Name"
                id="name"
                name="name"
                required
              />
              <InputFieldWithLabel
                label="Email"
                id="email"
                name="email"
                type="email"
                required
              />
              <InputFieldWithLabel
                label="Phone Number (Optional)"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                pattern="^(\+44(0)?|0)\d{10}$"
                placeholder=" "
              />

              <div className="mx-auto flex w-full flex-col items-center space-y-4 rounded-lg bg-violet-800/10 p-6 text-center md:w-[300px] md:justify-center">
                <Label>Stay Type</Label>
                <div className="flex w-full justify-evenly rounded-md p-2">
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
            <h2 className="text-xl font-semibold text-violet-300 md:text-center">
              Your Dog
            </h2>
            <div className="grid gap-8">
              <InputFieldWithLabel
                label="Name"
                id="dogName"
                name="dogName"
                required
              />
              <InputFieldWithLabel
                label="Breed"
                id="breed"
                name="breed"
                required
              />
              <div className="mx-auto flex w-full flex-col items-center space-y-4 rounded-lg bg-violet-800/10 p-6 text-center md:w-[300px] md:justify-center">
                <Label>Neutered</Label>
                <RadioGroup
                  name="neutered"
                  className="flex w-full justify-evenly p-2"
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
                  className="flex w-full justify-evenly p-2"
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

              <InputFieldWithLabel
                label="Age"
                id="age"
                name="age"
                type="number"
                min={0}
                max={50}
                required
                className="peer rounded-r-none"
              >
                <select
                  name="ageUnit"
                  className="inline rounded-md rounded-l-none border border-none bg-black/50 px-3 transition-all duration-300 peer-valid:ring-1 peer-valid:ring-green-300 peer-valid:peer-placeholder-shown:ring-0 peer-invalid:ring-1 peer-invalid:ring-red-500 peer-invalid:peer-placeholder-shown:ring-0"
                  defaultValue="years"
                >
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </InputFieldWithLabel>

              <InputFieldWithLabel
                label="Weight (kg)"
                id="weight"
                name="weight"
                type="number"
                min={0}
                max={40}
                required
              />
            </div>
          </div>

          {/* Temperament */}
          <div className="mx-auto flex w-full flex-col items-center space-y-4 rounded-lg bg-violet-800/10 p-6 text-center md:w-[300px] md:justify-center">
            <Label>Temperament</Label>
            <div className="grid grid-cols-2 justify-evenly gap-4 p-2 md:grid-cols-2">
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
          <InputFieldWithLabel
            label="Additional Comments"
            id="comments"
            name="comments"
            isTextArea
          />

          {/* Submit Button */}
          <Button
            disabled={isPending}
            type="submit"
            className={clickerClass({
              borderRadius: "rounded-lg",
              className: "mx-auto w-fit min-w-[20ch] p-6",
            })}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Card>
    </>
  );
}
