import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "./providers/theme";
import { Navbar } from "@/components/layout/navbar";
import {
  Amarante,
  Baskervville_SC,
  Baumans,
  DM_Sans,
  Dosis,
  Gugi,
  Play,
  Rubik,
  Rubik_Mono_One,
} from "next/font/google";
import Container from "@/components/layout/container";
import ChatButton from "@/components/ui/chat-button";
import { Suspense } from "react";
import AstrodogScene from "@/components/3d/astrodog-scene";
import "open-props/style";
import { AstrodogToaster } from "@/components/ui/astrodog-toaster";

const rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
});

const monoone = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
});

const dosis = Dosis({
  subsets: ["latin"],
  weight: "variable",
});

const baskerville = Baskervville_SC({
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "variable",
});

const baumans = Baumans({
  subsets: ["latin"],
  weight: "400",
});

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
      <body className={`h-dvh w-dvw antialiased ${gugi.className}`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Container>
            <Navbar className="sticky left-0 top-0 flex h-fit w-full !max-w-full items-center justify-center p-2 backdrop-blur-lg" />

            <section className="pointer-events-none absolute inset-0 z-0">
              <Suspense fallback={null}>
                <AstrodogScene />
              </Suspense>
            </section>
            <section className="pointer-events-none z-10 flex h-full w-full flex-col overflow-y-auto">
              {children}
            </section>
          </Container>
          <AstrodogToaster />
          <ChatButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
