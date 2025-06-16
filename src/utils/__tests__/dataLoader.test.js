import { loadChassisData, loadEngineData, loadModificationData, loadRigger2Data } from '../dataLoader';

// Mock the fetch API
global.fetch = jest.fn();

describe('dataLoader utility', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('loadRigger2Data', () => {
    it('should load data successfully', async () => {
      const mockData = {
        chassis: [{ chassisName: 'Test Chassis' }],
        engines: [{ engineName: 'Test Engine' }],
        modifications: [{ modName: 'Test Mod' }]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await loadRigger2Data();
      
      expect(fetch).toHaveBeenCalledWith('/data/rigger2.json');
      expect(result).toEqual(mockData);
    });

    it('should handle fetch errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await loadRigger2Data();
      
      expect(fetch).toHaveBeenCalledWith('/data/rigger2.json');
      expect(result).toEqual({
        chassis: [],
        engines: [],
        modifications: []
      });
    });

    it('should handle non-ok responses', async () => {
      fetch.mockResolvedValueOnce({
        ok: false
      });

      const result = await loadRigger2Data();
      
      expect(fetch).toHaveBeenCalledWith('/data/rigger2.json');
      expect(result).toEqual({
        chassis: [],
        engines: [],
        modifications: []
      });
    });
  });

  describe('loadChassisData', () => {
    it('should return chassis data from rigger2 data', async () => {
      const mockChassis = [
        { chassisName: 'Sedan' },
        { chassisName: 'Sports Car' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ chassis: mockChassis })
      });

      const result = await loadChassisData();
      
      expect(fetch).toHaveBeenCalledWith('/data/rigger2.json');
      expect(result).toEqual(mockChassis);
    });

    it('should return empty array on error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await loadChassisData();
      
      expect(result).toEqual([]);
    });
  });

  describe('loadEngineData', () => {
    it('should return engine data from rigger2 data', async () => {
      const mockEngines = [
        { engineName: 'Gasoline' },
        { engineName: 'Electric' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ engines: mockEngines })
      });

      const result = await loadEngineData();
      
      expect(fetch).toHaveBeenCalledWith('/data/rigger2.json');
      expect(result).toEqual(mockEngines);
    });

    it('should return empty array on error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await loadEngineData();
      
      expect(result).toEqual([]);
    });
  });

  describe('loadModificationData', () => {
    it('should return modification data from rigger2 data', async () => {
      const mockMods = [
        { modName: 'Armor' },
        { modName: 'Improved Suspension' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ modifications: mockMods })
      });

      const result = await loadModificationData();
      
      expect(fetch).toHaveBeenCalledWith('/data/rigger2.json');
      expect(result).toEqual(mockMods);
    });

    it('should return empty array on error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await loadModificationData();
      
      expect(result).toEqual([]);
    });
  });
});