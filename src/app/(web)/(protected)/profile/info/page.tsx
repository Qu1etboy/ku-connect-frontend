"use client";

import MainLayout from "@/components/layout/main";
import { useUser } from "@/hooks/user";
import { getMyProfile } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProfileInfomationForm from "./form";


export default function ProfileInfomationPage() {
  const { user, isLoading } = useUser();
  const profile = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getMyProfile(),
  });

  return (
    <MainLayout
      title="Personal Information"
      backUrl="/profile"
      isLoading={isLoading || profile.isLoading}
    >
      <ProfileInfomationForm user={user!} defaultValues={profile.data} />
    </MainLayout>
  );
}
