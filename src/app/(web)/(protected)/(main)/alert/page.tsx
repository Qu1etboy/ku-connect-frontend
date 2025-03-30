"use client";

import MainLayout from "@/components/layout/main";
import {
  NotificationIcon,
  NotificationType,
} from "@/components/notification-icon";
import { useSocket } from "@/contexts/socket";
import { cn } from "@/lib/utils";
import {
  fetchMyNotification,
  readNotifications,
} from "@/services/notification";
import { formatShortDistanceToNow } from "@/utils/date";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
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
  const { socket } = useSocket();
  const queryClient = useQueryClient();
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

  const readNotification = async (id: string) => {
    await readNotifications([id]);
    console.log("read notification", id);

    queryClient.setQueryData(
      ["notifications"],
      (old: InfiniteData<Notification[]>) => {
        console.log(old.pages);
        return {
          pages: [
            old.pages[0].map((noti) =>
              noti.id === id ? { ...noti, readAt: new Date() } : noti,
            ),
          ],
          pageParams: old.pageParams,
        };
      },
    );

    // todo: if it noti type chat, redirect user to a chat page
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (newNotification: Notification) => {
      console.log("Receive new notification", newNotification);
      queryClient.refetchQueries({
        queryKey: ["notifications"],
      });
    });

    return () => {
      socket.off("notification");
    };
  }, [socket]);

  return (
    <MainLayout title="Alerts" isLoading={isPending}>
      {data && data.pages.flat().length > 0 ? (
        <>
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
              <button
                key={noti.id}
                onClick={() => readNotification(noti.id)}
                className={cn(
                  "flex w-full border-b p-4 text-left duration-200 hover:bg-green-100",
                  noti.readAt ? "bg-white" : "bg-green-50",
                )}
              >
                {/* TODO: Icon should be display from `noti.type` but for now just mock as a Mail */}
                <NotificationIcon type={noti.type} />
                <section className="ml-2 space-y-2">
                  <h2 className="text-sm font-bold md:text-base">
                    {noti.data.title}
                  </h2>
                  <p
                    className="max-w-[35ch] text-xs text-muted-foreground md:text-sm"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(noti.data.message),
                    }}
                  />
                </section>
                <time className="ml-auto pl-2 text-xs text-muted-foreground md:text-sm">
                  {formatShortDistanceToNow(new Date(noti.createdTime))}
                </time>
              </button>
            ))}
          </InfiniteScroll>
        </>
      ) : (
        <div className="mt-24 text-center">You have no new notification.</div>
      )}
    </MainLayout>
  );
}
