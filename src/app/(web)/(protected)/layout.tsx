import AuthProtected from "@/components/guard/auth";
import NotificationManager from "@/components/notification-manager";
import React from "react";

/**
 * Protected pages, required user to login first to visit.
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProtected>
      <NotificationManager>{children}</NotificationManager>
    </AuthProtected>
  );
}
