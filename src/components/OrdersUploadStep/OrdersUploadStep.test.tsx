// OrdersUploadStep.test.tsx

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OrdersUploadStep } from './OrdersUploadStep';
import { useDropzone } from 'react-dropzone';

// Mock useDropzone
vi.mock('react-dropzone', () => ({
  useDropzone: vi.fn(),
}));

// Mock FileReader
global.FileReader = vi.fn(() => ({
  readAsText: vi.fn(),
  readAsBinaryString: vi.fn(),
  onload: null,
})) as any;

describe('OrdersUploadStep Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    (useDropzone as vi.Mock).mockImplementation(({ onDrop }) => ({
      getRootProps: vi.fn(() => ({})),
      getInputProps: vi.fn(() => ({})),
      isDragActive: false,
      onDrop,
    }));
  });

  it('renders correctly with initial UI elements', () => {
    render(<OrdersUploadStep onSendData={() => {}} />);
    expect(
      screen.getByText(/Drag 'n' drop your sheet or JSON file here/i)
    ).toBeInTheDocument();
  });

  it('displays error message if provided', () => {
    const errorMessage = 'Error uploading file;Please try again.';
    render(
      <OrdersUploadStep onSendData={() => {}} errorMessage={errorMessage} />
    );
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Error uploading file')).toBeInTheDocument();
    expect(screen.getByText('Please try again.')).toBeInTheDocument();
  });
});
