import InputField from "@/components/form/input";
import { Form } from "@/components/ui/form";
import { interestsForm, SystemInterest } from "@/data/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { config } from "@/config";
import { useUpdateMyInterests } from "@/hooks/profile";

type InterestsFormProps = {
  systemInterests: SystemInterest[];
  myInterests: SystemInterest[];
};

export default function InterestsForm({
  systemInterests,
  myInterests,
}: InterestsFormProps) {
  const form = useForm({
    defaultValues: {
      interests: myInterests.map((interest) => interest.id),
    },
  });
  const fields = interestsForm(systemInterests);
  const mutation = useUpdateMyInterests();

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
        <div className="max-h-[45vh] overflow-auto">
          {fields.map((field) => (
            <InputField
              key={field.id}
              control={form.control}
              type={field.type}
              name={field.id}
              data={field.data || []}
              disabled={mutation.isPending}
            />
          ))}
        </div>
        <div className="mx-3">
          <Button type="submit" className="mb-16 mt-6 w-full">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
