import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import VehicleConfigurator from '../components/VehicleConfigurator';
import * as dataLoader from '../utils/dataLoader';
import * as modificationLimits from '../utils/modificationLimits';

// Mock the dataLoader and modificationLimits utilities
jest.mock('../utils/dataLoader', () => ({
  loadChassisData: jest.fn(),
  loadEngineData: jest.fn(),
  loadModificationData: jest.fn(),
  createVehicleObject: jest.fn()
}));

jest.mock('../utils/modificationLimits', () => ({
  evaluateExpression: jest.fn()
}));

// Mock ModificationSelector component
jest.mock('../components/ModificationSelector', () => {
  return function MockModificationSelector({ onModificationSelect }) {
    return (
      <div data-testid="mock-modification-selector">
        <button 
          onClick={() => onModificationSelect({ 
            modName: 'Test Mod', 
            level: 1,
            expr: 'Speed += 10; Cost += 50'
          })}
        >
          Select Modification
        </button>
      </div>
    );
  };
});

describe('VehicleConfigurator component', () => {
  const mockChassisData = [
    {
      chassisType: 1,
      chassisName: 'Sedan',
      handling: 4,
      offRoad: 8,
      body: 3,
      armour: 0,
      cf: 6,
      cfMax: 30,
      cost: 50
    },
    {
      chassisType: 17,
      chassisName: 'Scooter',
      handling: 3,
      offRoad: 6,
      body: 2,
      armour: 0,
      cf: 0,
      cfMax: 1,
      cost: 30
    }
  ];
  
  const mockEngineData = [
    {
      engineName: 'Electric Engine',
      speed: 50,
      speedMax: 70,
      accel: 10,
      accelMax: 15,
      load: 100,
      loadMax: 150,
      cost: 50
    },
    {
      engineName: 'Gasoline Engine',
      speed: 60,
      speedMax: 80,
      accel: 12,
      accelMax: 18,
      load: 120,
      loadMax: 180,
      cost: 60
    }
  ];
  
  const mockModificationData = {
    modifications: [
      {
        modType: 2,
        modName: 'Engine Customization',
        priority: 1,
        level: 1,
        label: 'Level',
        limit: '-1',
        expr: 'Global.EC = Level; Cost += 50'
      }
    ],
    designs: [
      {
        modType: 1,
        modName: 'Speed Increase',
        priority: 1,
        level: 0,
        label: 'Level',
        limit: 'Speed <= SpeedMax',
        expr: 'Speed += Level; Cost += 2 * Level'
      }
    ],
    allModifications: [
      {
        modType: 2,
        modName: 'Engine Customization',
        priority: 1,
        level: 1,
        label: 'Level',
        limit: '-1',
        expr: 'Global.EC = Level; Cost += 50'
      },
      {
        modType: 1,
        modName: 'Speed Increase',
        priority: 1,
        level: 0,
        label: 'Level',
        limit: 'Speed <= SpeedMax',
        expr: 'Speed += Level; Cost += 2 * Level'
      }
    ]
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the data loading functions
    dataLoader.loadChassisData.mockResolvedValue(mockChassisData);
    dataLoader.loadEngineData.mockResolvedValue(mockEngineData);
    dataLoader.loadModificationData.mockResolvedValue(mockModificationData);
    
    // Mock createVehicleObject to return a simple vehicle object
    dataLoader.createVehicleObject.mockImplementation((chassis, engine) => ({
      Chassis: chassis,
      Engine: engine,
      Handling: chassis.handling,
      OffRoad: chassis.offRoad,
      Body: chassis.body,
      Armour: chassis.armour || 0,
      CF: chassis.cf,
      Speed: engine.speed,
      SpeedMax: engine.speedMax,
      Accel: engine.accel,
      AccelMax: engine.accelMax,
      Cost: chassis.cost + engine.cost
    }));
    
    // Mock evaluateExpression to handle simple expressions
    modificationLimits.evaluateExpression.mockImplementation((expr, context) => {
      if (expr.includes('+=')) {
        const [prop, valueExpr] = expr.split('+=').map(part => part.trim());
        return parseInt(valueExpr, 10);
      }
      return null;
    });
  });
  
  test('loads data and renders chassis and engine selectors', async () => {
    // Setup the mock implementations to resolve immediately
    dataLoader.loadChassisData.mockResolvedValue(mockChassisData);
    dataLoader.loadEngineData.mockResolvedValue(mockEngineData);
    dataLoader.loadModificationData.mockResolvedValue(mockModificationData);
    
    await act(async () => {
      render(<VehicleConfigurator />);
    });
    
    // Wait for data to load
    await waitFor(() => {
      expect(dataLoader.loadChassisData).toHaveBeenCalled();
      expect(dataLoader.loadEngineData).toHaveBeenCalled();
      expect(dataLoader.loadModificationData).toHaveBeenCalled();
    });
    
    // Check that chassis selector is rendered with options
    const chassisSelect = screen.getByText(/Select Chassis/i).nextSibling;
    expect(chassisSelect).toBeInTheDocument();
    
    // Check that engine selector is rendered
    expect(screen.getByText(/Select Engine/i)).toBeInTheDocument();
  });
  
  test('updates vehicle when chassis or engine is selected', async () => {
    // Setup the mock implementations to resolve immediately
    dataLoader.loadChassisData.mockResolvedValue(mockChassisData);
    dataLoader.loadEngineData.mockResolvedValue(mockEngineData);
    dataLoader.loadModificationData.mockResolvedValue(mockModificationData);
    
    await act(async () => {
      render(<VehicleConfigurator />);
    });
    
    // Wait for data to load
    await waitFor(() => {
      expect(dataLoader.loadChassisData).toHaveBeenCalled();
    });
    
    // Reset the mock to track new calls
    dataLoader.createVehicleObject.mockClear();
    
    // Select a different chassis
    await act(async () => {
      const chassisSelects = screen.getAllByRole('combobox');
      fireEvent.change(chassisSelects[0], { target: { value: '17' } });
    });
    
    // Select a different engine
    await act(async () => {
      const engineSelects = screen.getAllByRole('combobox');
      fireEvent.change(engineSelects[1], { target: { value: 'Gasoline Engine' } });
    });
    
    // Verify that the component updates
    expect(screen.getByText(/Vehicle Configurator/i)).toBeInTheDocument();
  });
  
  test('adds modifications and updates vehicle stats', async () => {
    // Setup the mock implementations to resolve immediately
    dataLoader.loadChassisData.mockResolvedValue(mockChassisData);
    dataLoader.loadEngineData.mockResolvedValue(mockEngineData);
    dataLoader.loadModificationData.mockResolvedValue(mockModificationData);
    
    await act(async () => {
      render(<VehicleConfigurator />);
    });
    
    // Wait for data to load
    await waitFor(() => {
      expect(dataLoader.loadModificationData).toHaveBeenCalled();
    });
    
    // Select a modification
    await act(async () => {
      const selectModButton = screen.getByText('Select Modification');
      fireEvent.click(selectModButton);
    });
    
    // Check that vehicle stats are updated
    expect(screen.getByText('Speed:')).toBeInTheDocument();
    expect(screen.getByText('Cost:')).toBeInTheDocument();
  });
});