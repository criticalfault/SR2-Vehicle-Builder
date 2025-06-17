const { calculateVehicleStats } = require('../vehicleCalculator');

describe('Modification Expression Tests', () => {
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

  it('should apply cost modifications correctly', () => {
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

    const stats = calculateVehicleStats(vehicle);
    
    // Base cost is 100 (chassis) + 50 (engine) = 150
    // Modification adds 50 * 2 = 100
    expect(stats.cost).toBe(250);
    expect(stats.armour).toBe(2);
    expect(stats.loadUsed).toBe(40); // Body (2) * Body (2) * 5 * Level (2) = 40
    expect(stats.handling).toBe(3.33); // 3 + 2/6 = 3.33
  });

  it('should handle Engine Customization correctly', () => {
    const vehicle = {
      chassis: testChassis,
      engine: testEngine,
      modifications: [
        {
          modName: 'Engine Customization',
          priority: 1,
          level: 2,
          expr: 'Global.EC = Level; Global.ECLevel = Level; Local.base = 0.75 + 0.5 * Level; Global.ECCost = Engine.Cost * Local.base; Cost += Global.ECCost'
        },
        {
          modName: 'Engine Customization: Speed',
          priority: 2,
          level: 1,
          expr: 'Global.EC -= Level; Speed += 30 * Level; Local.Max = Speed >> SpeedMax; SpeedMax = Local.Max * 1.75'
        }
      ]
    };

    const stats = calculateVehicleStats(vehicle);
    
    // Base cost is 100 (chassis) + 50 (engine) = 150
    // Engine Customization adds Engine.Cost (50) * (0.75 + 0.5 * 2) = 50 * 1.75 = 87.5
    expect(stats.cost).toBe(237.5);
    
    // Speed starts at 100, EC:Speed adds 30 * 1 = 30
    expect(stats.speed).toBe(130);
    
    // SpeedMax starts at 120, but Local.Max = max(130, 120) = 130, then 130 * 1.75 = 227.5
    expect(stats.speedMax).toBe(227.5);
  });

  it('should handle Drive-by-Wire correctly', () => {
    const vehicle = {
      chassis: testChassis,
      engine: testEngine,
      modifications: [
        {
          modName: 'Drive-by-Wire',
          priority: 1,
          level: 2,
          expr: 'Level > 0; Global.DBW = 10 ? 0; Global.DBWLevel = Level; Handling -= Level; Cost += Chassis.Cost * Math.pow(1.75, Level) - Chassis.Cost'
        },
        {
          modName: 'Drive-by-Wire: Accel',
          priority: 3,
          level: 1,
          expr: 'Global.DBWLevel -= Level; Accel += Level / 100 * Accel'
        }
      ]
    };

    const stats = calculateVehicleStats(vehicle);
    
    // Handling starts at 3, DBW subtracts 2
    expect(stats.handling).toBe(1);
    
    // Cost calculation: 100 + 50 (base) + (100 * 1.75^2 - 100) = 150 + 206.25 = 356.25
    expect(stats.cost).toBe(356.25);
    
    // Accel starts at 10, DBW:Accel adds 10 * 0.01 = 0.1
    expect(stats.accel).toBe(10.1);
  });

  it('should handle multiple modifications with shared global context', () => {
    const vehicle = {
      chassis: testChassis,
      engine: testEngine,
      modifications: [
        {
          modName: 'Engine Customization',
          priority: 1,
          level: 3,
          expr: 'Global.EC = Level; Global.ECLevel = Level; Local.base = 0.75 + 0.5 * Level; Global.ECCost = Engine.Cost * Local.base; Cost += Global.ECCost'
        },
        {
          modName: 'Engine Customization: Speed',
          priority: 2,
          level: 1,
          expr: 'Global.EC -= Level; Speed += 30 * Level; Local.Max = Speed >> SpeedMax; SpeedMax = Local.Max << SpeedMax * 1.75'
        },
        {
          modName: 'Engine Customization: Acceleration',
          priority: 2,
          level: 2,
          expr: 'Global.EC -= Level; Accel += 2 * Level; Local.Max = Accel >> AccelMax; AccelMax = Local.Max << AccelMax * 1.75'
        }
      ]
    };

    const stats = calculateVehicleStats(vehicle);
    
    // Global.EC should start at 3, then be reduced by 1 (Speed) and 2 (Accel), ending at 0
    
    // Speed starts at 100, EC:Speed adds 30 * 1 = 30
    expect(stats.speed).toBe(130);
    
    // Accel starts at 10, EC:Accel adds 2 * 2 = 4
    expect(stats.accel).toBe(14);
    
    // Cost calculation: 100 + 50 (base) + 50 * (0.75 + 0.5 * 3) = 150 + 112.5 = 262.5
    expect(stats.cost).toBe(262.5);
  });
});