"use client";

import MainLayout from "@/components/layout/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/user";
import React from "react";

const groups = [
  {
    name: "Personal Information",
    fields: [
      {
        label: "Display Name",
        key: "displayName",
      },
      {
        label: "Bio",
        key: "bio",
      },
      {
        label: "Faculty",
        key: "faculty",
      },
      {
        label: "Field of Study",
        key: "fieldOfStudy",
      },
      {
        label: "Year of Study",
        key: "yearOfStudy",
      },
    ],
  },
  {
    name: "Contact Information",
    fields: [
      {
        label: "Facebook",
        key: "facebook",
      },
      {
        label: "Instagram",
        key: "instagram",
      },
      {
        label: "Line",
        key: "line",
      },
      {
        label: "Others",
        key: "others",
      },
    ],
  },
];

const profile: any = {
  displayName: "Mock",
  bio: "Hello",
  faculty: "Science",
  fieldOfStudy: "Computer Science",
  yearOfStudy: "4",
  facebook: "https://www.facebook.com/share/1KS375T3vp/?mibextid=wwXIfr",
  instagram: "@nonzagreanthai",
  line: "nonzagreanthai",
  others: "Website: qu1etboy.dev\nGitHub: Qu1etboy\nX: @WeerawongNon",
};

export default function ProfileInfomationPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout title="Personal Information" backUrl="/profile">
      <div className="px-4">
        <div className="flex flex-col items-center">
          <Avatar className="w-[150px] h-[150px] my-6">
            <AvatarImage src={user?.avatar_url} alt={user?.name} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-lg">{user?.name}</p>
        </div>

        {groups.map((group) => (
          <div key={group.name} className="mt-6">
            <h2 className="mb-3 font-semibold text-muted-foreground">
              {group.name}
            </h2>
            {group.fields.map((field) => (
              <div key={field.key} className="grid grid-cols-2 py-4 border-b">
                <p>{field.label}</p>
                <p className="text-green-600 break-words">
                  {profile[field.key]}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
