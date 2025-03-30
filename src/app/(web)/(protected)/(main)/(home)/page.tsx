"use client";

import Menu from "@/components/menu";
import ProfileConnectedPage from "@/components/profile-connected";
import ProfileSwiper from "@/components/profile-swiper";
import { listProfiles, Profile } from "@/services/profile";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const PAGE_SIZE = 3;

const images = ["/attention-svgrepo-com.svg", "/watching-svgrepo-com.svg"];

export default function Home() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [index, setIndex] = useState(0);

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
  console.log("data", data);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const [connectedProfile, setConnectedProfile] = useState<{
    profile: Profile;
    chatId: string;
  }>();

  return (
    <main className="flex h-dvh flex-col transition-all duration-300">
      <ProfileSwiper
        profiles={data?.pages.flatMap((page) => page.profiles) || []}
        setConnectedProfile={(profile, chatId) =>
          setConnectedProfile({ profile, chatId })
        }
      >
        <p ref={ref}></p>
        {/* {isPending ||
          (isFetchingNextPage && (
            <div className="flex justify-center pb-8 pt-3 transition-all duration-300">
              <div className="h-5 w-5 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
            </div>
          ))} */}
        <AnimatePresence>
          {isPending ||
            (isFetchingNextPage && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center justify-center gap-2 py-5 text-gray-500"
              >
                <Loader2 className="h-6 w-6 animate-spin text-green-500" />
                <span>Loading more profiles...</span>
              </motion.div>
            ))}
        </AnimatePresence>
        {data && !hasNextPage && !isFetchingNextPage && (
          <div
            className={`flex flex-col justify-center bg-gray-100 py-6 transition-all duration-300 ${data?.pages.flatMap((page) => page.profiles).length === 0 ? "h-full bg-gray-50" : ""}`}
          >
            <Image
              src={images[index]}
              alt="Animated Face"
              width={100}
              height={100}
              className="mx-auto mb-4 h-24 w-24"
            />
            <p className="text-center text-lg font-semibold">
              No more profiles to explore!
            </p>
            <p className="text-center text-sm">
              Come back later for new people 💖
            </p>
          </div>
        )}
      </ProfileSwiper>
      {!connectedProfile && <Menu />}
      {connectedProfile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ProfileConnectedPage
            connectedProfiles={connectedProfile}
            onBack={() => {
              setConnectedProfile(undefined);
            }}
          />
        </motion.div>
      )}
    </main>
  );
}
