export type PrivacyVisibilityOption = "public" | "connected" | "private";

export type PrivacyFormField = {
  id: "profileVisibility" | "contactInfoVisibility";
  type: "radio";
  data: Array<{
    value: PrivacyVisibilityOption;
    label: string;
  }>;
  label?: string;
  placeholder?: string;
};

export type PrivacyFormGroup = {
  name?: string;
  description?: string;
  form?: PrivacyFormField[];
};

export type PrivacyFormValues = {
  profileVisibility: PrivacyVisibilityOption;
  contactInfoVisibility: PrivacyVisibilityOption;
};
