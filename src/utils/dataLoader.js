/**
 * Utility functions for loading data from JSON files
 */

// Helper function to parse the Rigger2.dat format
const parseRigger2Data = async () => {
  try {
    // In a real implementation, we would fetch the actual Rigger2.dat file
    // and parse it according to the format described in the file
    
    // For this example, we'll use the pre-processed JSON files
    const chassisResponse = await fetch('/data/chassis.json');
    const engineResponse = await fetch('/data/engines.json');
    const modificationResponse = await fetch('/data/modifications.json');
    
    if (!chassisResponse.ok || !engineResponse.ok || !modificationResponse.ok) {
      throw new Error('Failed to load data files');
    }
    
    const chassisData = await chassisResponse.json();
    const engineData = await engineResponse.json();
    const modificationData = await modificationResponse.json();
    
    return {
      chassis: chassisData.chassis,
      engines: engineData.engines,
      modifications: modificationData.modifications
    };
  } catch (error) {
    console.error('Error parsing Rigger2.dat:', error);
    return {
      chassis: [],
      engines: [],
      modifications: []
    };
  }
};

export const loadChassisData = async () => {
  try {
    const data = await parseRigger2Data();
    return data.chassis || [];
  } catch (error) {
    console.error('Error loading chassis data:', error);
    return [];
  }
};

export const loadEngineData = async () => {
  try {
    const data = await parseRigger2Data();
    return data.engines || [];
  } catch (error) {
    console.error('Error loading engine data:', error);
    return [];
  }
};

export const loadModificationData = async () => {
  try {
    const data = await parseRigger2Data();
    return data.modifications || [];
  } catch (error) {
    console.error('Error loading modification data:', error);
    return [];
  }
};