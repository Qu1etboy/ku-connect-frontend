"use client";

import AuthProtected from "@/components/guard/auth";
import ProfileProtected from "@/components/guard/profile";
import Menu from "@/components/menu";
import ProfileSwiper from "@/components/profile-swiper";
import { listProfiles } from "@/services/profile";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const PAGE_SIZE = 3;

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["profiles"],
      queryFn: ({ pageParam }) => listProfiles(pageParam, PAGE_SIZE),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.profiles.length === 0) {
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

  function loadMoreProfiles() {
    if (hasNextPage && !isFetchingNextPage) {
      console.log("Loading more profiles...");
      fetchNextPage();
    } else {
      console.log("No more profiles to load");
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreProfiles();
    }
  }, [inView]);

  return (
    <AuthProtected>
      <ProfileProtected>
        <main className="flex h-dvh flex-col">
          <ProfileSwiper
            profiles={data?.pages.flatMap((page) => page.profiles) || []}
          >
            <p ref={ref}></p>
            {isPending ||
              (isFetchingNextPage && <p className="text-center">Loading...</p>)}
          </ProfileSwiper>
          <Menu />
        </main>
      </ProfileProtected>
    </AuthProtected>
  );
}
