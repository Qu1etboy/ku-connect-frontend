import React from "react";

type MobileContainerProps = {
  children: React.ReactNode;
};

export default function MobileContainer({ children }: MobileContainerProps) {
  return <div className="relative max-w-md mx-auto min-h-dvh">{children}</div>;
}
