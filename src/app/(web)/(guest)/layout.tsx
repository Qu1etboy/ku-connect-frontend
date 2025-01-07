"use client";

import { useUser } from "@/hooks/user";
import { redirect } from "next/navigation";
import React from "react";

/**
 * Guest pages, user who not login can visit.
 */
export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }
  if (user) {
    redirect("/");
  }
  return <div>{children}</div>;
}
