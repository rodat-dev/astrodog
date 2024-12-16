import type { Metadata } from "next";
import "@/app/globals.css";
import "open-props/style";
import { ThemeProvider } from "./providers/theme";
import Main from "@/components/layout/page-transition";
import { Navbar } from "@/components/layout/navbar";
import { Gugi } from "next/font/google";
import Container from "@/components/layout/container";
import ChatButton from "@/components/ui/chat-button";
import { Suspense } from "react";
import AstrodogScene from "@/components/3d/astrodog-scene";
import { AstrodogToaster } from "@/components/ui/astrodog-toaster";

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
            <Navbar className="sticky left-0 top-0 flex h-[80px] items-center justify-start backdrop-blur-lg" />

            <section className="pointer-events-none absolute inset-0 z-0">
              <Suspense fallback={null}>
                <AstrodogScene />
              </Suspense>
            </section>
            <Main>{children}</Main>
          </Container>
          <AstrodogToaster />
          <ChatButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
