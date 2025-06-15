/**
 * Utility functions for calculating vehicle statistics
 * 
 * This follows the order of operations from Rigger2.dat:
 * :
 * ^
 * *,/
 * +,-, &, |
 * ?, <<, >>
 * <, <=, ==, >=, >, !=
 * &&, ||
 * =, +=, -=, *=, /=
 */

// Simple expression evaluator for modification expressions
const evaluateExpression = (expr, context) => {
  // Replace variables with their values from context
  let evaluatedExpr = expr;
  
  // Handle basic operations
  Object.keys(context).forEach(key => {
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    evaluatedExpr = evaluatedExpr.replace(regex, context[key]);
  });
  
  // Handle special operators
  // ? (conditional), << (min), >> (max)
  evaluatedExpr = evaluatedExpr
    .replace(/(\w+)\s*\?\s*(\w+)/g, '($1 ? $2 : 0)')
    .replace(/(\w+)\s*<<\s*(\w+)/g, 'Math.min($1, $2)')
    .replace(/(\w+)\s*>>\s*(\w+)/g, 'Math.max($1, $2)');
  
  try {
    return eval(evaluatedExpr);
  } catch (error) {
    console.error(`Error evaluating expression: ${evaluatedExpr}`, error);
    return 0;
  }
};

// Evaluates modification expressions to update vehicle stats
const evaluateModExpression = (mod, vehicle) => {
  const stats = { ...vehicle.stats };
  const level = mod.level || 1;
  
  // Create context for expression evaluation
  const context = {
    Level: level,
    Handling: stats.handling,
    OffRoad: stats.offRoad,
    Body: stats.body,
    Armour: stats.armour,
    CF: stats.cf,
    CFMax: stats.cfMax,
    CFUsed: stats.cfUsed || 0,
    Speed: stats.speed,
    SpeedMax: stats.speedMax,
    Accel: stats.accel,
    AccelMax: stats.accelMax,
    Load: stats.load,
    LoadMax: stats.loadMax,
    LoadUsed: stats.loadUsed || 0,
    Sig: stats.sig,
    Economy: stats.economy,
    EconomyMax: stats.economyMax,
    Fuel: stats.fuel,
    Cost: stats.cost
  };
  
  // Simple expression parser for basic modification effects
  if (mod.expr) {
    const expressions = mod.expr.split(';').map(expr => expr.trim());
    
    expressions.forEach(expr => {
      if (expr.includes('=')) {
        const [statName, formula] = expr.split('=').map(part => part.trim());
        
        // Handle different assignment operators (=, +=, -=, *=, /=)
        let operator = '=';
        let actualStatName = statName;
        
        if (statName.endsWith('+=')) {
          operator = '+=';
          actualStatName = statName.slice(0, -2).trim();
        } else if (statName.endsWith('-=')) {
          operator = '-=';
          actualStatName = statName.slice(0, -2).trim();
        } else if (statName.endsWith('*=')) {
          operator = '*=';
          actualStatName = statName.slice(0, -2).trim();
        } else if (statName.endsWith('/=')) {
          operator = '/=';
          actualStatName = statName.slice(0, -2).trim();
        }
        
        // Evaluate the formula
        const result = evaluateExpression(formula, context);
        
        // Update the context for subsequent expressions
        switch (operator) {
          case '=':
            context[actualStatName] = result;
            break;
          case '+=':
            context[actualStatName] += result;
            break;
          case '-=':
            context[actualStatName] -= result;
            break;
          case '*=':
            context[actualStatName] *= result;
            break;
          case '/=':
            context[actualStatName] /= result;
            break;
        }
        
        // Update the appropriate stat in the stats object
        switch (actualStatName.toLowerCase()) {
          case 'cost':
            stats.cost = context.Cost;
            break;
          case 'cf':
            stats.cf = context.CF;
            break;
          case 'cfused':
            stats.cfUsed = context.CFUsed;
            break;
          case 'handling':
            stats.handling = context.Handling;
            break;
          case 'offroad':
            stats.offRoad = context.OffRoad;
            break;
          case 'body':
            stats.body = context.Body;
            break;
          case 'armour':
            stats.armour = context.Armour;
            break;
          case 'sig':
            stats.sig = context.Sig;
            break;
          case 'load':
            stats.load = context.Load;
            break;
          case 'loadused':
            stats.loadUsed = context.LoadUsed;
            break;
          case 'speed':
            stats.speed = context.Speed;
            break;
          case 'speedmax':
            stats.speedMax = context.SpeedMax;
            break;
          case 'accel':
            stats.accel = context.Accel;
            break;
          case 'accelmax':
            stats.accelMax = context.AccelMax;
            break;
          case 'economy':
            stats.economy = context.Economy;
            break;
          case 'economymax':
            stats.economyMax = context.EconomyMax;
            break;
          case 'fuel':
            stats.fuel = context.Fuel;
            break;
          case 'tol':
            stats.tol = result;
            break;
          default:
            break;
        }
      }
    });
  }
  
  return stats;
};

// Calculate all vehicle statistics based on chassis, engine, and modifications
export const calculateVehicleStats = (vehicle) => {
  let stats = {
    cost: 0,
    handling: 0,
    offRoad: 0,
    body: 0,
    armour: 0,
    cf: 0,
    cfMax: 0,
    cfUsed: 0,
    speed: 0,
    speedMax: 0,
    accel: 0,
    accelMax: 0,
    load: 0,
    loadMax: 0,
    loadUsed: 0,
    sig: 0,
    economy: 0,
    economyMax: 0,
    fuel: 0,
    seating: '',
    entry: '',
    setupTime: 0,
    tol: 'N'
  };
  
  // Apply chassis stats if available
  if (vehicle.chassis) {
    stats = {
      ...stats,
      cost: vehicle.chassis.cost || 0,
      handling: vehicle.chassis.handling || 0,
      offRoad: vehicle.chassis.offRoad || 0,
      body: vehicle.chassis.body || 0,
      armour: vehicle.chassis.armour || 0,
      cf: vehicle.chassis.cf || 0,
      cfMax: vehicle.chassis.cfMax || 0,
      seating: vehicle.chassis.seating || '',
      entry: vehicle.chassis.entry || '',
      setupTime: vehicle.chassis.setupTime || 0,
      tol: vehicle.chassis.tol || 'N'
    };
  }
  
  // Apply engine stats if available
  if (vehicle.engine) {
    stats = {
      ...stats,
      cost: stats.cost + (vehicle.engine.cost || 0),
      speed: vehicle.engine.speed || 0,
      speedMax: vehicle.engine.speedMax || 0,
      accel: vehicle.engine.accel || 0,
      accelMax: vehicle.engine.accelMax || 0,
      load: vehicle.engine.load || 0,
      loadMax: vehicle.engine.loadMax || 0,
      sig: vehicle.engine.sig || 0,
      economy: vehicle.engine.economy || 0,
      economyMax: vehicle.engine.economyMax || 0,
      fuel: vehicle.engine.fuel || 0
    };
  }
  
  // Apply modification effects in order of priority
  if (vehicle.modifications && vehicle.modifications.length > 0) {
    // Sort modifications by priority
    const sortedMods = [...vehicle.modifications].sort((a, b) => a.priority - b.priority);
    
    sortedMods.forEach(mod => {
      const updatedStats = evaluateModExpression(mod, { ...vehicle, stats });
      stats = { ...stats, ...updatedStats };
    });
  }
  
  return stats;
};