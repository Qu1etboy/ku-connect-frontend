import MobileContainer from "@/components/container/mobile";
import DebugTool from "@/components/debug-tool";
import InstallPrompt from "@/components/install-prompt";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
            <InstallPrompt />
            <Toaster />
            <DebugTool />
          </MobileContainer>
        </Providers>
      </body>
    </html>
  );
}
