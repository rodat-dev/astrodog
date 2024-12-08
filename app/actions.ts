"use server";
import { cookies } from "next/headers";

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
