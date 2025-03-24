"use client";
import { Button } from "@/components/ui/button";
import { useMyProfile } from "@/hooks/profile";
import { Profile } from "@/services/profile";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ConnectionCard from "./connection-card";

interface ProfileConnectedPageProps {
  connectedProfiles: Profile;
  onBack: () => void;
}

export default function ProfileConnectedPage({
  connectedProfiles,
  onBack,
}: ProfileConnectedPageProps) {
  const { data: myProfile } = useMyProfile();
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col">
      <header className="pt-safe sticky top-0 z-20">
        <div className="header-safe grid grid-cols-12 place-content-center text-center">
          <div role="button" onClick={onBack} className="pl-4 pt-0.5">
            <ChevronLeft />
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col items-center justify-around">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-center text-3xl font-semibold">
            You’re Connected!
          </h1>
          <p className="px-12 text-center text-base text-muted-foreground">
            Start chatting or explore more connections.
          </p>
        </div>
        <ConnectionCard
          leftImage={connectedProfiles.image}
          leftName={connectedProfiles.displayName}
          rightImage={myProfile.image}
          rightName={myProfile.displayName}
        />
        <div className="flex w-full flex-col items-center space-y-4 px-11">
          <Button size="lg" className="w-full" onClick={() => {}}>
            Go to Chat
          </Button>
          <Button size="lg" variant="link" className="w-full" onClick={onBack}>
            Continue Browsing
          </Button>
        </div>
      </div>
    </div>
  );
}
