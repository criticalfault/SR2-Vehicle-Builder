import React from 'react';
import { render, screen, within } from '@testing-library/react';
import VehicleStats from '../VehicleStats';

// Mock CSS imports
jest.mock('../../styles/components/VehicleStats.css', () => ({}));

describe('VehicleStats component', () => {
  const mockVehicle = {
    name: 'Test Vehicle',
    chassis: {
      chassisName: 'Sedan',
      handling: 4,
      offRoad: 8,
      body: 3,
      armour: 0,
      cf: 6,
      cfMax: 30,
      seating: '2b + 2b',
      entry: '2+1t',
      setupTime: 0,
      tol: 'N',
      cost: 50
    },
    engine: {
      engineName: 'Gasoline',
      speed: 100,
      speedMax: 160,
      accel: 8,
      accelMax: 14,
      load: 60,
      loadMax: 300,
      sig: 2,
      economy: 8,
      economyMax: 14,
      fuel: 60,
      cost: 25
    },
    stats: {
      cost: 75,
      handling: 4,
      offRoad: 8,
      body: 3,
      armour: 0,
      cf: 6,
      cfMax: 30,
      cfUsed: 2,
      speed: 100,
      speedMax: 160,
      accel: 8,
      accelMax: 14,
      load: 60,
      loadMax: 300,
      loadUsed: 20,
      sig: 2,
      economy: 8,
      economyMax: 14,
      fuel: 60,
      seating: '2b + 2b',
      entry: '2+1t',
      setupTime: 0,
      tol: 'N',
      sensor: 2,
      autonav: 1,
      pilot: -1,
      security: 0,
      military: 0
    }
  };

  it('renders the component with vehicle stats', () => {
    render(<VehicleStats vehicle={mockVehicle} />);

    expect(screen.getByText('Vehicle Statistics')).toBeInTheDocument();
    
    // Basic Stats
    expect(screen.getByText('Cost (DP):')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('Body:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    
    // Performance
    expect(screen.getByText('Speed:')).toBeInTheDocument();
    expect(screen.getByText('100/160')).toBeInTheDocument();
    expect(screen.getByText('Acceleration:')).toBeInTheDocument();
    
    // Use getAllByText for elements that appear multiple times
    const accelValues = screen.getAllByText('8/14');
    expect(accelValues.length).toBeGreaterThan(0);
    
    // Capacity
    expect(screen.getByText('CF:')).toBeInTheDocument();
    expect(screen.getByText('6/30')).toBeInTheDocument();
    expect(screen.getByText('CF Used:')).toBeInTheDocument();
    
    // Use getAllByText for elements that appear multiple times
    const cfUsedValues = screen.getAllByText('2');
    expect(cfUsedValues.length).toBeGreaterThan(0);
    
    expect(screen.getByText('CF Left:')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument(); // 30 - 2
    
    // Features
    expect(screen.getByText('Seating:')).toBeInTheDocument();
    expect(screen.getByText('2b + 2b')).toBeInTheDocument();
    expect(screen.getByText('Entry:')).toBeInTheDocument();
    expect(screen.getByText('2+1t')).toBeInTheDocument();
  });

  it('handles missing stats gracefully', () => {
    const vehicleWithMissingStats = {
      name: 'Incomplete Vehicle',
      stats: {
        cost: 50,
        body: 3,
        // Other stats missing
        cf: 0,
        cfMax: 0,
        speed: 0,
        speedMax: 0,
        accel: 0,
        accelMax: 0,
        load: 0,
        loadMax: 0,
        loadUsed: 0,
        cfUsed: 0,
        sig: 0,
        economy: 0,
        economyMax: 0,
        fuel: 0,
        seating: '',
        entry: '',
        setupTime: 0,
        tol: 'N',
        sensor: 0,
        autonav: 0,
        pilot: -1,
        security: 0,
        military: 0
      }
    };

    render(<VehicleStats vehicle={vehicleWithMissingStats} />);

    // Should still render without errors
    expect(screen.getByText('Vehicle Statistics')).toBeInTheDocument();
    expect(screen.getByText('Cost (DP):')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Body:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    
    // Missing stats should show default values
    expect(screen.getByText('CF:')).toBeInTheDocument();
    
    // Use getAllByText for elements that appear multiple times
    const zeroValues = screen.getAllByText('0/0');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it('calculates remaining capacity correctly', () => {
    render(<VehicleStats vehicle={mockVehicle} />);

    // CF Left should be cfMax - cfUsed
    expect(screen.getByText('CF Left:')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument(); // 30 - 2
    
    // Load Left should be loadMax - loadUsed
    expect(screen.getByText('Load Left:')).toBeInTheDocument();
    expect(screen.getByText('280')).toBeInTheDocument(); // 300 - 20
  });

  it('handles zero or negative remaining capacity', () => {
    const vehicleWithOverusedCapacity = {
      ...mockVehicle,
      stats: {
        ...mockVehicle.stats,
        cfUsed: 35, // More than cfMax
        loadUsed: 350 // More than loadMax
      }
    };

    render(<VehicleStats vehicle={vehicleWithOverusedCapacity} />);

    // CF Left should be 0 when cfUsed > cfMax
    expect(screen.getByText('CF Left:')).toBeInTheDocument();
    
    // Use getAllByText and check that at least one of them is in the CF Left row
    const cfLeftRow = screen.getByText('CF Left:').closest('.stat-row');
    const zeroInCfLeftRow = within(cfLeftRow).queryByText('0');
    expect(zeroInCfLeftRow).not.toBeNull();
    
    // Load Left should be 0 when loadUsed > loadMax
    expect(screen.getByText('Load Left:')).toBeInTheDocument();
    const loadLeftRow = screen.getByText('Load Left:').closest('.stat-row');
    const zeroInLoadLeftRow = within(loadLeftRow).queryByText('0');
    expect(zeroInLoadLeftRow).not.toBeNull();
  });

  it('displays the new stats correctly', () => {
    render(<VehicleStats vehicle={mockVehicle} />);

    // Check for Sensor
    expect(screen.getByText('Sensor:')).toBeInTheDocument();
    const sensorRow = screen.getByText('Sensor:').closest('.stat-row');
    expect(within(sensorRow).getByText('2')).toBeInTheDocument();

    // Check for Autonav
    expect(screen.getByText('Autonav:')).toBeInTheDocument();
    const autonavRow = screen.getByText('Autonav:').closest('.stat-row');
    expect(within(autonavRow).getByText('1')).toBeInTheDocument();

    // Check for Pilot
    expect(screen.getByText('Pilot:')).toBeInTheDocument();
    const pilotRow = screen.getByText('Pilot:').closest('.stat-row');
    expect(within(pilotRow).getByText('None')).toBeInTheDocument();
  });
});