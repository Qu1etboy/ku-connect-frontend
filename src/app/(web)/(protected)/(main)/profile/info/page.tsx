"use client";

import MainLayout from "@/components/layout/main";
import { useUser } from "@/hooks/user";
import React from "react";
import ProfileInfomationForm from "./form";
import { useMyProfile } from "@/hooks/profile";

export default function ProfileInfomationPage() {
  const { user, isLoading } = useUser();
  const profile = useMyProfile();

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
