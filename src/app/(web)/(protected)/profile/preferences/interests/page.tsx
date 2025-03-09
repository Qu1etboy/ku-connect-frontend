"use client";

import MainLayout from "@/components/layout/main";
import { getKUConnectInterests, getMyInterests } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";
import InterestsForm from "./form";

export default function InterestsPage() {
  const {
    data: systemInterests,
    isError: isSystemInterestsError,
    isLoading: isSystemInterestsLoading,
  } = useQuery({
    queryKey: ["systemInterests"],
    queryFn: () => getKUConnectInterests(),
  });

  const {
    data: myInterests,
    isError: isMyInterestsError,
    isLoading: isMyInterestsLoading,
  } = useQuery({
    queryKey: ["myInterests"],
    queryFn: () => getMyInterests(),
  });

  if (isSystemInterestsError || isMyInterestsError) return <div>Error</div>;

  return (
    <MainLayout
      title="Interests"
      backUrl="/profile/preferences"
      isLoading={isSystemInterestsLoading || isMyInterestsLoading}
    >
      <h2 className="my-6 text-center text-lg font-bold md:text-2xl">
        What are you interested in?
      </h2>
      <InterestsForm
        systemInterests={systemInterests}
        myInterests={myInterests}
      />
    </MainLayout>
  );
}
