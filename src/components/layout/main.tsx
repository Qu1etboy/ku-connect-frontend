import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThreeDot } from "react-loading-indicators";
import Menu from "../menu";

type MainLayoutProps = {
  title: string;
  backUrl?: string;
  isLoading?: boolean;
  children: React.ReactNode;
};

export default function MainLayout({
  title,
  backUrl,
  isLoading,
  children,
}: MainLayoutProps) {
  return (
    <div className="flex h-dvh flex-col">
      <header className="pt-safe sticky top-0 z-20 border-b bg-white shadow-sm">
        <div className="header-safe grid grid-cols-12 place-content-center text-center">
          {backUrl && (
            <Link href={backUrl} className="pl-4 pt-0.5">
              <ChevronLeft />
            </Link>
          )}
          <h1 className="col-span-6 col-start-4 text-lg font-bold md:text-xl">
            {title}
          </h1>
        </div>
      </header>

      {isLoading ? (
        <main className="flex h-full w-full flex-1 items-center justify-center">
          <ThreeDot color="#bbf7d0" size="medium" />
        </main>
      ) : (
        <main className="flex-1">{children}</main>
      )}
      <Menu />
    </div>
  );
}
