"use client";
import { Button } from "@/components/ui/button";
import { useMyProfile } from "@/hooks/profile";
import { Profile } from "@/services/profile";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Pride from "react-canvas-confetti/dist/presets/pride";
import { TDecorateOptionsFn } from "react-canvas-confetti/dist/types";
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
  // const router = useRouter();
  const confettiDecorateOptions: TDecorateOptionsFn = (defaultOptions) => {
    return {
      ...defaultOptions,
      colors: ["#EA4335", "#FBBC05", "#4285F4"],
      particleCount: 40,
      gravity: 0.8,
      ticks: 400,
      scalar: 1.5,
      spread: 90,
      // angle: 270,
    };
  };

  const [startConfetti, setStartConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartConfetti(true);
    }, 700);
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <header className="pt-safe sticky top-0 z-20">
        <div className="header-safe grid grid-cols-12 place-content-center text-center">
          <div role="button" onClick={onBack} className="pl-4 pt-0.5">
            <ChevronLeft />
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col items-center justify-between pb-10 pt-5">
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
      {startConfetti && (
        <Pride
          autorun={{ speed: 0.3 }}
          decorateOptions={confettiDecorateOptions}
        />
      )}
    </div>
  );
}
