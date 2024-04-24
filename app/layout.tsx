import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import Nav from "@/components/nav";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pitcher",
  description: "Speeding up/slowing down audio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      >
        <Nav />
        <main
          style={{
            height: "calc(100vh - 4rem)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
