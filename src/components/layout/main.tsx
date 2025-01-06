import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Menu from "../menu";

type MainLayoutProps = {
  title: string;
  backUrl?: string;
  children: React.ReactNode;
};

export default function MainLayout({
  title,
  backUrl,
  children,
}: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="sticky top-0 z-10 bg-white pt-safe border-b shadow-sm">
        <div className="grid grid-cols-12 place-content-center text-center pb-6 pt-0 md:py-6">
          {backUrl && (
            <Link href={backUrl} className="pt-1 pl-4">
              <ChevronLeft />
            </Link>
          )}
          <h1 className="text-lg md:text-xl font-bold col-start-4 col-span-6">
            {title}
          </h1>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Menu />
    </div>
  );
}
