"use client";

import { useUser } from "@/hooks/user";
import { getUrl } from "@/utils/url";
import { usePathname } from "next/navigation";
import React from "react";

type AuthProtectedProps = {
  children: React.ReactNode;
};

export default function AuthProtected({ children }: AuthProtectedProps) {
  const { user, isLoading, login } = useUser();
  const pathname = usePathname();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    login({
      redirectTo: getUrl(pathname),
    });
    return null;
  }

  return <div>{children}</div>;
}
