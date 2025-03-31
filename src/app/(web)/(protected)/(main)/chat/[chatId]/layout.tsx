import { Metadata, Viewport } from "next";
import React from "react";

export const metadata: Metadata = {
  appleWebApp: {
    title: "KU Connect",
    capable: true,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function ChatMessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
