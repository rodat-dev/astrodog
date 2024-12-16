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
      <body className={`relative antialiased ${gugi.className}`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundGradient />
          <section className="pointer-events-auto absolute left-0 top-0 flex h-full w-dvw">
            <Suspense fallback={null}>
              <AstrodogScene />
            </Suspense>
          </section>
          <div className="pointer-events-none relative z-10 grid h-dvh w-dvw grid-rows-[80px_1fr]">
            <Navbar />
            <Main>{children}</Main>
          </div>
          <div className="relative z-20">
            <ChatButton />
            <AstrodogToaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
