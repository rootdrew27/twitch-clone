import PolyFill from './polyfills'
import { ClerkProvider } from "@clerk/nextjs";
import { PrimeReactProvider } from 'primereact/api';
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Twitch Clone",
  description: "A precursor to Disco.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/" appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className="absolute h-full w-full">
          <PrimeReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <PolyFill />
              {children}
              <Toaster />
            </ThemeProvider>
          </PrimeReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
