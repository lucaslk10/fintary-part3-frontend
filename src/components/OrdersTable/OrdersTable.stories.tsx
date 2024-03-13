// OrdersTable.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OrdersTable, TransactionHeader } from './OrdersTable';

const ordersData = [
  {
    id: 1,
    orderDetails: [
      'Order #1',
      'Date: 2023-07-11',
      'Customer: Brian',
      'Price: $1.23',
    ],
    transactions: [
      {
        id: 101,
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
  },
];

const transactionHeaders: TransactionHeader[] = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'customerName', label: 'Customer Name' },
  { key: 'product', label: 'Product' },
  { key: 'transactionAmount', label: 'Amount' },
  { key: 'transactionDate', label: 'Transaction Date' },
];

// Setup the metadata for the Storybook
const meta: Meta<typeof OrdersTable> = {
  title: 'Components/OrdersTable',
  component: OrdersTable,
  parameters: {
    // layout: "centered",
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof OrdersTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// Define the default story for the OrdersTable
export const Default: Story = {
  args: {
    orders: ordersData as any,
    transactionHeaders: transactionHeaders,
  },
};
