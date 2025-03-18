"use client";

import MainLayout from "@/components/layout/main";
import PrivacyForm from "./form";
import { useSettings } from "@/hooks/settings";

export default function PrivacyPage() {
  const settings = useSettings();

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
