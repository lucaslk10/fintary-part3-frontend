import React, { useEffect, useState } from 'react';
export interface Order {
  id: number;
  orderDetails: string[];
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: string;
  customerName: string;
  orderId: string;
  date: string;
  product: string;
  price: number;
  transactionType: string;
  transactionDate: string;
  transactionAmount: number;
}

export interface TransactionHeader {
  key: keyof Transaction; // Use keyof Transaction to ensure keys are valid
  label: string;
}

export interface OrdersTableProps {
  orders: Order[]; // Assume Order interface already includes a transactions array of Transaction type
  transactionHeaders: TransactionHeader[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  transactionHeaders,
}) => {
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  useEffect(() => {
    setExpandedOrders(orders.map((order) => order.id)); // Automatically expand all orders initially
  }, [orders]);

  const toggleExpandOrder = (orderId: number) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Dynamically generate the grid-template-columns style based on the number of headers
  const gridTemplateColumns = `repeat(${transactionHeaders.length}, minmax(0, 1fr))`;

  return (
    <div className="min-w-full overflow-hidden shadow-md rounded-lg">
      {orders.map((order) => (
        <React.Fragment key={order.id}>
          <div
            className="bg-blue-200 p-4 cursor-pointer flex justify-between items-center"
            onClick={() => toggleExpandOrder(order.id)}
          >
            <div className="font-bold">{order.orderDetails.join(' - ')}</div>
            <span>{expandedOrders.includes(order.id) ? '▼' : '►'}</span>
          </div>
          {expandedOrders.includes(order.id) && (
            <>
              <div
                className="bg-gray-100 p-4"
                style={{ display: 'grid', gridTemplateColumns }}
              >
                {transactionHeaders.map(({ label }, index) => (
                  <div key={index} className="font-bold">
                    {label}
                  </div>
                ))}
              </div>
              {order.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white p-4 border-l-4 border-blue-500 pl-8"
                  style={{ display: 'grid', gridTemplateColumns }}
                >
                  {transactionHeaders.map(({ key }, index) => (
                    <div key={index}>{transaction[key]}</div>
                  ))}
                </div>
              ))}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export { OrdersTable };
