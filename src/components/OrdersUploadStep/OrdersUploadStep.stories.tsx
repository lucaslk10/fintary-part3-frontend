// OrdersUploadStep.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { OrdersUploadStep } from "./OrdersUploadStep";

const meta: Meta<typeof OrdersUploadStep> = {
  title: "Components/OrdersUploadStep",
  component: OrdersUploadStep,
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
} satisfies Meta<typeof OrdersUploadStep>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const handleSendData = (data: any) => {
      console.log("Data sent:", data);
    };

    return <OrdersUploadStep onSendData={handleSendData} />;
  },
};
