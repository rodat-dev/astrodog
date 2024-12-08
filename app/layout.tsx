import type { Metadata } from "next";
import "@/app/globals.css";
import { Bodoni_Moda } from "next/font/google";
import { Navbar } from "@/app/components/static/navbar";
import { cookies, headers } from "next/headers";
import AppShell from "@/app/components/static/app-shell";
import { Suspense } from "react";
import AstrodogSkeleton from "./components/static/astrodog-skeleton";
import dynamic from "next/dynamic";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Astrodog",
  description: "A dog loving business, based in Manchester",
};

const Astrodog = dynamic(() => import("@/app/components/client/astrodog"));

export const experimental_ppr = true;

export default async function RootLayout({
  children,
  chat,
}: Readonly<{
  children: React.ReactNode;
  chat: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const currentTheme = (cookieStore.get("theme")?.value || "dark") as
    | "light"
    | "dark";

  return (
    <html lang="en" className={currentTheme}>
      <body className={`${bodoni.className} text-primary antialiased`}>
        <Suspense fallback={<AstrodogSkeleton />}>
          <Astrodog />
        </Suspense>
        <AppShell>
          <Navbar theme={currentTheme} />
          {children}
          {/* {chat} */}
        </AppShell>
      </body>
    </html>
  );
}
