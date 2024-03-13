// App.test.tsx
import { describe, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Order, OrdersTable, TransactionHeader } from './OrdersTable';

describe('OrdersTable', () => {
  const transactionHeaders: TransactionHeader[] = [
    { key: 'customerName', label: 'Customer Name' },
    { key: 'orderId', label: 'Order ID' },
  ];

  const orders: Order[] = [
    {
      id: 1,
      orderDetails: ['Order #1', 'Date: 2023-07-11'],
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

  it('renders orders and their transactions correctly', () => {
    render(
      <OrdersTable orders={orders} transactionHeaders={transactionHeaders} />
    );

    // Check for order details
    expect(screen.getByText('Order #1 - Date: 2023-07-11')).toBeInTheDocument();

    // Check for transaction details
    expect(screen.getByText('Brian')).toBeInTheDocument();
    expect(screen.getByText('I208-L')).toBeInTheDocument();
  });

  it('toggles the visibility of transactions when the order row is clicked', () => {
    render(
      <OrdersTable orders={orders} transactionHeaders={transactionHeaders} />
    );

    // Initially, transactions should be visible
    expect(screen.getByText('Brian')).toBeVisible();

    fireEvent.click(screen.getByText('Order #1 - Date: 2023-07-11'));

    expect(screen.queryByText('Brian')).not.toBeInTheDocument();
  });
});
