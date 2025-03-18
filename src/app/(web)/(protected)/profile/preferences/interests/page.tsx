"use client";

import MainLayout from "@/components/layout/main";
import InterestsForm from "./form";
import { useKuConnectInterests, useMyInterests } from "@/hooks/profile";

export default function InterestsPage() {
  const {
    data: systemInterests,
    isError: isSystemInterestsError,
    isLoading: isSystemInterestsLoading,
  } = useKuConnectInterests();

  const {
    data: myInterests,
    isError: isMyInterestsError,
    isLoading: isMyInterestsLoading,
  } = useMyInterests();

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
        systemInterests={systemInterests!}
        myInterests={myInterests!}
      />
    </MainLayout>
  );
}
