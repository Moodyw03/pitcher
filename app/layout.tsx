import { Toaster } from "react-hot-toast";
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
          "relative min-h-screen bg-background font-sans antialiased bg-cover bg-center",
          fontSans.variable
        )}
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      >
        <Toaster />
        <Nav />
        <main className="h-screen">{children}</main>
      </body>
    </html>
  );
}
