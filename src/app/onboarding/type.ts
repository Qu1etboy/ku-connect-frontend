import { FormDataType } from "@/components/form/type";

export type Step = {
  step: number;
  title: string;
  description?: string;
  skippable?: boolean;
  form?: FormDataType[];
  group?: {
    name?: string;
    description?: string;
    form?: FormDataType[];
  }[];
};

export type OnboardingData = {
  steps: Step[];
};
