"use client";

import { useUser } from "@/hooks/user";
import OnBoard from "./onboard";
import { getKUConnectInterests } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";

export default function OnBoardingPage() {
  const { user, isLoading } = useUser();
  const { data: systemInterests, isError, isLoading: isSystemInterestsLoading } = useQuery({
    queryKey: ["systemInterests"],
    queryFn: () => getKUConnectInterests(),
  });

  if (!user || isLoading || isSystemInterestsLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return <OnBoard user={user} interests={systemInterests} />
}
