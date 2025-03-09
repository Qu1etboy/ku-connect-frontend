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

  return (
    <MainLayout title="Alerts" isLoading={isPending}>
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
                "flex border-b p-4 duration-200 hover:bg-green-100",
                noti.readAt ? "bg-white" : "bg-green-50",
              )}
            >
              {/* TODO: Icon should be display from `noti.icon` but for now just mock as a Mail */}
              <Mail className="my-auto mr-2 w-12" />
              <section className="space-y-2">
                <h2 className="text-sm font-bold md:text-base">
                  {noti.data.title}
                </h2>
                <p className="max-w-[35ch] text-xs text-muted-foreground md:text-sm">
                  {noti.data.message}
                </p>
              </section>
              <time className="ml-auto pl-2 text-xs text-muted-foreground md:text-sm">
                {formatShortDistanceToNow(new Date(noti.createdTime))}
              </time>
            </Link>
          ))}
        </InfiniteScroll>
      ) : (
        <div className="mt-24 text-center">You have no new notification.</div>
      )}
    </MainLayout>
  );
}
