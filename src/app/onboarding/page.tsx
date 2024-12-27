"use client";

import AuthProtected from "@/components/auth";
import InputField from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { data, defaultProfile, formSchema, ProfileForm } from "./mock/data";
import { toast } from "sonner";

export default function OnBoardingPage() {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultProfile,
  });
  const [step, setStep] = React.useState(1);
  const current = data.steps.find((s) => s.step === step)!;

  const validate = () => {
    const ids = current.group?.flatMap((group) =>
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

  return (
    <AuthProtected>
      <header>
        <span>
          {step} / {data.steps.length}
        </span>
        {current.skippable && (
          <Button variant="link" onClick={nextStep}>
            skip
          </Button>
        )}
        <Progress
          value={(step / data.steps.length) * 100}
          max={data.steps.length}
        />
      </header>

      <main>
        <h1 className="text-3xl font-bold">{current.title}</h1>
        <p>{current.description}</p>
        <Form {...form}>
          <form className="space-y-4">
            {current.group?.map((group) => (
              <div key={group.name}>
                <h2 className="text-xl font-bold">{group.name}</h2>
                <p>{group.description}</p>
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
            ))}
          </form>
        </Form>
      </main>

      <section>
        {!isFirstStep && <Button onClick={prevStep}>Back</Button>}
        <Button onClick={nextStep}>{isLastStep ? "Finish" : "Continue"}</Button>
      </section>
    </AuthProtected>
  );
}
