"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/user";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const { login } = useUser();

  return (
    <div className="flex h-screen flex-col items-center justify-between space-y-4 bg-gradient-to-t from-green-200 to-white to-[50%] pb-10">
      <div className="flex flex-1 flex-col items-center justify-evenly">
        <div>
          <h1 className="text-center text-4xl font-bold leading-relaxed">
            <span>Welcome to</span>
            <br />
            <span className="text-5xl text-green-600">KU Connect</span>
          </h1>
          <p className="text-center text-lg text-muted-foreground">
            Find friends, join activities, and <br /> connect with Nisit Kaset.
          </p>
        </div>
        <Image src="/ku-connect.svg" width={180} height={130} alt={""} />
        <Button className="px-12 py-5" onClick={() => login()}>
          <FaGoogle />
          Login with Google
        </Button>
      </div>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
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
