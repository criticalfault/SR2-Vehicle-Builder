import React from 'react';
import { render, act } from '@testing-library/react';
import VehicleConfigurator from '../components/VehicleConfigurator';
import '../styles/VehicleConfigurator.css';

// Mock the data loading functions
jest.mock('../utils/dataLoader', () => ({
  loadChassisData: jest.fn().mockResolvedValue([
    { chassisType: 1, chassisName: 'Sedan' }
  ]),
  loadEngineData: jest.fn().mockResolvedValue([
    { engineName: 'Electric Engine' }
  ]),
  loadModificationData: jest.fn().mockResolvedValue({
    allModifications: []
  }),
  createVehicleObject: jest.fn().mockReturnValue({})
}));

// Mock the ModificationSelector component
jest.mock('../components/ModificationSelector', () => {
  return function MockModificationSelector() {
    return (
      <div className="modification-selector">
        <h2>Available Modifications</h2>
        <div className="mod-type-section">
          <h3>Test Modifications</h3>
          <ul>
            <li className="selected">
              <div className="mod-info">
                <span className="mod-name">Test Mod 1</span>
                <button disabled>Selected</button>
              </div>
            </li>
            <li>
              <div className="mod-info">
                <span className="mod-name">Test Mod 2</span>
                <div className="mod-level-selector">
                  <label>Level:</label>
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };
});

describe('VehicleConfigurator CSS', () => {
  test('renders with correct CSS classes', async () => {
    let container;
    
    await act(async () => {
      const renderResult = render(<VehicleConfigurator />);
      container = renderResult.container;
    });
    
    // Check that the main container has the correct class
    expect(container.querySelector('.vehicle-configurator')).toBeInTheDocument();
    
    // Check that config sections have the correct class
    expect(container.querySelectorAll('.config-section').length).toBeGreaterThan(0);
  });
});