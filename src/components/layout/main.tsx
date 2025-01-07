import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Menu from "../menu";
import { ThreeDot } from "react-loading-indicators";

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
    <div className="flex flex-col min-h-dvh">
      <header className="sticky top-0 z-10 bg-white pt-safe border-b shadow-sm">
        <div className="grid grid-cols-12 place-content-center text-center header-safe">
          {backUrl && (
            <Link href={backUrl} className="pt-0.5 pl-4">
              <ChevronLeft />
            </Link>
          )}
          <h1 className="text-lg md:text-xl font-bold col-start-4 col-span-6">
            {title}
          </h1>
        </div>
      </header>

      {isLoading ? (
        <main className="flex-1 h-full w-full flex justify-center items-center">
          <ThreeDot color="#bbf7d0" size="medium" />
        </main>
      ) : (
        <main className="flex-1">{children}</main>
      )}
      <Menu />
    </div>
  );
}
