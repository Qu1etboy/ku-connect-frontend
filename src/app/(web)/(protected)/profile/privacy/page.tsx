"use client";

import MainLayout from "@/components/layout/main";
import PrivacyForm from "./form";
import { getSettings } from "@/services/settings";
import { useQuery } from "@tanstack/react-query";

export default function PrivacyPage() {
  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });

  return (
    <MainLayout
      title="Privacy Settings"
      backUrl="/profile"
      isLoading={settings.isLoading}
    >
      <PrivacyForm initialSettings={settings.data!} />
    </MainLayout>
  );
}
