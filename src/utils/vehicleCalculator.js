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

// Enhanced expression evaluator for modification expressions
export const evaluateExpression = (expr, context) => {
  // Check if the expression contains an assignment operator
  if (expr.includes('+=') || expr.includes('-=') || expr.includes('*=') || expr.includes('/=') || expr.includes('=')) {
    // This is an assignment expression, we should only evaluate the right side
    return 0; // We'll handle assignments separately in evaluateModExpression
  }
  
  // Create a working copy of the expression
  let evaluatedExpr = expr;
  
  // Debug the input
  // console.log(`Original expression: ${expr}`);
  // console.log('Context:', JSON.stringify(context, (key, value) => {
  //   if (typeof value === 'object' && value !== null) {
  //     return Object.keys(value).length === 0 ? {} : value;
  //   }
  //   return value;
  // }, 2));
  
  // First, handle array notation for level-based values (e.g., "Level : 5 10 50 150")
  const arrayPattern = /(\w+(?:\.\w+)?)\s*:\s*([\d\s\.]+)/g;
  let match;
  const arrayMatches = [];
  while ((match = arrayPattern.exec(expr)) !== null) {
    arrayMatches.push({
      fullMatch: match[0],
      variable: match[1],
      valuesStr: match[2]
    });
  }
  
  // Process array matches
  for (const { fullMatch, variable, valuesStr } of arrayMatches) {
    const values = valuesStr.split(/\s+/).map(Number);
    
    // Get the variable value, handling nested properties
    let varValue = 0;
    if (variable.includes('.')) {
      const [obj, prop] = variable.split('.');
      varValue = context[obj] && context[obj][prop] !== undefined ? context[obj][prop] : 0;
    } else {
      varValue = context[variable] !== undefined ? context[variable] : 0;
    }
    
    const index = Math.min(Math.floor(varValue), values.length - 1);
    // Replace only this specific match
    evaluatedExpr = evaluatedExpr.replace(fullMatch, values[index]);
  }
  
  // Handle power operator (^) - JavaScript uses ** for power
  evaluatedExpr = evaluatedExpr.replace(/(\d+(?:\.\d+)?)\s*\^\s*(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');
  
  // Handle nested object properties (e.g., Engine.Cost, Global.EC)
  // We need to do this before basic variable replacement to avoid partial replacements
  const nestedPropsPattern = /([A-Za-z]+)\.([A-Za-z]+)/g;
  const nestedMatches = [];
  while ((match = nestedPropsPattern.exec(expr)) !== null) {
    nestedMatches.push({
      fullMatch: match[0],
      obj: match[1],
      prop: match[2]
    });
  }
  
  // Process nested property matches
  for (const { fullMatch, obj, prop } of nestedMatches) {
    if (context[obj] && context[obj][prop] !== undefined) {
      const value = context[obj][prop];
      // Use word boundary to ensure we only replace complete property references
      const regex = new RegExp(`\\b${fullMatch}\\b`, 'g');
      evaluatedExpr = evaluatedExpr.replace(regex, value);
    }
  }
  
  // Handle basic operations with direct context variables
  for (const key of Object.keys(context)) {
    // Skip objects to avoid replacing their names
    if (typeof context[key] !== 'object') {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      evaluatedExpr = evaluatedExpr.replace(regex, context[key]);
    }
  }
  
  // Handle special operators
  // ? (conditional), << (min), >> (max)
  evaluatedExpr = evaluatedExpr
    .replace(/(\d+(?:\.\d+)?)\s*\?\s*(\d+(?:\.\d+)?)/g, '($1 ? $2 : 0)')
    .replace(/([\w\.]+)\s*<<\s*([\w\.]+)/g, 'Math.min($1, $2)')
    .replace(/([\w\.]+)\s*>>\s*([\w\.]+)/g, 'Math.max($1, $2)');
  
  // Handle comparison operators with string values (e.g., "Engine.EngineName == 'Electric*'")
  evaluatedExpr = evaluatedExpr.replace(/(['"])([^'"]*)(\*)(\1)/g, '$1$2$1');
  
  // Debug the final expression
  // console.log(`Evaluating: ${evaluatedExpr}`);
  
  try {
    const result = eval(evaluatedExpr);
    // console.log(`Result: ${result}`);
    return result;
  } catch (error) {
    console.error(`Error evaluating expression: ${evaluatedExpr}`, error);
    return 0;
  }
};

// Helper function to evaluate the right side of an assignment expression
export const evaluateRightSide = (formula, context) => {
  // Create a working copy of the expression
  let evaluatedExpr = formula;
  
  // First, handle array notation for level-based values (e.g., "Level : 5 10 50 150")
  const arrayPattern = /(\w+(?:\.\w+)?)\s*:\s*([\d\s\.]+)/g;
  let match;
  const arrayMatches = [];
  while ((match = arrayPattern.exec(formula)) !== null) {
    arrayMatches.push({
      fullMatch: match[0],
      variable: match[1],
      valuesStr: match[2]
    });
  }
  
  // Process array matches
  for (const { fullMatch, variable, valuesStr } of arrayMatches) {
    const values = valuesStr.split(/\s+/).map(Number);
    
    // Get the variable value, handling nested properties
    let varValue = 0;
    if (variable.includes('.')) {
      const [obj, prop] = variable.split('.');
      varValue = context[obj] && context[obj][prop] !== undefined ? context[obj][prop] : 0;
    } else {
      varValue = context[variable] !== undefined ? context[variable] : 0;
    }
    
    const index = Math.min(Math.floor(varValue), values.length - 1);
    // Replace only this specific match
    evaluatedExpr = evaluatedExpr.replace(fullMatch, values[index]);
  }
  
  // Handle power operator (^) - JavaScript uses ** for power
  evaluatedExpr = evaluatedExpr.replace(/(\d+(?:\.\d+)?)\s*\^\s*(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');
  
  // Handle nested object properties (e.g., Engine.Cost, Global.EC)
  const nestedPropsPattern = /([A-Za-z]+)\.([A-Za-z]+)/g;
  const nestedMatches = [];
  while ((match = nestedPropsPattern.exec(formula)) !== null) {
    nestedMatches.push({
      fullMatch: match[0],
      obj: match[1],
      prop: match[2]
    });
  }
  
  // Process nested property matches
  for (const { fullMatch, obj, prop } of nestedMatches) {
    if (context[obj] && context[obj][prop] !== undefined) {
      const value = context[obj][prop];
      // Use word boundary to ensure we only replace complete property references
      const regex = new RegExp(`\\b${fullMatch}\\b`, 'g');
      evaluatedExpr = evaluatedExpr.replace(regex, value);
    }
  }
  
  // Handle basic operations with direct context variables
  for (const key of Object.keys(context)) {
    // Skip objects to avoid replacing their names
    if (typeof context[key] !== 'object') {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      evaluatedExpr = evaluatedExpr.replace(regex, context[key]);
    }
  }
  
  // Handle special operators
  // ? (conditional), << (min), >> (max)
  evaluatedExpr = evaluatedExpr
    .replace(/(\d+(?:\.\d+)?)\s*\?\s*(\d+(?:\.\d+)?)/g, '($1 ? $2 : 0)')
    .replace(/([\w\.]+)\s*<<\s*([\w\.]+)/g, 'Math.min($1, $2)')
    .replace(/([\w\.]+)\s*>>\s*([\w\.]+)/g, 'Math.max($1, $2)');
  
  // Handle comparison operators with string values (e.g., "Engine.EngineName == 'Electric*'")
  evaluatedExpr = evaluatedExpr.replace(/(['"])([^'"]*)(\*)(\1)/g, '$1$2$1');
  
  try {
    const result = eval(evaluatedExpr);
    return result;
  } catch (error) {
    console.error(`Error evaluating expression: ${evaluatedExpr}`, error);
    return 0;
  }
};

// Evaluates modification expressions to update vehicle stats
const evaluateModExpression = (mod, vehicle) => {
  const stats = { ...vehicle.stats };
  const level = mod.level || 1;
  
  // Debug mode check
  const debug = global.DEBUG_MODE === true;
  
  if (debug) {
    console.log(`\n=== Evaluating modification: ${mod.modName} (Level ${level}) ===`);
    console.log(`Initial stats:`, stats);
  }
  
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
    Cost: stats.cost,
    Sensor: stats.sensor || 0,
    SetupTime: stats.setupTime || 0,
    Autonav: stats.autonav || 0,
    Pilot: stats.pilot || -1,
    Security: stats.security || 0,
    Military: stats.military || 0,
    // Add engine and chassis context for expressions that reference them
    Engine: {
      ...vehicle.engine,
      Cost: vehicle.engine ? vehicle.engine.cost : 0,
      EngineName: vehicle.engine ? vehicle.engine.engineName : ''
    },
    Chassis: {
      ...vehicle.chassis,
      Cost: vehicle.chassis ? vehicle.chassis.cost : 0,
      ChassisName: vehicle.chassis ? vehicle.chassis.chassisName : '',
      ChassisType: vehicle.chassis ? vehicle.chassis.chassisType : 0
    },
    // Add global and local context objects for storing temporary values
    Global: vehicle.Global || {},
    Local: {}
  };
  
  if (debug) {
    console.log(`Initial context:`, {
      Level: context.Level,
      Cost: context.Cost,
      Armour: context.Armour,
      LoadUsed: context.LoadUsed,
      Handling: context.Handling,
      Body: context.Body,
      Sensor: context.Sensor,
      SetupTime: context.SetupTime,
      Autonav: context.Autonav,
      Pilot: context.Pilot,
      Engine: { Cost: context.Engine.Cost },
      Chassis: { Cost: context.Chassis.Cost }
    });
  }
  
  // Enhanced expression parser for modification effects
  if (mod.expr) {
    const expressions = mod.expr.split(';').map(expr => expr.trim()).filter(expr => expr !== '');
    
    if (debug) {
      console.log(`Expressions to evaluate:`, expressions);
    }
    
    for (const expr of expressions) {
      // Skip empty expressions
      if (!expr) continue;
      
      if (debug) {
        console.log(`\nProcessing expression: ${expr}`);
      }
      
      if (expr.includes('=')) {
        // Handle different assignment operators (=, +=, -=, *=, /=)
        let operator = '=';
        let actualStatName;
        let formula;
        
        if (expr.includes('+=')) {
          operator = '+=';
          [actualStatName, formula] = expr.split('+=').map(part => part.trim());
        } else if (expr.includes('-=')) {
          operator = '-=';
          [actualStatName, formula] = expr.split('-=').map(part => part.trim());
        } else if (expr.includes('*=')) {
          operator = '*=';
          [actualStatName, formula] = expr.split('*=').map(part => part.trim());
        } else if (expr.includes('/=')) {
          operator = '/=';
          [actualStatName, formula] = expr.split('/=').map(part => part.trim());
        } else {
          [actualStatName, formula] = expr.split('=').map(part => part.trim());
        }
        
        if (debug) {
          console.log(`Operator: ${operator}, Stat: ${actualStatName}, Formula: ${formula}`);
          console.log(`Current value of ${actualStatName}: ${context[actualStatName]}`);
        }
        
        // Evaluate the formula
        const result = evaluateRightSide(formula, context);
        
        if (debug) {
          console.log(`Formula result: ${result}`);
        }
        
        // Update the context for subsequent expressions
        switch (operator) {
          case '=':
            // Handle nested properties (e.g., Global.EC)
            if (actualStatName.includes('.')) {
              const [obj, prop] = actualStatName.split('.');
              if (!context[obj]) context[obj] = {};
              context[obj][prop] = result;
              if (debug) console.log(`Set ${obj}.${prop} = ${result}`);
            } else {
              context[actualStatName] = result;
              if (debug) console.log(`Set ${actualStatName} = ${result}`);
            }
            break;
          case '+=':
            if (actualStatName.includes('.')) {
              const [obj, prop] = actualStatName.split('.');
              if (!context[obj]) context[obj] = {};
              const oldValue = context[obj][prop] || 0;
              context[obj][prop] = oldValue + result;
              if (debug) console.log(`Updated ${obj}.${prop} from ${oldValue} to ${context[obj][prop]} (+= ${result})`);
            } else {
              const oldValue = context[actualStatName] || 0;
              context[actualStatName] = oldValue + result;
              if (debug) console.log(`Updated ${actualStatName} from ${oldValue} to ${context[actualStatName]} (+= ${result})`);
            }
            break;
          case '-=':
            if (actualStatName.includes('.')) {
              const [obj, prop] = actualStatName.split('.');
              if (!context[obj]) context[obj] = {};
              const oldValue = context[obj][prop] || 0;
              context[obj][prop] = oldValue - result;
              if (debug) console.log(`Updated ${obj}.${prop} from ${oldValue} to ${context[obj][prop]} (-= ${result})`);
            } else {
              const oldValue = context[actualStatName] || 0;
              context[actualStatName] = oldValue - result;
              if (debug) console.log(`Updated ${actualStatName} from ${oldValue} to ${context[actualStatName]} (-= ${result})`);
            }
            break;
          case '*=':
            if (actualStatName.includes('.')) {
              const [obj, prop] = actualStatName.split('.');
              if (!context[obj]) context[obj] = {};
              const oldValue = context[obj][prop] || 1;
              context[obj][prop] = oldValue * result;
              if (debug) console.log(`Updated ${obj}.${prop} from ${oldValue} to ${context[obj][prop]} (*= ${result})`);
            } else {
              const oldValue = context[actualStatName] || 1;
              context[actualStatName] = oldValue * result;
              if (debug) console.log(`Updated ${actualStatName} from ${oldValue} to ${context[actualStatName]} (*= ${result})`);
            }
            break;
          case '/=':
            if (actualStatName.includes('.')) {
              const [obj, prop] = actualStatName.split('.');
              if (!context[obj]) context[obj] = {};
              const oldValue = context[obj][prop] || 0;
              context[obj][prop] = oldValue / result;
              if (debug) console.log(`Updated ${obj}.${prop} from ${oldValue} to ${context[obj][prop]} (/= ${result})`);
            } else {
              const oldValue = context[actualStatName] || 0;
              context[actualStatName] = oldValue / result;
              if (debug) console.log(`Updated ${actualStatName} from ${oldValue} to ${context[actualStatName]} (/= ${result})`);
            }
            break;
        }
      }
    }
  }
  
  if (debug) {
    console.log(`\nFinal context values:`, {
      Cost: context.Cost,
      Armour: context.Armour,
      LoadUsed: context.LoadUsed,
      Handling: context.Handling,
      Speed: context.Speed,
      Accel: context.Accel,
      Sensor: context.Sensor,
      SetupTime: context.SetupTime,
      Autonav: context.Autonav,
      Pilot: context.Pilot
    });
  }
  
  // Update the stats object with the values from the context
  stats.cost = context.Cost;
  stats.cf = context.CF;
  stats.cfUsed = context.CFUsed;
  stats.handling = context.Handling;
  stats.offRoad = context.OffRoad;
  stats.body = context.Body;
  stats.armour = context.Armour;
  stats.sig = context.Sig;
  stats.load = context.Load;
  stats.loadUsed = context.LoadUsed;
  stats.speed = context.Speed;
  stats.speedMax = context.SpeedMax;
  stats.accel = context.Accel;
  stats.accelMax = context.AccelMax;
  stats.economy = context.Economy;
  stats.economyMax = context.EconomyMax;
  stats.fuel = context.Fuel;
  stats.tol = context.TOL || stats.tol;
  stats.sensor = context.Sensor;
  stats.setupTime = context.SetupTime;
  stats.autonav = context.Autonav;
  stats.pilot = context.Pilot;
  stats.security = context.Security;
  stats.military = context.Military;
  
  if (debug) {
    console.log(`Final stats:`, stats);
    console.log(`=== End of modification evaluation ===\n`);
  }
  
  // Update the Global context in the vehicle object
  if (vehicle.Global) {
    Object.assign(vehicle.Global, context.Global);
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
    tol: 'N',
    // Additional stats that might be set by modifications
    sensor: 0,
    pilot: -1,
    autonav: 0,
    security: 0,
    military: 0
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
      tol: vehicle.chassis.tol || 'N',
      sensor: vehicle.chassis.sensor || 0
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
    // Create a shared global context for modifications to use
    const globalContext = {
      EC: 0,      // Engine Customization points
      ECLevel: 0, // Engine Customization level
      ECCost: 0,  // Engine Customization cost
      DBW: 0,     // Drive-by-Wire points
      DBWLevel: 0, // Drive-by-Wire level
      ES: 0,      // EnviroSeal
      Rigged: 0   // Rigger Adaptation
    };
    
    // Create a working copy of the vehicle with the global context
    const workingVehicle = {
      ...vehicle,
      Global: globalContext
    };
    
    // Sort modifications by priority
    const sortedMods = [...vehicle.modifications].sort((a, b) => a.priority - b.priority);
    
    // Apply each modification in order
    for (const mod of sortedMods) {
      // Skip modifications with empty expressions
      if (!mod.expr) continue;
      
      // Update the stats in the working vehicle
      workingVehicle.stats = stats;
      
      // Apply the modification
      const updatedStats = evaluateModExpression(mod, workingVehicle);
      
      // Update the stats for the next modification
      stats = { ...updatedStats };
    }
  }
  
  // Round numerical values to avoid floating point issues
  Object.keys(stats).forEach(key => {
    if (typeof stats[key] === 'number') {
      stats[key] = Math.round(stats[key] * 100) / 100;
    }
  });
  
  return stats;
};