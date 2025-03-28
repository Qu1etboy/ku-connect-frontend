"use client";
import { Profile } from "@/services/profile";
import { getProfileImageUrl } from "@/utils/url";
import { AnimatePresence, motion } from "framer-motion";
import { HeartHandshake, HeartOff } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type ProfileCardProps = {
  profile: Profile;
  onLiked: () => void;
  onDisliked: () => void;
};

export default function ProfileCard({
  profile,
  onLiked,
  onDisliked,
}: ProfileCardProps) {
  const [icons, setIcons] = useState<
    { id: number; x: number; y: number; h: number; w: number; like: boolean }[]
  >([]);

  const renderNisitInfo = () => {
    let info = "";
    if (profile.faculty) {
      info += `Faculty of ${profile.faculty}, `;
    }
    if (profile.department) {
      info += `${profile.department}, `;
    }
    if (profile.year) {
      info += `${profile.year}`;
    }
    return info;
  };

  const isBioLong = () => {
    if (profile.bio && profile.bio.length > 100) {
      return true;
    }
    return false;
  };

  const renderBio = () => {
    if (isBioLong()) {
      return profile.bio?.slice(0, 100) + "...";
    }
    return profile.bio;
  };

  const onIconClick = (like: boolean) => {
    const AREA_WIDTH = 400; // Width range for effect
    const AREA_HEIGHT = 300; // Height range for effect
    const newIcons = Array.from({ length: 10 }, () => ({
      id: Date.now() + Math.random(), // Unique ID
      x: (Math.random() - 0.5) * AREA_WIDTH, // Keep x within area width
      y: (Math.random() - 0.5) * AREA_HEIGHT, // Keep y within area height
      // random size between 40 and 60
      h: Math.floor(Math.random() * 20) + 40,
      w: Math.floor(Math.random() * 20) + 40,
      like: like,
    }));

    setIcons((prev) => [...prev, ...newIcons]);

    // Remove icons after animation (1.5s)
    setTimeout(() => {
      setIcons((prev) =>
        prev.filter((icon) => !newIcons.some((i) => i.id === icon.id)),
      );
    }, 1500);
  };

  return (
    <div className="relative h-full w-full snap-center snap-always">
      <div className="h-[55%]">
        <img
          src={getProfileImageUrl(profile.image ?? "")}
          alt={profile.displayName}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
      <section className="relative flex h-[45%] flex-col justify-between px-4">
        <div className="absolute left-0 right-0 top-[-40px] h-[50px] w-full bg-gradient-to-t from-white from-10% via-white/50 via-50% to-transparent to-100% backdrop-blur-sm"></div>
        <div className="relative top-[-10px] z-10">
          <h1 className="text-xl font-bold">{profile.displayName}</h1>
          <p className="text-sm text-gray-500">{renderNisitInfo()}</p>
          <p className="mt-2">{renderBio()}</p>
          {isBioLong() && (
            <Button variant="link" className="px-0 text-sm text-green-500">
              Read more
            </Button>
          )}
          <div className="my-4 flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <Badge key={interest.id} variant="outline">
                {interest.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-between px-8 pb-8">
          <Button
            variant="outline"
            className="h-[100px] w-[100px] rounded-full shadow-lg hover:bg-red-100 active:scale-95"
            onClick={() => {
              onDisliked();
              onIconClick(false);
            }}
          >
            <span className="sr-only">Dislike</span>
            <HeartOff className="scale-[2.5] text-red-500" />
          </Button>
          <Button
            variant="outline"
            className="h-[100px] w-[100px] rounded-full shadow-lg hover:bg-green-100"
            onClick={() => {
              onLiked();
              onIconClick(true);
            }}
          >
            <span className="sr-only">Like</span>
            <HeartHandshake className="scale-[2.5] text-green-500" />
          </Button>
        </div>
      </section>
      <AnimatePresence>
        {icons.map((icon) => (
          <motion.div
            key={icon.id}
            initial={{ y: icon.y, x: icon.x, opacity: 1, scale: 0.8 }}
            animate={{
              y: icon.y - 150,
              opacity: 0,
              scale: Math.random() + 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute left-1/2 top-1/3"
          >
            {icon.like ? (
              <HeartHandshake
                className="text-green-500"
                width={icon.w}
                height={icon.h}
              />
            ) : (
              <HeartOff
                className="text-red-500"
                width={icon.w}
                height={icon.h}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
