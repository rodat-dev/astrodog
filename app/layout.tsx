import type { Metadata } from "next";
import "@/app/globals.css";
import { Audiowide } from "next/font/google";
import { Navbar } from "@/app/components/static/navbar";
import AppShell from "@/app/components/static/app-shell";
import { Suspense } from "react";
import AstrodogSkeleton from "./components/static/astrodog-skeleton";
import nextDynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const audio = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Astrodog",
  description: "A dog loving business, based in Manchester",
};

const Astrodog = nextDynamic(() => import("@/app/components/client/astrodog"));

export const experimental_ppr = true;

export default function RootLayout({
  children,
  chat,
}: Readonly<{
  children: React.ReactNode;
  chat: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${audio.className} text-primary antialiased`}>
        <ThemeProvider
          storageKey="theme"
          defaultTheme="dark"
          attribute={"class"}
          enableSystem
        >
          <Suspense fallback={<AstrodogSkeleton />}>
            <Astrodog />
          </Suspense>
          <AppShell>
            <Navbar />
            {children}
            {/* {chat} */}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
