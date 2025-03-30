"use client";

import InputField from "@/components/form/input";
import { FormDataType } from "@/components/form/type";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { config } from "@/config";
import { useUpdateSettings } from "@/hooks/settings";
import { type Settings } from "@/services/settings";
import { CheckCircle2, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
        id: "notiNewMessage",
        type: "switch",
        label: "New Messages",
      },
      {
        id: "notiNewConnectionRequest",
        type: "switch",
        label: "New Connection Requests",
      },
      {
        id: "notiNewConnectionRequestAccept",
        type: "switch",
        label: "Connection Request Accepted",
      },
    ],
  },
];

export default function PreferencesForm({
  initialSettings,
}: {
  initialSettings: Settings;
}) {
  const form = useForm({
    defaultValues: {
      notiNewMessage: initialSettings.notiNewMessage,
      notiNewConnectionRequest: initialSettings.notiNewConnectionRequest,
      notiNewConnectionRequestAccept:
        initialSettings.notiNewConnectionRequestAccept,
    },
  });

  const mutation = useUpdateSettings();

  const onSubmit = (data: any) => {
    if (config.ENV === "development") {
      toast("Form Submitted", {
        description: <pre>{JSON.stringify(data, null, 2)}</pre>,
      });
    }

    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)}>
        {group.map((group) => (
          <div key={group.name} className="border-b p-6">
            <h2 className="mb-3 font-bold">{group.name}</h2>
            <p className="mb-6 text-sm text-muted-foreground">
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
                disabled={mutation.isPending}
              />
            ))}
          </div>
        ))}
      </form>
      <div className="border-b p-6">
        <h2 className="mb-3 font-bold">Push Notification</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          To update your notification settings, go to your browser settings and
          allow notifications for this site.
        </p>
        <div className="flex flex-row items-center gap-3">
          {Notification.permission === "granted" ? (
            <CheckCircle2 className="text-green-600" />
          ) : (
            <XCircle className="text-red-600" />
          )}
          <Label>
            {Notification.permission === "granted"
              ? "Push notification is enabled"
              : "Push notification is enabled"}
          </Label>
        </div>
      </div>
    </Form>
  );
}
