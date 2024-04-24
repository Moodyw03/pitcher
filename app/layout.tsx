import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

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
          "bg-indigo-300",
          fontSans.variable
        )}
      >
        <nav className="min-h-12 flex items-center justify-center">
          <h2 className="font-semibold text-xl">
            Slowdown or Speed up your audio!
          </h2>
        </nav>
        <main
          className=""
          style={{
            height: "calc(100vh - 3rem)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
