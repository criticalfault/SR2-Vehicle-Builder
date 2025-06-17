/**
 * Utility functions to load and process vehicle data
 */

/**
 * Loads chassis data from JSON
 * @returns {Promise<Array>} - Array of chassis objects
 */
export const loadChassisData = async () => {
  try {
    const response = await fetch('/data/chassis.json');
    const data = await response.json();
    return data.chassis;
  } catch (error) {
    console.error('Error loading chassis data:', error);
    return [];
  }
};

/**
 * Loads engine data from JSON
 * @returns {Promise<Array>} - Array of engine objects
 */
export const loadEngineData = async () => {
  try {
    const response = await fetch('/data/engines.json');
    const data = await response.json();
    return data.engines;
  } catch (error) {
    console.error('Error loading engine data:', error);
    return [];
  }
};

/**
 * Loads modification data from JSON
 * @returns {Promise<Object>} - Object containing modifications and designs
 */
export const loadModificationData = async () => {
  try {
    const response = await fetch('/data/modifications.json');
    const data = await response.json();
    
    // Combine modifications and designs into a single array with proper types
    const allModifications = [
      ...data.modifications,
      ...data.designs
    ];
    
    return {
      modifications: data.modifications,
      designs: data.designs,
      allModifications
    };
  } catch (error) {
    console.error('Error loading modification data:', error);
    return { modifications: [], designs: [], allModifications: [] };
  }
};

/**
 * Creates a vehicle object from selected chassis and engine
 * @param {Object} chassis - Selected chassis
 * @param {Object} engine - Selected engine
 * @returns {Object} - Vehicle object with combined properties
 */
export const createVehicleObject = (chassis, engine) => {
  // Map chassis properties to the format expected by the limit expressions
  return {
    Chassis: {
      ...chassis,
      ChassisType: chassis.chassisType,
      ChassisName: chassis.chassisName,
      Handling: chassis.handling,
      OffRoad: chassis.offRoad,
      Body: chassis.body
    },
    Engine: {
      ...engine,
      EngineName: engine.engineName
    },
    // Add other vehicle properties that might be referenced in limit expressions
    Handling: chassis.handling,
    OffRoad: chassis.offRoad,
    Body: chassis.body,
    Armour: chassis.armour || 0,
    CF: chassis.cf,
    CFMax: chassis.cfMax,
    Autonav: chassis.autonav,
    Pilot: chassis.pilot,
    Sensor: chassis.sensor,
    Speed: engine.speed || 0,
    SpeedMax: engine.speedMax || 0,
    Accel: engine.accel || 0,
    AccelMax: engine.accelMax || 0,
    Load: engine.load || 0,
    LoadMax: engine.loadMax || 0,
    Economy: engine.economy || 0,
    EconomyMax: engine.economyMax || 0,
    TOL: chassis.tol || 'N',
    Cost: chassis.cost + engine.cost
  };
};