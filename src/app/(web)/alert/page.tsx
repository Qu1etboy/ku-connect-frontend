"use client";

import MainLayout from "@/components/layout/main";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect } from "react";
import { Mail } from "lucide-react";
import { formatShortDistanceToNow } from "@/utils/date";
import { io } from "socket.io-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyNotification } from "@/services/notification";
import InfiniteScroll from "react-infinite-scroll-component";
import { config } from "@/config";

type Notification = {
  id: number;
  userId: string;
  type: string;
  data: {
    title: string;
    message: string;
  };
  readAt: string;
  createdTime: string;
  updatedTime: string;
};

const PAGE_SIZE = 15;

export default function AlertPage() {
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: ({ pageParam }) => fetchMyNotification(pageParam, PAGE_SIZE),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    });

  useEffect(() => {
    const socket = io(config.BACKEND_URL);
    socket.on("notification", (newNotification: Notification) => {
      console.log("Receive new notification", newNotification);
      // setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout title="Alerts">
      {data && data.pages.length > 0 ? (
        <InfiniteScroll
          dataLength={data.pages.flat().length}
          next={() => {
            console.log("fetching next page");
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          hasMore={hasNextPage}
          loader={null}
        >
          {data.pages.flat().map((noti: Notification) => (
            <Link
              key={noti.id}
              href=""
              className={cn(
                "flex p-4 border-b hover:bg-green-100 duration-200",
                noti.readAt ? "bg-white" : "bg-green-50"
              )}
            >
              {/* TODO: Icon should be display from `noti.icon` but for now just mock as a Mail */}
              <Mail className="mr-2 my-auto w-12" />
              <section className="space-y-2">
                <h2 className="text-sm md:text-base font-bold">
                  {noti.data.title}
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground max-w-[35ch]">
                  {noti.data.message}
                </p>
              </section>
              <time className="pl-2 ml-auto text-xs md:text-sm text-muted-foreground">
                {formatShortDistanceToNow(new Date(noti.createdTime))}
              </time>
            </Link>
          ))}
        </InfiniteScroll>
      ) : (
        <div className="text-center mt-24">You have no new notification.</div>
      )}
    </MainLayout>
  );
}
