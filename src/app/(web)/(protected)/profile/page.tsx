"use client";

import MainLayout from "@/components/layout/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMyProfile } from "@/hooks/profile";
import { useUser } from "@/hooks/user";
import { getProfileImageUrl } from "@/utils/url";
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
  const { user, logout, isLoading } = useUser();
  const profile = useMyProfile();

  return (
    <MainLayout title="Profile" isLoading={isLoading || profile.isLoading}>
      <div>
        <section className="flex items-center gap-6 px-4 py-8">
          <Avatar className="h-[100px] w-[100px]">
            <AvatarImage
              src={getProfileImageUrl(profile.data?.image ?? "")}
              alt={profile.data?.displayName ?? ""}
              className="object-cover"
            />
            <AvatarFallback>{profile.data?.displayName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <b>{profile.data?.displayName}</b>
            <p>{user?.email}</p>
          </div>
        </section>

        <div className="font-semibold">
          {sections.map((section) => (
            <Link
              href={section.href}
              key={section.id}
              className="flex gap-3 border-b px-4 py-8 hover:bg-secondary"
            >
              {section.icon}
              <span>{section.title}</span>
              <ChevronRight className="ml-auto text-muted-foreground" />
            </Link>
          ))}
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 border-b px-4 py-8 text-left text-destructive hover:bg-secondary"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
