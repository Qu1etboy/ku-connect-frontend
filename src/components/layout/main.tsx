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
      <header className="sticky top-0 bg-white grid grid-cols-3 place-content-center text-center py-6 border-b shadow-sm">
        {backUrl && (
          <Link href={backUrl} className="pt-1">
            <ChevronLeft />
          </Link>
        )}
        <h1 className="text-xl font-bold col-start-2">{title}</h1>
      </header>
      <main className="flex-1">{children}</main>
      <Menu />
    </div>
  );
}
