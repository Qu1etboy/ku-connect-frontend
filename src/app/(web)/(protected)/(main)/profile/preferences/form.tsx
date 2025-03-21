"use client";

import InputField from "@/components/form/input";
import { FormDataType } from "@/components/form/type";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { type Settings } from "@/services/settings";
import { config } from "@/config";
import { toast } from "sonner";
import { useUpdateSettings } from "@/hooks/settings";

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
    </Form>
  );
}
