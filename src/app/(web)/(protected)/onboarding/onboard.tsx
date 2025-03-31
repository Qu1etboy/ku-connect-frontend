"use client";

import InputField from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { config } from "@/config";
import { formSchema, ProfileForm, SystemInterest } from "@/data/form";
import { useCreateProfile } from "@/hooks/profile";
import { User } from "@/hooks/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { fieldOfStudy, getData } from "./data";

type OnBoardProps = {
  user: User;
  interests: SystemInterest[];
};

export default function OnBoard({ user, interests }: OnBoardProps) {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      faculty: "",
      department: "",
      year: "",
      displayName: user.full_name,
      bio: "",
      line: "",
      facebook: "",
      instagram: "",
      other: "",
      interests: [],
    },
  });
  const [step, setStep] = React.useState(1);
  const router = useRouter();

  const mutation = useCreateProfile({
    onSuccess: () => {
      router.push("/onboarding/success");
    },
    onError: () => {
      toast("Failed to update profile", {
        position: "top-center",
        icon: "❌",
      });
    },
  });

  const data = getData(user, interests);
  const current = data.steps.find((s) => s.step === step)!;
  const validate = () => {
    const ids: any = current.group?.flatMap((group) =>
      group.form?.map((field) => field.id),
    );
    if (!ids) return true;
    return form.trigger(ids);
  };

  const isFirstStep = step === 1;
  const isLastStep = step === data.steps.length;

  const nextStep = async () => {
    if (!current.skippable) {
      const result = await validate();
      if (!result) return;
    }
    if (isLastStep) {
      try {
        await submit();
      } catch (error) {
        console.error(error);
        toast.error("Failed to submit form");
      }
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (isFirstStep) return;
    setStep(step - 1);
  };

  const submit = async () => {
    if (config.ENV === "development") {
      toast("Form Submitted", {
        description: <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>,
      });
    }

    mutation.mutate(form.getValues());
  };

  const renderFormattedTitle = (text: string) => {
    const regex = /<green>(.*?)<green>/g; // Make text between <green> and <green> green
    const parts = text.split(regex);
    return (
      <>
        <h1 className="text-2xl font-semibold">{parts[0]}</h1>
        <span className="text-center text-3xl font-bold text-green-500">
          {parts[1]}
        </span>
        <h1 className="text-2xl font-semibold">{parts[2]}</h1>
      </>
    );
  };

  const formWatch = form.watch();
  useEffect(() => {
    const { faculty, department } = formWatch;
    const departmentData = fieldOfStudy[faculty];

    // Update department data based on faculty selection
    if (faculty && data.steps?.[0]?.group?.[0]?.form) {
      const departmentField = data.steps[0].group[0].form.find(
        (field) => field.id === "department",
      );
      if (departmentField) {
        departmentField.data = departmentData;
      }
    }

    // Clear department field if faculty is changed
    if (
      department &&
      !departmentData?.some((dept) => dept.value === department)
    ) {
      form.setValue("department", "");
    }
    form.trigger("department");
  }, [formWatch.faculty, formWatch.department, form]);

  return (
    <div className="flex max-h-screen min-h-screen flex-col bg-gradient-to-b from-white from-[50%] to-green-300 px-10 py-10">
      <header>
        <div className="flex items-center justify-between">
          <span className="flex h-9 items-center text-sm font-medium">
            Step {step} / {data.steps.length}
          </span>
          {current.skippable && (
            <Button variant="link" onClick={nextStep}>
              skip
            </Button>
          )}
        </div>
        <Progress
          value={(step / data.steps.length) * 100}
          max={data.steps.length}
        />
      </header>

      <main className="flex-grow">
        <div className="flex h-[25dvh] flex-col items-center justify-evenly gap-3 py-8">
          {isFirstStep ? (
            renderFormattedTitle(current.title)
          ) : (
            <>
              <h1 className="items-center text-center text-2xl font-semibold">
                {current.title}
              </h1>
              <p className="text-center text-sm text-muted-foreground">
                {current.description}
              </p>
            </>
          )}
        </div>
        <div
          className={`max-h-[45dvh] overflow-auto ${
            current.card
              ? "rounded-lg border border-gray-200 bg-white p-4 shadow-md"
              : ""
          }`}
        >
          <Form {...form}>
            <form className="space-y-4">
              {current.group?.map((group) => (
                <div key={group.name}>
                  <h2 className="text-xl font-bold">{group.name}</h2>
                  <p>{group.description}</p>

                  <div className="flex flex-col gap-3">
                    {group.form?.map((field) => (
                      <InputField
                        control={form.control}
                        type={field.type}
                        key={field.label}
                        name={field.id}
                        data={field.data || []}
                        label={field.label}
                        placeholder={field.placeholder}
                        onReset={() => form.resetField(field.id as keyof ProfileForm)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </form>
          </Form>
        </div>
      </main>

      <section className="flex gap-5">
        {!isFirstStep && (
          <Button variant="outline" className="w-full" onClick={prevStep}>
            Back
          </Button>
        )}
        <Button className="w-full focus:bg-black" onClick={nextStep}>
          {isLastStep ? "Finish" : "Continue"}
        </Button>
      </section>
    </div>
  );
}
