import type { Metadata } from "next";
import "@/app/globals.css";
import "open-props/style";
import Main from "@/components/layout/page-transition";
import { Gugi } from "next/font/google";
import { Suspense } from "react";
import { AstrodogToaster } from "@/components/ui/astrodog-toaster";
import BackgroundGradient from "@/components/layout/background-gradient";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import ChatButton from "@/components/ui/chat-button";

const gugi = Gugi({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Astrodog AI",
  description: "Your dogsitting AI assistant",
};

const AstrodogScene = dynamic(() => import("@/components/3d/astrodog-scene"));

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${gugi.className}`}>
        <div className="pointer-events-none z-10 grid h-full w-full grid-rows-[auto_1fr_auto] flex-col items-center">
          <Navbar />
          <Main>{children}</Main>
          <ChatButton />
        </div>
        <section className="pointer-events-none absolute left-0 top-0 z-0 flex h-dvh w-dvw overflow-hidden">
          <Suspense fallback={null}>
            <AstrodogScene />
          </Suspense>
        </section>
        <BackgroundGradient />
        <AstrodogToaster />
      </body>
    </html>
  );
}
