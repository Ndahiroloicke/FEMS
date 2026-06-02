import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FEMS — Fire Extinguisher Management",
  description: "Manage fire extinguisher sales, expiry tracking, and compliance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
