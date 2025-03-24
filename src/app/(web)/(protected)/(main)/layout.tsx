import ProfileProtected from "@/components/guard/profile";
import React from "react";

/**
 * Protected pages, required user to login first to visit.
 */
export default function RequiredProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProfileProtected>{children}</ProfileProtected>;
}
