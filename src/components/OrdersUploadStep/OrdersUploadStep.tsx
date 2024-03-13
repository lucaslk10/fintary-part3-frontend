import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Order {
  type: 'order';
  customerName: string;
  orderId: string;
  date: string;
  product: string;
  price: number;
}

interface Transaction {
  type: 'txn';
  customerName: string;
  orderId: string;
  date: string;
  product: string;
  price: number;
  transactionType: string;
  transactionDate: string;
  transactionAmount: number;
}

//interface to senddata event prop
interface OrdersUploadStepProps {
  onSendData: (data: { orders: Order[]; transactions: Transaction[] }) => void;
  errorMessage?: string;
  loadingApiData?: boolean;
}

const OrdersUploadStep: React.FC<OrdersUploadStepProps> = ({
  onSendData,
  errorMessage,
  loadingApiData,
}) => {
  const [data, setData] = useState<{
    orders: Order[];
    transactions: Transaction[];
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    setLoading(loadingApiData ?? false);
  }, [loadingApiData]);

  const processXLSXFile = (file: Blob) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { raw: true });

      const formattedData = jsonData.reduce(
        (acc: any, row: any) => {
          if (row.type === 'order') {
            acc.orders.push(row);
          } else if (row.type === 'txn') {
            acc.transactions.push(row);
          }
          return acc;
        },
        { orders: [], transactions: [] }
      );

      console.log(formattedData);
      setData(formattedData as any);
    };
    reader.readAsBinaryString(file);
  };

  const processJSONFile = (file: Blob) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result;
      console.log({ text });
      setData(JSON.parse(text as string));
    };
    reader.readAsText(file);
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    setLoading(true);
    const file = acceptedFiles[0];
    setFileName(file.name);
    if (file.type === 'application/json') {
      processJSONFile(file);
      console.log('JSON file uploaded');
      console.log(data);
    } else {
      processXLSXFile(file);
    }

    setLoading(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
  });

  const removeFile = (e: any) => {
    e.stopPropagation();
    setData(null);
    setFileName(null);
    setLoading(false);
  };

  const handleSend = (e: any) => {
    e.stopPropagation();
    if (onSendData) onSendData(data as any);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Your File</h2>
      <div>
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="sm:inline flex flex-col">
              {' '}
              {errorMessage
                ?.split(';')
                .map((line, index) => <div key={index}>{line}</div>)}
            </span>
          </div>
        )}
      </div>
      <div
        {...getRootProps()}
        className="p-10 border-2 border-dashed border-gray-300 text-center"
      >
        <input {...getInputProps()} id="file-upload-input" />
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : data ? (
          <div className="flex flex-col items-center justify-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mb-2" />
            <div className="flex items-center mt-3">
              <span className="font-bold mr-2">{fileName}</span>
              <XCircleIcon
                className="h-6 w-6 text-red-500 inline-block cursor-pointer"
                onClick={removeFile}
              />
            </div>
          </div>
        ) : (
          <Typography>
            Drag 'n' drop your sheet or JSON file here. Or click here to select
            your file.
          </Typography>
        )}
        {!loading && data && (
          <Button className="mt-5" onClick={handleSend}>
            Send Data
          </Button>
        )}
      </div>
    </div>
  );
};
export { OrdersUploadStep };
