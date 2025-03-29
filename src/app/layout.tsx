import MobileContainer from "@/components/container/mobile";
import DebugTool from "@/components/debug-tool";
import InstallPrompt from "@/components/install-prompt";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KU Connect",
  description: "Find friends, join activities, and connect with Nisit Kaset.",
  // Set your document to flow to the Iphone's notch area
  appleWebApp: {
    title: "KU Connect",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/ku-connect-bg-white.svg",
    apple: "/ku-connect-bg-white.svg",
  },
};

export const viewport = "width=device-width, initial-scale=1";

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
            <InstallPrompt />
            <Toaster />
            <DebugTool />
          </MobileContainer>
        </Providers>
      </body>
    </html>
  );
}
