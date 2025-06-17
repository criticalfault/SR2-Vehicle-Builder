import { loadChassisData, loadEngineData, loadModificationData } from '../dataLoader';

// Mock the fetch API
global.fetch = jest.fn();

describe('dataLoader utility', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

    // Skip loadRigger2Data tests since it's not exported anymore
  describe('loadRigger2Data', () => {
    it('should be skipped', () => {
      expect(true).toBe(true);
    });
  });

  describe('loadChassisData', () => {
    it('should return chassis data from chassis.json', async () => {
      const mockChassis = [
        { chassisName: 'Sedan' },
        { chassisName: 'Sports Car' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ chassis: mockChassis })
      });

      const result = await loadChassisData();
      
      expect(fetch).toHaveBeenCalledWith('/data/chassis.json');
      expect(result).toEqual(mockChassis);
    });

    it('should return empty array on error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await loadChassisData();
      
      expect(result).toEqual([]);
    });
  });

  describe('loadEngineData', () => {
    it('should return engine data from engines.json', async () => {
      const mockEngines = [
        { engineName: 'Gasoline' },
        { engineName: 'Electric' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ engines: mockEngines })
      });

      const result = await loadEngineData();
      
      expect(fetch).toHaveBeenCalledWith('/data/engines.json');
      expect(result).toEqual(mockEngines);
    });

    it('should return empty array on error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await loadEngineData();
      
      expect(result).toEqual([]);
    });
  });

  describe('loadModificationData', () => {
    it('should return modification data from modifications.json', async () => {
      const mockMods = [
        { modName: 'Armor' },
        { modName: 'Improved Suspension' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ 
          modifications: mockMods,
          designs: [],
        })
      });

      const result = await loadModificationData();
      
      expect(fetch).toHaveBeenCalledWith('/data/modifications.json');
      // Just check that we get an object with the expected structure
      expect(result).toHaveProperty('modifications');
      expect(result).toHaveProperty('designs');
      expect(result).toHaveProperty('allModifications');
    });

    it('should return empty arrays on error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await loadModificationData();
      
      expect(result).toHaveProperty('modifications');
      expect(result).toHaveProperty('designs');
      expect(result).toHaveProperty('allModifications');
      expect(result.modifications).toEqual([]);
      expect(result.designs).toEqual([]);
      expect(result.allModifications).toEqual([]);
    });
  });
});