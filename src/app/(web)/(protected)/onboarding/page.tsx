"use client";

import { useUser } from "@/hooks/user";
import OnBoard from "./onboard";
import { useKuConnectInterests } from "@/hooks/profile";

export default function OnBoardingPage() {
  const { user, isLoading } = useUser();
  const {
    data: systemInterests,
    isError,
    isLoading: isSystemInterestsLoading,
  } = useKuConnectInterests();

  if (!user || isLoading || isSystemInterestsLoading)
    return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return <OnBoard user={user} interests={systemInterests!} />;
}
