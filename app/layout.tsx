import type { Metadata } from "next";
import "@/app/globals.css";
import "open-props/style";
import { ThemeProvider } from "./providers/theme";
import Main from "@/components/layout/page-transition";
import { Navbar } from "@/components/layout/navbar";
import { Gugi } from "next/font/google";
import ChatButton from "@/components/ui/chat-button";
import { Suspense } from "react";
import AstrodogScene from "@/components/3d/astrodog-scene";
import { AstrodogToaster } from "@/components/ui/astrodog-toaster";
import BackgroundGradient from "@/components/layout/background-gradient";

const gugi = Gugi({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Astrodog AI",
  description: "Your dogsitting AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${gugi.className}`}>
        <section className="absolute left-0 top-0 flex h-full w-full overflow-hidden">
          <Suspense fallback={null}>
            <AstrodogScene />
          </Suspense>
          <BackgroundGradient />
        </section>
        <div className="pointer-events-none z-10 grid h-full w-full grid-rows-[80px_1fr]">
          <Navbar />
          <Main>{children}</Main>
        </div>
        <ChatButton />
        <AstrodogToaster />
      </body>
    </html>
  );
}
