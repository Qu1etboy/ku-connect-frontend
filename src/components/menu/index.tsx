"use client";

import React from "react";
import MenuItem from "./menu-item";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, House, MessageCircle, UserRound } from "lucide-react";

const menu = [
  {
    name: "Home",
    icon: <House />,
    url: "/",
  },
  {
    name: "Chat",
    icon: <MessageCircle />,
    url: "/chat",
  },
  {
    name: "Alert",
    icon: <Bell />,
    url: "/alert",
  },
  {
    name: "Profile",
    icon: <UserRound />,
    url: "/profile",
  },
];

export default function Menu() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (pathname === path) {
      return true;
    }
    if (path === "/") {
      return;
    }
    return pathname.includes(path);
  };

  return (
    <nav className="sticky bottom-0 w-full border-t bg-white">
      <ul className="flex items-center justify-between">
        {menu.map((item) => (
          <MenuItem key={item.url} active={isActive(item.url)}>
            <Link
              href={item.url}
              className="flex flex-col items-center justify-center px-4 py-2"
            >
              {item.icon}
              <span className="pb-safe mt-1 px-3 text-xs md:px-0 md:text-sm">
                {item.name}
              </span>
            </Link>
          </MenuItem>
        ))}
      </ul>
    </nav>
  );
}
