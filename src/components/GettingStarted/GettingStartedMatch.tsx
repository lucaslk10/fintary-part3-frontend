import React, { useState } from "react";
import { Button } from "@material-tailwind/react";

interface GettingStartedProps {
  onProceed: () => void;
}

const GettingStarted: React.FC<GettingStartedProps> = ({ onProceed }) => {
  const [isJsonFormatVisible, setIsJsonFormatVisible] = useState(false);

  const toggleJsonFormat = () => setIsJsonFormatVisible(!isJsonFormatVisible);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Getting Started</h2>
      <p className="mb-4">
        Welcome to the first step of our matching process. To get started,
        you'll need to prepare your data. Follow the instructions below to
        ensure a smooth process:
      </p>
      <ol className="list-decimal ml-4 mb-4">
        <li>
          Ensure you have a sheet file ready in the same format as our{" "}
          <a href="/demo-sheet.xlsx" className="text-blue-500" download>
            Demo Sheet
          </a>
          .
        </li>
        <li>
          If you prefer, you can use a JSON file. Check the format example
          below.
        </li>
        <li>
          You'll then be able to check the results of the matching between
          orders and transactions.
        </li>
      </ol>
      <div className="flex justify-between items-center mb-4">
        <Button color="blue" onClick={toggleJsonFormat}>
          {isJsonFormatVisible ? "Hide JSON Example" : "Show JSON Example"}
        </Button>
        <Button onClick={onProceed}>Proceed to Next Step</Button>
      </div>

      {isJsonFormatVisible && (
        <div className="p-4 bg-gray-100 rounded">
          <pre className="whitespace-pre-wrap text-sm">
            {`{
    "orders": [
        {
            "type": "order",
            "customerName": "Bryan",
            "orderId": "12OB-1",
            "date": "2023-07-11",
            "product": "Product ABC-1",
            "price": "1.23"
        },
        {
            "type": "order",
            "customerName": "Michael",
            "orderId": "L2OB-I",
            "date": "2023-07-11",
            "product": "Product ABC-1",
            "price": 1.23
        }
    ],
    "transactions": [
        {
            "type": "txn",
            "customerName": "Brian",
            "orderId": "I208-L",
            "date": "2023-07-11",
            "product": "ABC Product v1",
            "price": 1.23,
            "transactionType": "paymentReceived",
            "transactionDate": "2023-07-12",
            "transactionAmount": 1.23
        }
    ]
}`}
          </pre>
        </div>
      )}
    </div>
  );
};

export { GettingStarted };
