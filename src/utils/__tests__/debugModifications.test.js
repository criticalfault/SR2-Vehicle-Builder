const { calculateVehicleStats } = require('../vehicleCalculator');

describe('Debug Modification Tests', () => {
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

  it('should apply standard armour modification correctly', () => {
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

    console.log('Before calculation:', JSON.stringify(vehicle, null, 2));
    const stats = calculateVehicleStats(vehicle);
    console.log('After calculation:', JSON.stringify(stats, null, 2));
    
    expect(stats.cost).toBe(250); // 150 base + 100 for armour
    expect(stats.armour).toBe(2);
    expect(stats.loadUsed).toBe(40); // 2 * 2 * 5 * 2 = 40
  });
});