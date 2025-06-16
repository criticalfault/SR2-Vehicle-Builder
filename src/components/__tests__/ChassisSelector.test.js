import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChassisSelector from '../ChassisSelector';

// Mock CSS imports
jest.mock('../../styles/components/ChassisSelector.css', () => ({}));

describe('ChassisSelector component', () => {
  const mockChassisData = [
    {
      chassisType: 1,
      chassisName: 'Sedan',
      handling: 4,
      offRoad: 8,
      body: 3,
      cf: 6,
      cfMax: 30,
      cost: 50,
      book: 'Rigger 2'
    },
    {
      chassisType: 1,
      chassisName: 'Sports Car',
      handling: 4,
      offRoad: 8,
      body: 3,
      cf: 3,
      cfMax: 18,
      cost: 50,
      book: 'Rigger 2'
    },
    {
      chassisType: 17,
      chassisName: 'Scooter',
      handling: 3,
      offRoad: 6,
      body: 2,
      cf: 0,
      cfMax: 1,
      cost: 30,
      book: 'Shadowrun'
    }
  ];

  const mockOnChassisSelect = jest.fn();

  beforeEach(() => {
    mockOnChassisSelect.mockClear();
  });

  it('renders the component with chassis data', () => {
    render(
      <ChassisSelector 
        chassisData={mockChassisData} 
        selectedChassis={null} 
        onChassisSelect={mockOnChassisSelect} 
      />
    );

    expect(screen.getByText('Chassis')).toBeInTheDocument();
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('Sports Car')).toBeInTheDocument();
    expect(screen.getByText('Scooter')).toBeInTheDocument();
  });

  it('filters chassis by type', () => {
    render(
      <ChassisSelector 
        chassisData={mockChassisData} 
        selectedChassis={null} 
        onChassisSelect={mockOnChassisSelect} 
      />
    );

    // Initially all chassis should be visible
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('Scooter')).toBeInTheDocument();

    // Filter by type 1 (cars)
    const typeFilter = screen.getByRole('combobox', { name: /type/i });
    fireEvent.change(typeFilter, { target: { value: '1' } });

    // Now only cars should be visible
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('Sports Car')).toBeInTheDocument();
    expect(screen.queryByText('Scooter')).not.toBeInTheDocument();
  });

  // Book filter test removed as the feature has been removed

  it('calls onChassisSelect when a chassis is clicked', () => {
    render(
      <ChassisSelector 
        chassisData={mockChassisData} 
        selectedChassis={null} 
        onChassisSelect={mockOnChassisSelect} 
      />
    );

    // Click on the Sedan chassis
    fireEvent.click(screen.getByText('Sedan'));

    // Check if onChassisSelect was called with the correct chassis
    expect(mockOnChassisSelect).toHaveBeenCalledTimes(1);
    expect(mockOnChassisSelect).toHaveBeenCalledWith(mockChassisData[0]);
  });

  it('highlights the selected chassis', () => {
    render(
      <ChassisSelector 
        chassisData={mockChassisData} 
        selectedChassis={mockChassisData[0]} 
        onChassisSelect={mockOnChassisSelect} 
      />
    );

    // Find the chassis item containing "Sedan"
    const sedanItem = screen.getByText('Sedan').closest('.chassis-item');
    
    // Check if it has the "selected" class
    expect(sedanItem).toHaveClass('selected');
    
    // Other chassis items should not have the "selected" class
    const scooterItem = screen.getByText('Scooter').closest('.chassis-item');
    expect(scooterItem).not.toHaveClass('selected');
  });
});