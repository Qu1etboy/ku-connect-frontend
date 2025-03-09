import { Profile } from "@/services/profile";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HeartHandshake, HeartOff } from "lucide-react";

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

  return (
    <div className="h-full w-full snap-center snap-always">
      <div className="h-[55%]">
        <img
          src={profile.image ?? ""}
          alt={profile.displayName}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
      <section className="relative px-4">
        <div className="absolute left-0 right-0 top-[-40px] h-[50px] w-full bg-gradient-to-t from-white from-10% via-white/50 via-50% to-transparent to-100% backdrop-blur-sm"></div>
        <div className="relative top-[-10px] z-10">
          <h1 className="text-xl font-bold">{profile.displayName}</h1>
          <p className="text-sm text-gray-500">{renderNisitInfo()}</p>
          <p className="mt-2">{profile.bio}</p>
          <div className="my-4 flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <Badge key={interest.id} variant="outline">
                {interest.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="my-16 flex justify-between px-8">
          <Button
            variant="outline"
            className="h-[100px] w-[100px] rounded-full shadow-lg"
            onClick={onDisliked}
          >
            <span className="sr-only">Dislike</span>
            <HeartOff className="h-14 w-14 text-red-500" />
          </Button>
          <Button
            variant="outline"
            className="h-[100px] w-[100px] rounded-full shadow-lg"
            onClick={onLiked}
          >
            <span className="sr-only">Like</span>
            <HeartHandshake className="h-14 w-14 text-green-500" />
          </Button>
        </div>
      </section>
    </div>
  );
}
