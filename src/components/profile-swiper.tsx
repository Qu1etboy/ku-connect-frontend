import { updateInteraction } from "@/services/interaction";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";
import { default as ProfileCard } from "./profile";
import { Profile } from "@/services/profile";

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

  const { mutate: updateInteractionData } = useMutation({
    mutationFn: updateInteraction,
    onSuccess: (data) => {
      console.log("Interaction successful", data);
      if (data.connected && profileRef.current) {
        setConnectedProfile(profileRef.current, data.chatId || "");
        profileRef.current = null;
      }
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

  return (
    <div className="no-scrollbar flex-1 snap-y snap-mandatory overflow-scroll">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onLiked={() => onLiked(profile.userId, profile)}
          onDisliked={() => onDisliked(profile.userId)}
        />
      ))}
      {children}
    </div>
  );
}
