import MainLayout from "@/components/layout/main";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { notifications } from "./mock/data";
import { Mail } from "lucide-react";
import { formatShortDistanceToNow } from "@/utils/date";

export default function AlertPage() {
  return (
    <MainLayout title="Alerts">
      {notifications.length > 0 ? (
        notifications.map((noti) => (
          <Link
            key={noti.id}
            href=""
            className={cn(
              "flex p-4 border-b hover:bg-green-100 duration-200",
              noti.read_at ? "bg-white" : "bg-green-50"
            )}
          >
            {/* TODO: Icon should be display from `noti.icon` but for now just mock as a Mail */}
            <Mail className="mr-2 my-auto w-12" />
            <section className="space-y-2">
              <h2 className="font-bold">{noti.title}</h2>
              <p className="text-sm text-muted-foreground max-w-[35ch]">
                {noti.message}
              </p>
            </section>
            <time className="pl-2 ml-auto text-sm text-muted-foreground">
              {formatShortDistanceToNow(noti.created_time)}
            </time>
          </Link>
        ))
      ) : (
        <div className="text-center mt-24">You have no new notification.</div>
      )}
    </MainLayout>
  );
}
