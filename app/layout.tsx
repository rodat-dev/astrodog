import type { Metadata } from "next";
import "@/app/globals.css";
import {
  Anta,
  Audiowide,
  Iceland,
  Orbitron,
  Reggae_One,
} from "next/font/google";
import { Navbar } from "@/app/components/static/navbar";
import AppShell from "@/app/components/static/app-shell";
import { Suspense } from "react";
import AstrodogSkeleton from "./components/static/astrodog-skeleton";
import nextDynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const reggae = Reggae_One({
  subsets: ["latin"],
  weight: "400",
});

const anta = Anta({
  subsets: ["latin"],
  weight: "400",
});

const iceland = Iceland({
  subsets: ["latin"],
  weight: "400",
});

const audio = Audiowide({
  subsets: ["latin"],
  weight: "400",
});

const o = Orbitron({
  subsets: ["latin"],
  weight: "variable",
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
      <body
        className={`${reggae.className} font-stretch-extra-condensed font-light text-stone-200 antialiased`}
      >
        <ThemeProvider
          storageKey="theme"
          defaultTheme="dark"
          attribute={"class"}
          enableSystem
        >
          <Navbar />
          {children}
          {/* {chat} */}
          <Suspense fallback={<AstrodogSkeleton />}>
            <Astrodog />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
