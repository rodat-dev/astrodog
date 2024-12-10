"use client";
import { Select } from "@headlessui/react";
import { Suspense, useActionState, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { submitBookingForm } from "@/app/actions";
import TextInputWithLabel, {
  TextAreaWithLabel,
} from "@/app/components/ui/form/text-input";
import CheckboxGroup from "./form/checkbox-group";
import Checkbox from "./form/checkbox";
import { vstack } from "./patterns/vstack";
import { createPortal } from "react-dom";
const XButton = dynamic(() => import("@/app/components/client/x-button"));

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [result, action, isPending] = useActionState(submitBookingForm, {});
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true));
  if (!mounted) return null;

  return createPortal(
    <form
      ref={formRef}
      action={action}
      className="z-5 group mx-auto grid h-fit w-screen place-items-center gap-8 rounded-2xl px-10 pb-10 shadow-stone-100/90 md:w-[40%]"
    >
      <section
        id="person-section"
        className="relative mt-6 w-full -space-y-px rounded-2xl bg-stone-200/5 shadow-[0_0_8px_2px] backdrop-blur-lg"
      >
        <TextInputWithLabel
          label="Name"
          type="text"
          required
          autoComplete="name"
          name="name"
        />
        <TextInputWithLabel
          label="Email"
          type="email"
          required
          aria-errormessage="Invalid email format (e.g. 'example@gmail.com')"
          autoComplete="email"
          name="email"
        />
        <TextInputWithLabel
          label="Mobile"
          type="text"
          autoComplete="mobile tel"
          placeholder=""
          name="phoneNumber"
        />
        <div className="px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
          <CheckboxGroup name="stayType">
            <h3 className="text-stone-300/60">Type of Stay</h3>
            <p className="text-xs text-stone-300/60">
              Whether you're interested in daycare and/or overnight stays
            </p>
            <Checkbox
              type="checkbox"
              name="stayType"
              label="Daycare"
              value="daycare"
            />
            <Checkbox
              type="checkbox"
              name="stayType"
              label="Overnight"
              value="overnight"
            />
          </CheckboxGroup>
        </div>
      </section>
      <section
        id="dog-section"
        className="relative mt-6 h-fit w-full -space-y-px rounded-2xl bg-stone-200/5 shadow-[0_0_8px_2px] backdrop-blur-lg"
      >
        <TextInputWithLabel
          label="Dog Name"
          type="text"
          name="dogName"
          required
        />
        <TextInputWithLabel label="Breed" type="text" name="breed" required />
        <div className="flex flex-col gap-2 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
          <h3 className="text-stone-300/60">Neutered</h3>
          <Select
            name="neutered"
            required
            className="border-1 h-fit w-full rounded-2xl border-transparent bg-transparent p-2 shadow-[0_0_6px_1px] transition-all focus:shadow-[0_0_8px_2px] focus:outline-none focus:ring-transparent"
            defaultValue={"yes"}
          >
            <option value={"yes"}>Yes</option>
            <option value={"no"}>No</option>
          </Select>
        </div>
        <div className="grid w-full grid-flow-col grid-cols-2 place-items-center gap-4 pr-6">
          <TextInputWithLabel
            label="Age"
            type="number"
            name="age"
            required
            min={1}
            max={30}
          />
          <Select
            name="ageUnit"
            required
            className="border-1 h-fit w-full rounded-2xl border-transparent bg-transparent p-2 shadow-[0_0_6px_1px] transition-all focus:shadow-[0_0_8px_2px] focus:outline-none focus:ring-transparent"
            defaultValue={"years"}
          >
            <option value={"years"}>year(s)</option>
            <option value={"months"}>month(s)</option>
            <option value={"days"}>day(s)</option>
          </Select>
        </div>
        <TextInputWithLabel
          label="Dog Weight (in kg)"
          type="number"
          name="weight"
          required
          min={1}
          max={50}
        />
        <div className="flex flex-col gap-2 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
          <h3 className="text-stone-300/60">Gender</h3>
          <Select
            id="gender"
            name="gender"
            className="border-1 h-fit w-full rounded-2xl border-transparent bg-transparent p-3 shadow-[0_0_6px_1px] transition-all focus:shadow-[0_0_8px_2px] focus:outline-none focus:ring-transparent"
            required
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </Select>
        </div>

        <div className={vstack("gap-2")}>
          <h3 className="text-stone-300/60">Temperament</h3>
          <p className="text-xs text-stone-300/60">
            A brief description of your dog's behavior
          </p>
          <CheckboxGroup name="temperament">
            <Checkbox
              type="checkbox"
              name="temperament"
              value="shy"
              label="Shy"
            />
            <Checkbox
              type="checkbox"
              name="temperament"
              value="shy"
              label="Friendly"
            />
            <Checkbox
              type="checkbox"
              name="temperament"
              value="shy"
              label="Agressive"
            />
            <Checkbox
              type="checkbox"
              name="temperament"
              value="shy"
              label="Nervous"
            />
          </CheckboxGroup>
        </div>
        <TextAreaWithLabel
          label="Additional Comments"
          type="text"
          name="additionalComments"
          className="p-6"
          formNoValidate={true}
        />
      </section>
      <Suspense fallback={null}>
        <XButton
          formRef={formRef}
          isLoading={isPending}
          result={result}
          disabled={isPending}
          aria-disabled={isPending}
          type="submit"
        >
          Submit
        </XButton>
      </Suspense>
    </form>,
    document.body,
  );
}
