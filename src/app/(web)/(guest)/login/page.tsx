"use client";

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { useUser } from "@/hooks/user";

export default function LoginPage() {
  const { login } = useUser();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gradient-to-t from-green-200 to-white to-[50%]">
      <h1 className="text-4xl font-bold text-center leading-relaxed">
        <span>Welcome to</span>
        <br />
        <span className="text-5xl text-green-600">KU Connect</span>
      </h1>
      <p className="text-center text-lg text-muted-foreground">
        Find friends, join activities, and <br /> connect with Nisit Kaset.
      </p>
      {/* TODO: App Logo */}
      <Button className="px-12 py-5" onClick={() => login()}>
        <FaGoogle />
        Login with Google (@ku.th)
      </Button>
      <footer className="text-center text-sm mt-12 text-muted-foreground">
        <p>
          Powered by{" "}
          <a href="https://github.com/qu1etboy" className="underline">
            Qu1etboy
          </a>{" "}
          and{" "}
          <a href="https://github.com/NpatsL" className="underline">
            NpatsL
          </a>
        </p>
      </footer>
    </div>
  );
}
