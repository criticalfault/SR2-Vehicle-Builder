import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModificationList from '../ModificationList';

// Mock CSS imports
jest.mock('../../styles/components/ModificationList.css', () => ({}));

// Helper function to make tests more robust
const findByTextWithMarkup = (screen, text) => {
  return screen.getAllByText((content, element) => {
    return element.textContent.includes(text);
  })[0];
};

describe('ModificationList component', () => {
  const mockModifications = [
    {
      modName: 'Standard Armour',
      level: 2,
      label: 'Armour',
      limit: '6',
      book: 'Rigger 2'
    },
    {
      modName: 'Improved Suspension',
      level: 1,
      label: 'Rating',
      limit: '3',
      book: 'Rigger 2'
    }
  ];

  const mockOnRemoveModification = jest.fn();
  const mockOnLevelChange = jest.fn();

  beforeEach(() => {
    mockOnRemoveModification.mockClear();
    mockOnLevelChange.mockClear();
  });

  it('renders the component with modifications', () => {
    render(
      <ModificationList 
        modifications={mockModifications} 
        onRemoveModification={mockOnRemoveModification} 
        onLevelChange={mockOnLevelChange} 
      />
    );

    expect(screen.getByText('Applied Modifications')).toBeInTheDocument();
    expect(screen.getByText('Standard Armour')).toBeInTheDocument();
    expect(screen.getByText('Improved Suspension')).toBeInTheDocument();
  });

  it('displays a message when no modifications are applied', () => {
    render(
      <ModificationList 
        modifications={[]} 
        onRemoveModification={mockOnRemoveModification} 
        onLevelChange={mockOnLevelChange} 
      />
    );

    expect(screen.getByText('No modifications applied')).toBeInTheDocument();
  });

  it('calls onRemoveModification when remove button is clicked', () => {
    render(
      <ModificationList 
        modifications={mockModifications} 
        onRemoveModification={mockOnRemoveModification} 
        onLevelChange={mockOnLevelChange} 
      />
    );

    // Find all remove buttons
    const removeButtons = screen.getAllByText('Remove');
    
    // Click the first remove button (Standard Armour)
    fireEvent.click(removeButtons[0]);

    // Check if onRemoveModification was called with the correct index
    expect(mockOnRemoveModification).toHaveBeenCalledTimes(1);
    expect(mockOnRemoveModification).toHaveBeenCalledWith(0);
  });

  it('calls onLevelChange when level input is changed', () => {
    render(
      <ModificationList 
        modifications={mockModifications} 
        onRemoveModification={mockOnRemoveModification} 
        onLevelChange={mockOnLevelChange} 
      />
    );

    // Find the level input for Standard Armour
    const levelInputs = screen.getAllByRole('spinbutton');
    
    // Change the level to 3
    fireEvent.change(levelInputs[0], { target: { value: '3' } });

    // Check if onLevelChange was called with the correct index and level
    expect(mockOnLevelChange).toHaveBeenCalledTimes(1);
    expect(mockOnLevelChange).toHaveBeenCalledWith(0, 3);
  });
  


  it('displays the correct label and limit for each modification', () => {
    const { container } = render(
      <ModificationList 
        modifications={mockModifications} 
        onRemoveModification={mockOnRemoveModification} 
        onLevelChange={mockOnLevelChange} 
      />
    );

    // Check if the labels are displayed correctly using querySelector
    expect(container.querySelector('label[for="mod-level-0"]')).toHaveTextContent('Armour:');
    expect(container.querySelector('label[for="mod-level-1"]')).toHaveTextContent('Rating:');
    
    // Check if the limits are displayed correctly
    expect(container.querySelector('.mod-limit')).toHaveTextContent('Max: 6');
    const modLimits = container.querySelectorAll('.mod-limit');
    expect(modLimits[1]).toHaveTextContent('Max: 3');
  });

  it('displays the current level for each modification', () => {
    render(
      <ModificationList 
        modifications={mockModifications} 
        onRemoveModification={mockOnRemoveModification} 
        onLevelChange={mockOnLevelChange} 
      />
    );

    // Find all level inputs
    const levelInputs = screen.getAllByRole('spinbutton');
    
    // Check if the values are set correctly
    expect(levelInputs[0]).toHaveValue(2);
    expect(levelInputs[1]).toHaveValue(1);
  });
});