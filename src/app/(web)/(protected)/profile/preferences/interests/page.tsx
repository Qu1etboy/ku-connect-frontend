"use client";

import MainLayout from "@/components/layout/main";
import React from "react";
import { useForm } from "react-hook-form";
import InterestsForm from "./form";
import { getKUConnectInterests, getMyInterests } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";

export default function InterestsPage() {
	const { data: systemInterests, isError: isSystemInterestsError, isLoading: isSystemInterestsLoading } = useQuery({
		queryKey: ["systemInterests"],
		queryFn: () => getKUConnectInterests(),
	});

	const { data: myInterests, isError: isMyInterestsError, isLoading: isMyInterestsLoading } = useQuery({
		queryKey: ["myInterests"],
		queryFn: () => getMyInterests(),
	})

	if (isSystemInterestsError || isMyInterestsError) return <div>Error</div>;

  return (
    <MainLayout title="Interests" backUrl="/profile/preferences" isLoading={isSystemInterestsLoading || isMyInterestsLoading}>
      <h2 className="md:text-2xl text-lg font-bold text-center my-6">What are you interested in?</h2>
			<InterestsForm systemInterests={systemInterests} myInterests={myInterests} />
    </MainLayout>
  );
}
