"use client";

import InputField from "@/components/form/input";
import { FormDataType } from "@/components/form/type";
import MainLayout from "@/components/layout/main";
import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";

const group: {
  name?: string;
  description?: string;
  form?: FormDataType[];
}[] = [
  {
    name: "Profile Visibility",
    description:
      "Control who can see your profile details and connect with you.",
    form: [
      {
        id: "profileVisibility",
        type: "radio",
        data: [
          { value: "1", label: "Public" },
          { value: "2", label: "Only Matches" },
          { value: "3", label: "Private" },
        ],
      },
    ],
  },
  {
    name: "Contact Information Visibility",
    description: "Choose who can view your contact details.",
    form: [
      {
        id: "contactVisibility",
        type: "radio",
        data: [
          { value: "1", label: "Public" },
          { value: "2", label: "Only Matches" },
          { value: "3", label: "Private" },
        ],
      },
    ],
  },
];

export default function PreferencesPage() {
  const form = useForm();
  return (
    <MainLayout title="Preferences" backUrl="/profile">
      <Form {...form}>
        <form>
          {group.map((group) => (
            <div key={group.name} className="border-b p-6">
              <h2 className="font-bold mb-3">{group.name}</h2>
              <p className="text-sm mb-6 text-muted-foreground">
                {group.description}
              </p>
              {group.form?.map((field) => (
                <InputField
                  control={form.control}
                  type={field.type}
                  key={field.id}
                  name={field.id}
                  data={field.data || []}
                  label={field.label}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
          ))}
        </form>
      </Form>
    </MainLayout>
  );
}
