// GettingStarted.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GettingStarted } from "./GettingStartedMatch";

const meta: Meta<typeof GettingStarted> = {
  title: "Components/GettingStarted",
  component: GettingStarted,
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
} satisfies Meta<typeof GettingStarted>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <GettingStarted {...args} />,
  args: {
    onProceed: () => console.log("Proceed to the next step"),
  },
};
