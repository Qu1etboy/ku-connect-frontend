import React from "react";

type MobileContainerProps = {
  children: React.ReactNode;
};

export default function MobileContainer({ children }: MobileContainerProps) {
  return <div className="max-w-md mx-auto">{children}</div>;
}
