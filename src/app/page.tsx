"use client";

import Menu from "@/components/menu";
import ProfileSwiper from "@/components/profile-swiper";

const profiles = [
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
  return (
    <main>
      <ProfileSwiper profiles={profiles} />
      <Menu />
    </main>
  );
}
