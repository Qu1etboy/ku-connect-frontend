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

  return (
    <nav className="absolute z-10 bottom-0 w-full border-t bg-white">
      <ul className="flex justify-between items-center space-x-4">
        {menu.map((item) => (
          <MenuItem key={item.url} active={item.url === pathname}>
            <Link
              href={item.url}
              className="flex flex-col justify-center items-center px-4 py-2"
            >
              {item.icon}
              <span className="text-sm mt-1">{item.name}</span>
            </Link>
          </MenuItem>
        ))}
      </ul>
    </nav>
  );
}
