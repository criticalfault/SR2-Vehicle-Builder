import { createVehicleObject } from '../utils/dataLoader';

// Mock fetch for the async loading functions
global.fetch = jest.fn();

describe('dataLoader utility', () => {
  describe('createVehicleObject', () => {
    test('should combine chassis and engine properties correctly', () => {
      const chassis = {
        chassisType: 17,
        chassisName: 'Scooter',
        handling: 3,
        offRoad: 6,
        body: 2,
        armour: 0,
        cf: 0,
        cfMax: 1,
        autonav: 0,
        pilot: -1,
        sensor: 0,
        seating: '1b',
        entry: 'o',
        setupTime: 0,
        tol: 'N',
        cost: 30
      };
      
      const engine = {
        engineName: 'Electric Engine',
        speed: 50,
        speedMax: 70,
        accel: 10,
        accelMax: 15,
        load: 100,
        loadMax: 150,
        economy: 20,
        economyMax: 25,
        cost: 50
      };
      
      const vehicle = createVehicleObject(chassis, engine);
      
      // Check that properties are correctly mapped
      expect(vehicle.Chassis.ChassisType).toBe(17);
      expect(vehicle.Chassis.ChassisName).toBe('Scooter');
      expect(vehicle.Engine.EngineName).toBe('Electric Engine');
      
      // Check that vehicle-level properties are set
      expect(vehicle.Handling).toBe(3);
      expect(vehicle.OffRoad).toBe(6);
      expect(vehicle.Body).toBe(2);
      expect(vehicle.Speed).toBe(50);
      expect(vehicle.SpeedMax).toBe(70);
      
      // Check that cost is combined
      expect(vehicle.Cost).toBe(80);
    });
    
    test('should handle missing properties gracefully', () => {
      const chassis = {
        chassisType: 1,
        chassisName: 'Basic Chassis',
        handling: 4,
        body: 3,
        cost: 20
      };
      
      const engine = {
        engineName: 'Basic Engine',
        cost: 30
      };
      
      const vehicle = createVehicleObject(chassis, engine);
      
      // Check that missing properties default to 0 or empty values
      expect(vehicle.OffRoad).toBeUndefined();
      expect(vehicle.Speed).toBe(0);
      expect(vehicle.SpeedMax).toBe(0);
      expect(vehicle.Cost).toBe(50);
    });
  });
});