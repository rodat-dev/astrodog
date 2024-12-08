import Form from "next/form";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { setTheme } from "@/app/actions";

export default function ThemeToggle({ theme }: UserSettingsProps) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  return (
    <Form
      action={setTheme}
      className="h-10.5 w-10.5 relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-r-full border-2 border-slate-200/70 bg-transparent p-2 backdrop-blur-sm"
    >
      <input
        type="text"
        name="theme"
        value={nextTheme}
        className="sr-only"
        readOnly
        aria-label="form to define user specific theme settings"
      />
      <button
        className="ring-offset-background focus-visible:ring-ring flex h-full w-full cursor-pointer items-center justify-center bg-transparent opacity-100 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:[&>*]:text-indigo-300/90 dark:hover:[&>*]:text-amber-200/90"
        type="submit"
      >
        {theme === "light" ? (
          <MoonIcon
            data-theme="dark"
            className="pointer-events-none grow transition-all duration-300"
          />
        ) : (
          <SunIcon
            data-theme="light"
            className="pointer-events-none grow transition-all duration-300"
          />
        )}
      </button>
    </Form>
  );
}
