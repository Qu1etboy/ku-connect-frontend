"use client";

import MainLayout from "@/components/layout/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/user";
import {
  ChevronRight,
  LogOut,
  Shield,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const sections = [
  {
    id: 1,
    title: "Personal Information",
    icon: <UserRound />,
    href: "/profile/info",
  },
  {
    id: 2,
    title: "Preferences",
    icon: <SlidersHorizontal />,
    href: "/profile/preferences",
  },
  {
    id: 3,
    title: "Privacy Settings",
    icon: <Shield />,
    href: "/profile/privacy",
  },
];

export default function ProfilePage() {
  const { user, login, logout, isLoading } = useUser();

  const getUsername = (email: string) => {
    return "@" + email.split("@")[0];
  };

  console.log(user);

  return (
    <MainLayout title="Profile" isLoading={isLoading}>
      {user ? (
        <div>
          <section className="flex items-center gap-6 px-4 py-8">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src={user.avatar_url} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <b>{user.name}</b>
              <p>{getUsername(user.email)}</p>
            </div>
          </section>

          <div className="font-semibold">
            {sections.map((section) => (
              <Link
                href={section.href}
                key={section.id}
                className="flex gap-3 py-8 px-4 border-b hover:bg-secondary"
              >
                {section.icon}
                <span>{section.title}</span>
                <ChevronRight className="ml-auto text-muted-foreground" />
              </Link>
            ))}
            <button
              onClick={logout}
              className="flex gap-3 items-center py-8 px-4 border-b hover:bg-secondary w-full text-left text-destructive"
            >
              <LogOut />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() =>
            login({
              redirectTo: "/profile",
            })
          }
        >
          Login with Google
        </Button>
      )}
    </MainLayout>
  );
}
