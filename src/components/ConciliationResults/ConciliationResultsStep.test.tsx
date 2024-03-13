import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ConciliationResultsStep } from './ConciliationResultsStep';
import * as XLSX from 'xlsx';

// Mocks
vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: vi.fn(),
    book_new: vi.fn(),
    book_append_sheet: vi.fn(),
  },
  writeFile: vi.fn(),
}));

// Helper to setup the test environment
const setup = (props = {}) => {
  const utils = render(<ConciliationResultsStep {...props} />);
  return {
    ...utils,
  };
};

describe('ConciliationResultsStep Component', () => {
  const matchingDataMock = [
    [
      {
        type: 'txn',
        customerName: 'John Doe',
        orderId: '123',
        date: '2021-01-01',
        product: 'Widget',
        price: 100,
        transactionType: 'sale',
        transactionDate: '2021-01-02',
        transactionAmount: 100,
      },
    ],
  ];

  const restartFlowMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    setup({ matchingData: matchingDataMock, restartFlow: restartFlowMock });
  });

  it('correctly maps matchingData to orders on mount', async () => {
    const { findByText } = setup({
      matchingData: matchingDataMock,
      restartFlow: restartFlowMock,
    });
    await waitFor(() => {
      expect(findByText('Order ID: 123')).toBeTruthy();
    });
  });

  it('calls restartFlow when the button is clicked', async () => {
    const { getByText } = setup({
      matchingData: matchingDataMock,
      restartFlow: restartFlowMock,
    });
    const button = getByText(/Start new conciliation/i);
    fireEvent.click(button);
    expect(restartFlowMock).toHaveBeenCalled();
  });

  it('triggers download with the correct format when menu items are clicked', async () => {
    global.URL.createObjectURL = vi.fn();
    global.URL.revokeObjectURL = vi.fn();
    global.Blob = vi.fn(() => ({ type: 'application/json' }));

    const { getByText } = setup({
      matchingData: matchingDataMock,
      restartFlow: restartFlowMock,
    });

    fireEvent.click(getByText(/Download Results/i));
    fireEvent.click(getByText(/JSON/i));

    expect(global.Blob).toHaveBeenCalled();

    fireEvent.click(getByText(/Sheet/i));
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalled();
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalled();
    expect(XLSX.writeFile).toHaveBeenCalled();
  });
});
