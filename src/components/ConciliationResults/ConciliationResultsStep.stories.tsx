// ConciliationResultsStep.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConciliationResultsStep } from './ConciliationResultsStep';

const meta: Meta<typeof ConciliationResultsStep> = {
  title: 'Components/ConciliationResultsStep',
  component: ConciliationResultsStep,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
} satisfies Meta<typeof ConciliationResultsStep>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ConciliationResultsStep {...args} />,
  args: {
    matchingData: [
      [
        {
          type: 'order',
          customerName: 'Bryan',
          orderId: '12OB-1',
          date: '2023-07-11',
          product: 'Product ABC-1',
          price: 1.23,
        },
        {
          type: 'txn',
          customerName: 'Brian',
          orderId: 'I208-L',
          date: '2023-07-11',
          product: 'ABC Product v1',
          price: 1.23,
          transactionType: 'paymentReceived',
          transactionDate: '2023-07-12',
          transactionAmount: 1.23,
        },
      ],
      [
        {
          type: 'order',
          customerName: 'Mike',
          orderId: '1B-L',
          date: '2023-07-11',
          product: 'Product ABC-1',
          price: 1.23,
        },
        {
          type: 'txn',
          customerName: 'Mike',
          orderId: 'I8-L',
          date: '2023-07-11',
          product: 'ABC Product v1',
          price: 1.23,
          transactionType: 'paymentReceived',
          transactionDate: '2023-07-12',
          transactionAmount: 1.23,
        },
      ],
    ],
  },
};
