import React, { useEffect, useState } from 'react';
import {
  OrdersTable,
  Order,
  TransactionHeader,
} from '../OrdersTable/OrdersTable';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import * as XLSX from 'xlsx';
import {
  ArrowDownTrayIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';

interface MatchingData {
  type: string;
  customerName: string;
  orderId: string;
  date: string;
  product: string;
  price: number;
  transactionType?: string;
  transactionDate?: string;
  transactionAmount?: number;
}

interface ConciliationResultsStepProps {
  matchingData: MatchingData[][];
  restartFlow: () => void;
}

const transactionHeaders: TransactionHeader[] = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'customerName', label: 'Customer Name' },
  { key: 'product', label: 'Product' },
  { key: 'transactionAmount', label: 'Amount' },
  { key: 'transactionDate', label: 'Transaction Date' },
  // Add more headers as needed
];

const ConciliationResultsStep: React.FC<ConciliationResultsStepProps> = ({
  matchingData,
  restartFlow,
}) => {
  const mapDataToOrders = (data: MatchingData[][]): Order[] => {
    return data.map((group, index) => ({
      id: index + 1,
      orderDetails: [
        `Order ID: ${group[0].orderId}`,
        `Date: ${group[0].date}`,
        `Customer: ${group[0].customerName}`,
        `Product: ${group[0].product}`,
      ],
      transactions: group
        .filter((item) => item.type === 'txn')
        .map((txn, txnIndex) => ({
          id: `${txn.orderId}-${txnIndex}`,
          ...txn,
          transactionType: txn.transactionType || '',
          transactionDate: txn.transactionDate || '',
          transactionAmount: txn.transactionAmount || 0,
        })),
    }));
  };

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!matchingData) return;
    const orders = mapDataToOrders(matchingData);
    setOrders(orders);
  }, [matchingData]);

  const handleDownload = (format: string) => {
    if (format === 'json') {
      const jsonStr = JSON.stringify(matchingData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.json';
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === 'sheet') {
      const ws = XLSX.utils.json_to_sheet(matchingData.flat());
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, 'data.xlsx');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Matching Results</h2>
      </div>
      <div className="flex justify-between mb-4">
        <Button
          onClick={restartFlow}
          className="flex gap-2 items-center"
          size="sm"
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
          Start new conciliation
        </Button>
        <Menu>
          <MenuHandler>
            <Button className="flex gap-2 items-center" size="sm">
              <ArrowDownTrayIcon className="h-5 w-5" />
              Download Results
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() => handleDownload('json')}>JSON</MenuItem>
            <MenuItem onClick={() => handleDownload('sheet')}>Sheet</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <OrdersTable orders={orders} transactionHeaders={transactionHeaders} />
    </div>
  );
};

export { ConciliationResultsStep };
