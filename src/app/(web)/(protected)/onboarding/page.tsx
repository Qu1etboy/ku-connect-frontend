"use client";

import InputField from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  data,
  defaultProfile,
  fieldOfStudy,
  formSchema,
  ProfileForm,
} from "./data";

export default function OnBoardingPage() {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultProfile,
  });
  const [step, setStep] = React.useState(1);
  const router = useRouter();
  const current = data.steps.find((s) => s.step === step)!;

  const validate = () => {
    const ids: any = current.group?.flatMap((group) =>
      group.form?.map((field) => field.id)
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
      submit();
      // TODO: add if success and error popup
      router.push("/onboarding/success");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (isFirstStep) return;
    setStep(step - 1);
  };

  const submit = () => {
    toast("Form Submitted", {
      description: <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>,
    });
    // TODO: save data
  };

  const renderFormattedTitle = (text: string) => {
    const regex = /<green>(.*?)<green>/g; // Make text between <green> and <green> green
    const parts = text.split(regex);
    return (
      <>
        <h1 className="text-2xl font-semibold">{parts[0]}</h1>
        <span className=" text-3xl font-bold text-green-500">{parts[1]}</span>
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
        (field) => field.id === "department"
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
    <div className="max-h-screen min-h-screen flex flex-col px-10 py-10 bg-gradient-to-b from-white to-green-300 from-[50%]">
      <header>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium h-9 flex items-center">
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
        <div className="flex flex-col items-center gap-3 h-[25vh] justify-evenly py-8">
          {isFirstStep ? (
            renderFormattedTitle(current.title)
          ) : (
            <>
              <h1 className="text-2xl font-semibold items-center text-center">
                {current.title}
              </h1>
              <p className="text-sm text-muted-foreground text-center">
                {current.description}
              </p>
            </>
          )}
        </div>
        <div
          className={`overflow-auto max-h-[45vh] ${
            current.card
              ? "border border-gray-200 p-4 rounded-lg shadow-md bg-white"
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
          <Button
            className="w-full bg-white text-black focus:bg-white"
            onClick={prevStep}
          >
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