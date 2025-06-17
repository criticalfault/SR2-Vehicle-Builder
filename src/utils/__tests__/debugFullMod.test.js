const { calculateVehicleStats } = require('../vehicleCalculator');

describe('Debug Full Modification Tests', () => {
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
    cfMax: 20
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

  it('should apply standard armour modification correctly with debug', () => {
    const vehicle = {
      chassis: testChassis,
      engine: testEngine,
      modifications: [
        {
          modName: 'Standard Armour',
          priority: 1,
          level: 2,
          expr: 'Armour += Level; LoadUsed += Body * Body * 5 * Level; Handling += Level / 6; Cost += 50 * Level'
        }
      ]
    };

    // Enable debug mode
    global.DEBUG_MODE = true;
    
    const stats = calculateVehicleStats(vehicle);
    
    // Disable debug mode
    global.DEBUG_MODE = false;
    
    expect(stats.cost).toBe(250); // 150 base + 100 for armour
  });
});