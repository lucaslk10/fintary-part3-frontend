import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { GettingStarted } from './GettingStartedMatch'; // Adjust the import path as necessary
import { vi } from 'vitest';

describe('GettingStarted Component', () => {
  it('renders correctly with initial state', () => {
    render(<GettingStarted onProceed={() => {}} />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Welcome to the first step of our matching process. To get started, you'll need to prepare your data. Follow the instructions below to ensure a smooth process:"
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/"orders": \[/)).not.toBeInTheDocument(); // JSON example should not be visible initially
  });

  it('toggles JSON example visibility on button click', () => {
    render(<GettingStarted onProceed={() => {}} />);
    const toggleButton = screen.getByText('Show JSON Example');
    fireEvent.click(toggleButton);
    expect(screen.getByText(/"orders": \[/)).toBeInTheDocument(); // JSON example should be visible after click
    fireEvent.click(toggleButton);
    expect(screen.queryByText(/"orders": \[/)).not.toBeInTheDocument(); // JSON example should be hidden again
  });

  it('calls onProceed prop when "Proceed to Next Step" button is clicked', () => {
    const mockOnProceed = vi.fn();
    render(<GettingStarted onProceed={mockOnProceed} />);
    const proceedButton = screen.getByText('Proceed to Next Step');
    fireEvent.click(proceedButton);
    expect(mockOnProceed).toHaveBeenCalled();
  });
});
