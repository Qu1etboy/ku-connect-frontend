import InputField from "@/components/form/input";
import { FormDataType } from "@/components/form/type";
import { LoadingScreen } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { config } from "@/config";
import { Settings, updateSettings } from "@/services/settings";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
          { value: "public", label: "Public" },
          { value: "connected", label: "Only Connected" },
          { value: "private", label: "Private" },
        ],
      },
    ],
  },
  {
    name: "Contact Information Visibility",
    description: "Choose who can view your contact details.",
    form: [
      {
        id: "contactInfoVisibility",
        type: "radio",
        data: [
          { value: "public", label: "Public" },
          { value: "connected", label: "Only Connected" },
          { value: "private", label: "Private" },
        ],
      },
    ],
  },
];

type PrivacyFormProps = {
  initialSettings: Settings;
};

export default function PrivacyForm({ initialSettings }: PrivacyFormProps) {
  const form = useForm({
    defaultValues: {
      profileVisibility: initialSettings.profileVisibility,
      contactInfoVisibility: initialSettings.contactInfoVisibility,
    },
  });

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast("Settings updated successfully", {
        icon: "✅",
        position: "top-center",
      });
    },
    onError: () => {
      toast("Failed to update settings", {
        icon: "❌",
        position: "top-center",
      });
    },
  });

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <div className="mx-3">
          <Button type="submit" className="mb-16 mt-6 w-full">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
