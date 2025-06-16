/**
 * Utility functions for loading data from JSON files
 */

// Load data from the rigger2.json file
export const loadRigger2Data = async () => {
  try {
    const response = await fetch('/data/rigger2.json');
    if (!response.ok) {
      throw new Error('Failed to load Rigger 2 data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading Rigger 2 data:', error);
    return {
      chassis: [],
      engines: [],
      modifications: []
    };
  }
};

export const loadChassisData = async () => {
  try {
    const response = await fetch('/data/chassis.json');
    if (!response.ok) {
      throw new Error('Failed to load chassis data');
    }
    const data = await response.json();
    return data.chassis || [];
  } catch (error) {
    console.error('Error loading chassis data:', error);
    return [];
  }
};

export const loadEngineData = async () => {
  try {
    const response = await fetch('/data/engines.json');
    if (!response.ok) {
      throw new Error('Failed to load engine data');
    }
    const data = await response.json();
    return data.engines || [];
  } catch (error) {
    console.error('Error loading engine data:', error);
    return [];
  }
};

export const loadModificationData = async () => {
  try {
    const response = await fetch('/data/modifications.json');
    if (!response.ok) {
      throw new Error('Failed to load modification data');
    }
    const data = await response.json();
    return data.modifications || [];
  } catch (error) {
    console.error('Error loading modification data:', error);
    return [];
  }
};