import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileContainer from "@/components/container/mobile";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

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
        <Providers>
          <MobileContainer>
            {children}
            <Toaster />
          </MobileContainer>
        </Providers>
      </body>
    </html>
  );
}
