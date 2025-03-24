import { toast } from "sonner";
import { default as Profile, default as ProfileCard } from "./profile";

type Profile = {
  id: string;
  userId: string;
  displayName: string;
  bio: string | null;
  birthdate: string | null;
  faculty: string | null;
  department: string | null;
  year: number | null;
  createdTime: string;
  updatedTime: string;
  image: string | null;
  settings: {
    id: string;
    userId: string;
    profileVisibility: "public" | "connected" | "private";
    contactInfoVisibility: "public" | "connected" | "private";
    notiNewMessage: boolean;
    notiNewConnectionRequest: boolean;
    notiNewConnectionRequestAccept: boolean;
    createdTime: string;
    updatedTime: string;
  };
  similarity: number;
  interests: {
    id: string;
    name: string;
  }[];
};

type ProfileSwiperProps = {
  profiles: Profile[];
  setConnectedProfile: (profile: Profile) => void;
  children: React.ReactNode;
};

export default function ProfileSwiper({
  profiles,
  setConnectedProfile,
  children,
}: ProfileSwiperProps) {
  const onLiked = (id: string, profile: Profile) => {
    // TODO: Send like request to backend
    // toast.success("You liked " + id, {
    //   position: "bottom-center",
    // });
    console.log("Liked", id);

    // TODO: Add animation

    // match
    setConnectedProfile(profile);
  };

  const onDisliked = (id: string) => {
    // TODO: Send dislike request to backend
    toast.error("You disliked " + id, {
      position: "top-center",
    });
    console.log("Disliked", id);

    // TODO: Add animation
  };

  return (
    <div className="no-scrollbar flex-1 snap-y snap-mandatory overflow-scroll">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onLiked={() => onLiked(profile.id, profile)}
          onDisliked={() => onDisliked(profile.id)}
        />
      ))}
      {children}
    </div>
  );
}
