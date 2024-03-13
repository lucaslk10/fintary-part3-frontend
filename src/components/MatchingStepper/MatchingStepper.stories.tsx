// MatchingStepper.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MatchingStepper } from "./MatchingStepper";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
// Define components for each step
const StepOneContent = () => <div>Content for Step 1</div>;
const StepTwoContent = () => <div>Content for Step 2</div>;
const StepThreeContent = () => <div>Content for Step 3</div>;

const steps = [
  {
    id: "step-1",
    label: "Step 1",
    description: "Details about your account.",
    icon: <UserIcon className="h-5 w-5" />,
    content: <StepOneContent />,
  },
  {
    id: "step-2",
    label: "Step 2",
    description: "Configuration settings.",
    icon: <CogIcon className="h-5 w-5" />,
    content: <StepTwoContent />,
  },
  {
    id: "step-3",
    label: "Step 3",
    description: "Finalization.",
    icon: <BuildingLibraryIcon className="h-5 w-5" />,
    content: <StepThreeContent />,
  },
];

const meta: Meta<typeof MatchingStepper> = {
  title: "Components/MatchingStepper",
  component: MatchingStepper,
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
  argTypes: {
    activeStep: {
      control: "number",
      description: "Currently active step",
      defaultValue: 0, // Default starting step
    },
  },
} satisfies Meta<typeof MatchingStepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: steps,
    activeStep: 0,
  },
  render: (args) => {
    const [activeStep, setActiveStep] = React.useState(args.activeStep);

    const handleStepChange = (step: number) => {
      setActiveStep(step);
      if (args.onStepChange) {
        args.onStepChange(step);
      }
    };

    return (
      <MatchingStepper
        {...args}
        activeStep={activeStep}
        onStepChange={handleStepChange}
      />
    );
  },
};
