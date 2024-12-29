"use client";

import Menu from "@/components/menu";
import ProfileSwiper from "@/components/profile-swiper";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const initialProfiles = [
  {
    name: "Han So Hee",
    description: "Hi, I'm Han So Hee from South Korea.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/ce/20241108_Han_Sohee_for_BOUCHERON_05.jpg",
  },
  {
    name: "Mhoo Toey",
    description: "🐷",
    image: "https://media.femalemag.com.sg/public/2021/11/han-so-hee-7.jpg",
  },
  {
    name: "Non Weerawong",
    description: "Nice to meet you.",
    image:
      "https://www.allkpop.com/upload/2024/11/content/011222/web_data/allkpop_1730479076_header-photo.jpg",
  },
];

export default function Home() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [page, setPage] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  function loadMoreProfiles() {
    const size = 10;
    console.log("Loading more profiles...");

    // TODO: Change to fetch from backend
    const newProfiles = [];
    for (let i = page; i < page + size; ++i) {
      newProfiles.push({
        name: "User " + (i + 1),
        description: "Description " + (i + 1),
        image: "",
      });
    }

    setProfiles([...profiles, ...newProfiles]);
    setPage(page + size);
  }

  useEffect(() => {
    if (inView) {
      loadMoreProfiles();
    }
  }, [inView]);

  return (
    <main className="h-dvh flex flex-col">
      <ProfileSwiper profiles={profiles}>
        <p ref={ref}></p>
      </ProfileSwiper>
      <Menu />
    </main>
  );
}
