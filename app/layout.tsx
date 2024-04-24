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
          fontSans.variable
        )}
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      >
        <nav className="min-h-16 flex items-center justify-center">
          <div className="relative w-max">
            <div className="absolute transition-all duration-1000 opacity-50 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
            <div className="relative font-semibold text-3xl text-white">
              Slowdown or Speed up your audio!
            </div>
          </div>
        </nav>
        <main
          className=""
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
