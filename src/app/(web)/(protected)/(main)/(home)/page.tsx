"use client";

import Menu from "@/components/menu";
import ProfileConnectedPage from "@/components/profile-connected";
import ProfileSwiper from "@/components/profile-swiper";
import { listProfiles, Profile } from "@/services/profile";
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

  const [connectedProfile, setConnectedProfile] = useState<Profile>();

  return (
    <main className="flex h-dvh flex-col">
      <ProfileSwiper
        profiles={data?.pages.flatMap((page) => page.profiles) || []}
        setConnectedProfile={setConnectedProfile}
      >
        <p ref={ref}></p>
        {isPending ||
          (isFetchingNextPage && <p className="text-center">Loading...</p>)}
      </ProfileSwiper>
      {!connectedProfile && <Menu />}
      {connectedProfile && (
        <ProfileConnectedPage
          connectedProfiles={connectedProfile}
          onBack={() => {
            setConnectedProfile(undefined);
          }}
        />
      )}
    </main>
  );
}
