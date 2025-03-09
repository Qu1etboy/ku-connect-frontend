"use client";

import MainLayout from "@/components/layout/main";
import React from "react";
import PrivacySettingsForm from "./form";
import { getSettings } from "@/services/settings";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PreferencesPage() {
  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });

  return (
    <MainLayout
      title="Preferences"
      backUrl="/profile"
      isLoading={settings.isLoading}
    >
      <div className="border-b p-6 hover:bg-secondary">
        <Link
          href="/profile/preferences/interests"
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="mb-3 font-bold">Interests</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Your interests help us recommend the best matches for you.
            </p>
          </div>
          <ChevronRight className="ml-auto text-muted-foreground" />
        </Link>
      </div>
      <PrivacySettingsForm initialSettings={settings.data!} />
    </MainLayout>
  );
}
