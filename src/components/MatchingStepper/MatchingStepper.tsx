import React from 'react';
import { Stepper, Step, Button, Typography } from '@material-tailwind/react';

interface StepInfo {
  id: string;
  label: string;
  description: string;
  icon: JSX.Element;
  content: JSX.Element; // Add this to include the content of each step
}

interface MatchingStepperProps {
  activeStep: number;
  steps: StepInfo[];
  onStepChange: (step: number) => void;
}

const MatchingStepper: React.FC<MatchingStepperProps> = ({
  activeStep,
  steps,
}) => {
  return (
    <div className="w-full px-24 py-4">
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.id}>
            {step.icon}
            <div className="absolute -bottom-[4.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === index ? 'blue-gray' : 'gray'}
              >
                {step.label}
              </Typography>
              <Typography
                color={activeStep === index ? 'blue-gray' : 'gray'}
                className="font-normal"
              >
                {step.description}
              </Typography>
            </div>
          </Step>
        ))}
      </Stepper>
      <div className="mt-32 flex-grow">
        {/* Render the active step's content */}
        {steps[activeStep].content}
      </div>
    </div>
  );
};

export { MatchingStepper };
