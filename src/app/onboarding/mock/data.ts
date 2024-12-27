import { z } from "zod";
import { OnboardingData } from "../type";

export const data: OnboardingData = {
  steps: [
    {
      step: 1,
      title: "Welcome to KU Connect,\nMhoo Toey!\nLet's set up your profile.",
      description: "This is a description",
      skippable: false,
      group: [
        {
          name: "Personal Information",
          description: "Add your personal details.",
          form: [
            {
              id: "name",
              type: "text",
              label: "Name",
              placeholder: "Your name",
              required: true,
            },
            {
              id: "bio",
              type: "textarea",
              label: "Bio",
              placeholder: "A short bio",
              required: false,
            },
            {
              id: "birthday",
              type: "date",
              label: "Birthday",
              required: false,
            },
          ],
        },
        {
          name: "Contact",
          description: "Add your contact.",
          form: [
            {
              id: "line",
              type: "text",
              label: "Line ID",
              placeholder: "@username",
              required: false,
            },
          ],
        },
      ],
    },
    {
      step: 2,
      title: "How can people reach you?",
      description:
        "Add your contact details. People can only see this after you match with them. (optional).",
      skippable: true,
      group: [
        {
          form: [
            {
              id: "faculty",
              type: "combobox",
              label: "Faculty",
              placeholder: "Select your faculty",
              data: [
                { value: "engineering", label: "Engineering" },
                { value: "science", label: "Science" },
                { value: "arts", label: "Arts" },
                { value: "medicine", label: "Medicine" },
              ],
              required: true,
            },
            {
              id: "year",
              type: "select",
              label: "Year of Study",
              placeholder: "Select year",
              data: [
                { value: "1", label: "1st year" },
                { value: "2", label: "2nd year" },
                { value: "3", label: "3rd year" },
                { value: "4", label: "4th year" },
              ],
              required: true,
            },
          ],
        },
      ],
    },
    {
      step: 3,
      title: "This is just a blank page",
      skippable: false,
    },
    {
      step: 4,
      title: "What are you interested in?",
      description: "Select what you’re looking for on KU Connect.",
      skippable: false,
      group: [
        {
          form: [
            {
              id: "mode",
              type: "radio",
              label: "Pick mode",
              data: [
                { value: "1", label: "Default" },
                { value: "2", label: "Comfortable" },
                { value: "3", label: "Compact" },
              ],
              required: true,
            },
            {
              id: "agree",
              type: "checkbox",
              required: true,
              label: "I agree to the terms and conditions",
            },
          ],
        },
      ],
    },
  ],
};

export const formSchema = z.object({
  name: z.string().min(1, "Name should not be empty"),
  bio: z.string(),
  birthday: z.date(),
  line: z.string(),
  faculty: z.string(),
  year: z.string(),
  mode: z.string(),
  agree: z.literal<boolean>(true, {
    errorMap: () => ({
      message: "You must agree to the terms and conditions",
    }),
  }),
});

export type ProfileForm = z.infer<typeof formSchema>;

export const defaultProfile = {
  name: "",
  bio: "",
  birthday: "",
  line: "",
  faculty: "",
  year: "",
  mode: "",
  agree: false,
};
