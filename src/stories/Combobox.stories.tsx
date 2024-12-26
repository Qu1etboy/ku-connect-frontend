import { Combobox } from "@/components/ui/combobox";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Combobox",
  component: Combobox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    data: {
      description: "The data to display in the combobox",
      control: {
        type: "object",
      },
    },
    value: {
      description: "The value of the combobox",
      control: {
        type: "text",
      },
    },
    onChange: {
      description: "The function to call when the value changes",
    },
    placeholder: {
      description: "The placeholder text to display when the combobox is empty",
      control: {
        type: "text",
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs();

    return (
      <Combobox
        data={args.data}
        placeholder={args.placeholder}
        value={args.value}
        onChange={(v) => updateArgs({ value: v })}
      />
    );
  },
  args: {
    data: [
      {
        value: "next.js",
        label: "Next.js",
      },
      {
        value: "sveltekit",
        label: "SvelteKit",
      },
      {
        value: "nuxt.js",
        label: "Nuxt.js",
      },
      {
        value: "remix",
        label: "Remix",
      },
      {
        value: "astro",
        label: "Astro",
      },
    ],
    value: "",
    onChange: fn(),
    placeholder: "Select a framework",
  },
};
