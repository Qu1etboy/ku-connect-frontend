"use client";

import MainLayout from "@/components/layout/main";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/user";
import React from "react";

export default function ProfilePage() {
  const { user, login, logout, isLoading } = useUser();
  return (
    <MainLayout title="Profile">
      {isLoading ? (
        <div>Loading...</div>
      ) : user ? (
        <div>
          <div>
            Hello, <b>{user.name}</b>
          </div>
          <div>{user.email}</div>
          <Button onClick={logout}>Logout</Button>
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
