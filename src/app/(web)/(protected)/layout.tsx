import AuthProtected from "@/components/auth";
import React from "react";

/**
 * Protected pages, required user to login first to visit.
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProtected>{children}</AuthProtected>;
}
