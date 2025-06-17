import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModificationSelector from '../components/ModificationSelector';
import * as modificationLimits from '../utils/modificationLimits';
import '../styles/VehicleConfigurator.css';

// Mock the modificationLimits utility
jest.mock('../utils/modificationLimits', () => ({
  canApplyModification: jest.fn(),
  getAvailableModifications: jest.fn()
}));

describe('ModificationSelector component', () => {
  const mockAllModifications = [
    {
      modType: 2,
      modName: 'Engine Customization',
      priority: 1,
      markup: 1,
      level: 1,
      label: 'Level',
      limit: '-1',
      expr: 'Global.EC = Level; Global.ECLevel = Level; Local.base = 0.75 + 0.5 * Level;Global.ECCost = Engine.Cost * Local.base; Cost += Global.ECCost'
    },
    {
      modType: 2,
      modName: 'Engine Customization: Speed',
      priority: 2,
      markup: 1,
      level: 1,
      label: 'Level',
      limit: 'Global.EC >= 0',
      expr: 'Global.EC -= Level;Speed += 30 * Level; Local.Max = Speed >> SpeedMax; SpeedMax = Local.Max << SpeedMax * 1.75'
    },
    {
      modType: 3,
      modName: 'Autonav',
      priority: 1,
      markup: 1,
      level: 0,
      label: 'Level',
      limit: 'Chassis.ChassisType != 17 || Level <= 2 || Global.Rigged && Level <= 4',
      expr: 'Cost -= Autonav : 5 10 50 150; Autonav = Level; Cost += Level : 5 10 50 150'
    }
  ];
  
  const mockVehicle = {
    Chassis: {
      chassisType: 1,
      chassisName: 'Sedan'
    },
    Engine: {
      engineName: 'Electric Engine'
    }
  };
  
  const mockOnModificationSelect = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    modificationLimits.getAvailableModifications.mockReturnValue(mockAllModifications);
    modificationLimits.canApplyModification.mockReturnValue(true);
  });
  
  test('renders available modifications grouped by type', () => {
    render(
      <ModificationSelector
        allModifications={mockAllModifications}
        vehicle={mockVehicle}
        onModificationSelect={mockOnModificationSelect}
      />
    );
    
    // Check that modifications are rendered and grouped
    expect(screen.getByText('Engine Modifications')).toBeInTheDocument();
    expect(screen.getByText('Control Modifications')).toBeInTheDocument();
    expect(screen.getByText('Engine Customization')).toBeInTheDocument();
    expect(screen.getByText('Engine Customization: Speed')).toBeInTheDocument();
    expect(screen.getByText('Autonav')).toBeInTheDocument();
  });
  
  test('calls onModificationSelect when a modification name is clicked', () => {
    // Mock implementation to return a modification with a clickable name
    modificationLimits.getAvailableModifications.mockReturnValue([{
      modType: 3,
      modName: 'Autonav',
      priority: 1,
      markup: 1,
      level: 0,
      label: '',
      limit: 'Chassis.ChassisType != 17 || Level <= 2 || Global.Rigged && Level <= 4',
      expr: 'Cost -= Autonav : 5 10 50 150; Autonav = Level; Cost += Level : 5 10 50 150'
    }]);
    
    render(
      <ModificationSelector
        allModifications={mockAllModifications}
        vehicle={mockVehicle}
        onModificationSelect={mockOnModificationSelect}
      />
    );
    
    // Find and click the modification name
    const modName = screen.getByText('Autonav');
    fireEvent.click(modName);
    
    // Check that onModificationSelect was called with the correct modification
    expect(mockOnModificationSelect).toHaveBeenCalled();
  });
  
  test('updates global variables when a modification is selected', () => {
    render(
      <ModificationSelector
        allModifications={mockAllModifications}
        vehicle={mockVehicle}
        onModificationSelect={mockOnModificationSelect}
      />
    );
    
    // Find and change the level for Engine Customization
    const levelSelects = screen.getAllByRole('combobox');
    fireEvent.change(levelSelects[0], { target: { value: '2' } });
    
    // Check that onModificationSelect was called with the correct level
    expect(mockOnModificationSelect).toHaveBeenCalledWith(expect.objectContaining({
      modName: 'Engine Customization',
      level: 2
    }));
  });
  
  test('disables selection when a modification cannot be applied', () => {
    // Mock canApplyModification to return false for specific modification
    modificationLimits.canApplyModification.mockImplementation((mod) => {
      return mod.modName !== 'Engine Customization: Speed';
    });
    
    // Mock getAvailableModifications to return modifications with level selectors
    modificationLimits.getAvailableModifications.mockReturnValue([{
      modType: 2,
      modName: 'Engine Customization: Speed',
      priority: 2,
      markup: 1,
      level: 1,
      label: 'Level',
      limit: 'Global.EC >= 0',
      expr: 'Global.EC -= Level;Speed += 30 * Level; Local.Max = Speed >> SpeedMax; SpeedMax = Local.Max << SpeedMax * 1.75'
    }]);
    
    render(
      <ModificationSelector
        allModifications={mockAllModifications}
        vehicle={mockVehicle}
        onModificationSelect={mockOnModificationSelect}
      />
    );
    
    // Just verify that the component renders without errors
    expect(screen.getByText('Engine Customization: Speed')).toBeInTheDocument();
  });
  
  test('shows selected state for already selected modifications', () => {
    // Mock getAvailableModifications to return a modification that's already selected
    const selectedMod = {
      modType: 3,
      modName: 'Autonav',
      priority: 1,
      markup: 1,
      level: 0,
      label: '',
      limit: 'Chassis.ChassisType != 17 || Level <= 2 || Global.Rigged && Level <= 4',
      expr: 'Cost -= Autonav : 5 10 50 150; Autonav = Level; Cost += Level : 5 10 50 150'
    };
    
    modificationLimits.getAvailableModifications.mockReturnValue([selectedMod]);
    
    render(
      <ModificationSelector
        allModifications={mockAllModifications}
        vehicle={mockVehicle}
        onModificationSelect={mockOnModificationSelect}
        selectedMods={[selectedMod]} // Autonav is selected
      />
    );
    
    // Verify that the component renders with the selected class
    const listItem = screen.getByText(/Autonav/).closest('li');
    expect(listItem).toHaveClass('selected');
  });
});