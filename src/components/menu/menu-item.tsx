import { cn } from "@/lib/utils";
import React from "react";

type MenuItemProps = {
  active?: boolean;
  children: React.ReactNode;
};

export default function MenuItem({ active, children }: MenuItemProps) {
  return (
    <li
      className={cn(
        active ? "text-black border-t border-black" : "text-gray-500"
      )}
    >
      {children}
    </li>
  );
}
