import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileContainer from "@/components/container/mobile";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KU Connect",
  description: "Find friends, join activities, and connect with Nisit Kaset.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <MobileContainer>
          {children}
          <Toaster />
        </MobileContainer>
      </body>
    </html>
  );
}
