import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MatchingStepper } from './MatchingStepper';

const mockSteps = [
  {
    id: '1',
    label: 'Step 1',
    description: 'Description of Step 1',
    icon: <></>,
    content: <div>Content for Step 1</div>,
  },
  {
    id: '2',
    label: 'Step 2',
    description: 'Description of Step 2',
    icon: <></>,
    content: <div>Content for Step 2</div>,
  },
];

describe('MatchingStepper Component', () => {
  it('renders correctly and displays the correct initial step', () => {
    render(
      <MatchingStepper
        activeStep={0}
        steps={mockSteps}
        onStepChange={() => {}}
      />
    );

    expect(screen.getByText('Content for Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Description of Step 1')).toBeInTheDocument();
  });

  it('updates to display the correct step when activeStep changes', () => {
    const { rerender } = render(
      <MatchingStepper
        activeStep={0}
        steps={mockSteps}
        onStepChange={() => {}}
      />
    );

    // Initially displaying content for step 1
    expect(screen.getByText('Content for Step 1')).toBeInTheDocument();

    // Rerender with activeStep = 1 to simulate changing steps
    rerender(
      <MatchingStepper
        activeStep={1}
        steps={mockSteps}
        onStepChange={() => {}}
      />
    );

    expect(screen.getByText('Content for Step 2')).toBeInTheDocument();
    expect(screen.queryByText('Content for Step 1')).not.toBeInTheDocument(); // Step 1 content should no longer be present
  });
});
