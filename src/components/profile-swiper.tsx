import { updateInteraction } from "@/services/interaction";
import { Profile } from "@/services/profile";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { default as ProfileCard } from "./profile";

// type Profile = {
//   id: string;
//   userId: string;
//   displayName: string;
//   bio: string | null;
//   birthdate: string | null;
//   faculty: string | null;
//   department: string | null;
//   year: number | null;
//   createdTime: string;
//   updatedTime: string;
//   image: string | null;
//   settings: {
//     id: string;
//     userId: string;
//     profileVisibility: "public" | "connected" | "private";
//     contactInfoVisibility: "public" | "connected" | "private";
//     notiNewMessage: boolean;
//     notiNewConnectionRequest: boolean;
//     notiNewConnectionRequestAccept: boolean;
//     createdTime: string;
//     updatedTime: string;
//   };
//   similarity: number;
//   interests: {
//     id: string;
//     name: string;
//   }[];
// };

type ProfileSwiperProps = {
  profiles: Profile[];
  setConnectedProfile: (profile: Profile, chatId: string) => void;
  children: React.ReactNode;
};

export default function ProfileSwiper({
  profiles,
  setConnectedProfile,
  children,
}: ProfileSwiperProps) {
  const profileRef = useRef<Profile | null>(null);
  const [interactedUserIds, setInteractedUserIds] = useState<string[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>(profiles);

  const { mutate: updateInteractionData } = useMutation({
    mutationFn: updateInteraction,
    onSuccess: (data, variables) => {
      console.log("Interaction successful", data);
      if (data.connected && profileRef.current) {
        setConnectedProfile(profileRef.current, data.chatId || "");
        profileRef.current = null;
      }
      onInteracted(variables.toUserId);
    },
    onError: () => {
      toast.error("Failed to send interaction", {
        position: "top-center",
      });
    },
  });

  const onLiked = (id: string, profile: Profile) => {
    profileRef.current = profile;
    updateInteractionData({
      toUserId: id,
      liked: true,
    });
  };

  const onDisliked = (id: string) => {
    updateInteractionData({
      toUserId: id,
      liked: false,
    });
  };

  const onInteracted = (userId: string) => {
    if (interactedUserIds.includes(userId)) {
      return;
    }
    // add userId to interactedUserIds
    setInteractedUserIds((prev) => [...prev, userId]);
    console.log("Added userId to interactedUserIds", userId);
    console.log("InteractedUserIds", interactedUserIds);
    // remove userId from profiles
    const filtered = profiles.slice(
      profiles.findIndex((profile) => profile.userId === userId) + 1,
    );
    setFilteredProfiles(filtered);
  };

  useEffect(() => {
    // remove interacted userId from profiles
    const filtered = profiles.filter(
      (profile) => !interactedUserIds.includes(profile.userId),
    );
    setFilteredProfiles(filtered);
  }, [profiles]);

  return (
    <div className="no-scrollbar flex-1 snap-y snap-mandatory overflow-scroll">
      <AnimatePresence>
        {filteredProfiles.map((profile) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -80, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
          >
            <ProfileCard
              key={profile.id}
              profile={profile}
              onLiked={() => {
                onLiked(profile.userId, profile);
              }}
              onDisliked={() => {
                onDisliked(profile.userId);
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
}
