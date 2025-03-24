import { getProfileImageUrl } from "@/utils/url";
import { HeartHandshake } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ConnectedCardProps {
  leftImage: string | null;
  rightImage: string | null;
  leftName: string | null;
  rightName: string | null;
}

export default function ConnectionCard({
  leftImage,
  rightImage,
  leftName,
  rightName,
}: ConnectedCardProps) {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <Avatar className="absolute right-0 top-0 z-10 h-28 w-28 rounded-full border-4 border-[#34A853] bg-white">
        <AvatarImage
          src={getProfileImageUrl(rightImage ?? "")}
          alt={rightName ?? ""}
          className="object-cover"
        />
        <AvatarFallback>{leftName?.[0]}</AvatarFallback>
      </Avatar>
      <Avatar className="absolute bottom-0 left-0 z-10 h-28 w-28 rounded-full border-4 border-[#34A853] bg-white">
        <AvatarImage
          src={getProfileImageUrl(leftImage ?? "")}
          alt={leftName ?? ""}
          className="object-cover"
        />
        <AvatarFallback>{leftName?.[0]}</AvatarFallback>
      </Avatar>
      <Image
        src="/dashed-border.svg"
        alt="border"
        width={220}
        height={220}
        className="animate-spin-slow absolute"
      />
      <HeartHandshake className="absolute z-0 h-12 w-12 text-[#34A853]" />
    </div>
  );
}
