"use client";

import { useMyProfile } from "@/hooks/profile";
import { redirect } from "next/navigation";
import React from "react";

type ProfileProtectedProps = {
  children: React.ReactNode;
};

/**
 * When wrap a page with this component, it will redirect user to onboarding page
 * if the user have no profile
 */
export default function ProfileProtected({ children }: ProfileProtectedProps) {
  const profile = useMyProfile();

  if (profile.isLoading) {
    console.log("checking profile");
    return null;
  }

  if (profile.data === null) {
    redirect("/onboarding");
  }

  return <div>{children}</div>;
}
