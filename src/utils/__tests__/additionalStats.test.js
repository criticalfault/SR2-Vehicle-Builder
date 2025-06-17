const { calculateVehicleStats } = require('../vehicleCalculator');

describe('Additional Vehicle Stats Tests', () => {
  // Test data
  const testChassis = {
    chassisName: 'Test Chassis',
    chassisType: 1, // Ground vehicle
    cost: 100,
    handling: 3,
    offRoad: 4,
    body: 2,
    armour: 0,
    cf: 10,
    cfMax: 20,
    sensor: 2,
    setupTime: 5
  };

  const testEngine = {
    engineName: 'Electric Engine',
    cost: 50,
    speed: 100,
    speedMax: 120,
    accel: 10,
    accelMax: 15,
    load: 200,
    loadMax: 250,
    sig: 2,
    economy: 20,
    economyMax: 25,
    fuel: 100
  };

  it('should initialize additional stats correctly', () => {
    const vehicle = {
      chassis: testChassis,
      engine: testEngine,
      modifications: []
    };

    const stats = calculateVehicleStats(vehicle);
    
    expect(stats.sensor).toBe(2);
    expect(stats.setupTime).toBe(5);
    expect(stats.autonav).toBe(0);
    expect(stats.pilot).toBe(-1);
    expect(stats.security).toBe(0);
    expect(stats.military).toBe(0);
  });

  it('should apply modifications to additional stats', () => {
    const vehicle = {
      chassis: testChassis,
      engine: testEngine,
      modifications: [
        {
          modName: 'Autonav',
          priority: 1,
          level: 2,
          expr: 'Autonav = Level; Cost += Level : 5 10 50 150'
        },
        {
          modName: 'Remote-Control Interfaces',
          priority: 1,
          level: 0,
          expr: 'Pilot = 1; Cost += 25 * Body'
        },
        {
          modName: 'Sensor Upgrade',
          priority: 1,
          level: 3,
          expr: 'Sensor += Level; Cost += 20 * Level'
        }
      ]
    };

    const stats = calculateVehicleStats(vehicle);
    
    expect(stats.sensor).toBe(5); // 2 (base) + 3 (upgrade)
    expect(stats.autonav).toBe(2); // Set to level 2
    expect(stats.pilot).toBe(1); // Set to 1 by Remote-Control Interfaces
    expect(stats.cost).toBe(310); // 100 (chassis) + 50 (engine) + 10 (autonav level 2) + 50 (remote control) + 60 (sensor upgrade)
  });
});