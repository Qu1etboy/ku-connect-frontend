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
    name: "Notifications",
    description: "Manage how you receive app notifications.",
    form: [
      {
        id: "new_message",
        type: "switch",
        label: "New Messages",
      },
      {
        id: "new_connection_requests",
        type: "switch",
        label: "New Connection Requests",
      },
      {
        id: "connection_request_accepted",
        type: "switch",
        label: "Connection Request Accepted",
      },
    ],
  },
  {
    name: "Interests",
    description: "Your interests help us recommend the best matches for you.",
    form: [
      {
        id: "new_message2",
        type: "switch",
        label: "New Messages",
      },
      {
        id: "new_connection_requests2",
        type: "switch",
        label: "New Connection Requests",
      },
      {
        id: "connection_request_accepted2",
        type: "switch",
        label: "Connection Request Accepted",
      },
    ],
  },
];

export default function PrivacySettings() {
  const form = useForm();
  return (
    <MainLayout title="Privacy Settings" backUrl="/profile">
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
