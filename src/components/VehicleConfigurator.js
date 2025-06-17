import React, { useState, useEffect } from 'react';
import '../styles/VehicleConfigurator.css';
import { 
  loadChassisData, 
  loadEngineData, 
  loadModificationData,
  createVehicleObject
} from '../utils/dataLoader';
import ModificationSelector from './ModificationSelector';
import { evaluateExpression } from '../utils/modificationLimits';

/**
 * Main component for configuring vehicles with modifications
 */
const VehicleConfigurator = () => {
  const [chassisData, setChassisData] = useState([]);
  const [engineData, setEngineData] = useState([]);
  const [modificationData, setModificationData] = useState({ allModifications: [] });
  const [selectedChassis, setSelectedChassis] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [selectedMods, setSelectedMods] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [globalVars, setGlobalVars] = useState({});

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const chassis = await loadChassisData();
        const engines = await loadEngineData();
        const mods = await loadModificationData();
        
        setChassisData(chassis || []);
        setEngineData(engines || []);
        setModificationData(mods || { allModifications: [] });
        
        // Set default selections
        if (chassis && chassis.length > 0) setSelectedChassis(chassis[0]);
        if (engines && engines.length > 0) setSelectedEngine(engines[0]);
      } catch (error) {
        console.error('Error loading data:', error);
        setChassisData([]);
        setEngineData([]);
        setModificationData({ allModifications: [] });
      }
    };
    
    loadData();
  }, []);

  // Update vehicle object when chassis or engine selection changes
  useEffect(() => {
    if (selectedChassis && selectedEngine) {
      const newVehicle = createVehicleObject(selectedChassis, selectedEngine);
      setVehicle(newVehicle);
      // Reset selected modifications when vehicle changes
      setSelectedMods([]);
      setGlobalVars({});
    }
  }, [selectedChassis, selectedEngine]);

  // Handle chassis selection
  const handleChassisSelect = (event) => {
    const chassisId = parseInt(event.target.value, 10);
    const chassis = chassisData.find(c => c.chassisType === chassisId);
    setSelectedChassis(chassis);
  };

  // Handle engine selection
  const handleEngineSelect = (event) => {
    const engineId = event.target.value;
    const engine = engineData.find(e => e.engineName === engineId);
    setSelectedEngine(engine);
  };

  // Handle modification selection
  const handleModificationSelect = (modification) => {
    // Check if the modification is already selected
    const existingModIndex = selectedMods.findIndex(
      mod => mod.modName === modification.modName
    );
    
    let updatedMods;
    if (existingModIndex >= 0) {
      // Update existing modification
      updatedMods = [...selectedMods];
      updatedMods[existingModIndex] = modification;
    } else {
      // Add new modification
      updatedMods = [...selectedMods, modification];
    }
    
    setSelectedMods(updatedMods);
    
    // Update global variables based on the modification expression
    if (modification.expr) {
      const updatedGlobals = { ...globalVars };
      
      // Extract global variable assignments from the expression
      // This is a simplified approach - in a real implementation you'd need
      // a more sophisticated parser
      const globalAssignments = modification.expr.match(/Global\.(\w+)\s*=\s*([^;]+)/g);
      
      if (globalAssignments) {
        globalAssignments.forEach(assignment => {
          const [varName, value] = assignment
            .replace('Global.', '')
            .split('=')
            .map(part => part.trim());
          
          // Evaluate the value in the context of the vehicle and modification
          const context = {
            ...vehicle,
            Level: modification.level || 0,
            Global: updatedGlobals,
            Local: {}
          };
          
          try {
            updatedGlobals[varName] = evaluateExpression(value, context);
          } catch (error) {
            console.error(`Error evaluating global assignment: ${assignment}`, error);
          }
        });
      }
      
      setGlobalVars(updatedGlobals);
    }
  };

  // Calculate vehicle stats with applied modifications
  const calculateVehicleStats = () => {
    if (!vehicle) return null;
    
    // Start with base vehicle stats
    const stats = { ...vehicle };
    const context = {
      ...stats,
      Global: { ...globalVars },
      Local: {}
    };
    
    // Apply modifications in order of priority
    const sortedMods = [...selectedMods].sort((a, b) => a.priority - b.priority);
    
    sortedMods.forEach(mod => {
      if (mod.expr) {
        // This is a simplified approach - in a real implementation you'd need
        // to parse and execute the expressions properly
        const lines = mod.expr.split(';');
        
        lines.forEach(line => {
          if (line.trim()) {
            try {
              // Handle assignments
              if (line.includes('+=')) {
                const [prop, valueExpr] = line.split('+=').map(part => part.trim());
                const value = evaluateExpression(valueExpr, context);
                if (value !== null) {
                  context[prop] = (context[prop] || 0) + value;
                }
              } else if (line.includes('*=')) {
                const [prop, valueExpr] = line.split('*=').map(part => part.trim());
                const value = evaluateExpression(valueExpr, context);
                if (value !== null) {
                  context[prop] = (context[prop] || 0) * value;
                }
              } else if (line.includes('=')) {
                const [prop, valueExpr] = line.split('=').map(part => part.trim());
                if (!prop.startsWith('Global.') && !prop.startsWith('Local.')) {
                  const value = evaluateExpression(valueExpr, context);
                  if (value !== null) {
                    context[prop] = value;
                  }
                }
              }
            } catch (error) {
              console.error(`Error evaluating expression line: ${line}`, error);
            }
          }
        });
      }
    });
    
    return context;
  };

  const vehicleStats = calculateVehicleStats();

  return (
    <div className="vehicle-configurator">
      <h1>Vehicle Configurator</h1>
      
      <div className="config-section">
        <h2>Select Chassis</h2>
        <select 
          value={selectedChassis?.chassisType || ''}
          onChange={handleChassisSelect}
        >
          {chassisData.map(chassis => (
            <option key={chassis.chassisName} value={chassis.chassisType}>
              {chassis.chassisName} (Type: {chassis.chassisType})
            </option>
          ))}
        </select>
      </div>
      
      <div className="config-section">
        <h2>Select Engine</h2>
        <select 
          value={selectedEngine?.engineName || ''}
          onChange={handleEngineSelect}
        >
          {engineData.map(engine => (
            <option key={engine.engineName} value={engine.engineName}>
              {engine.engineName}
            </option>
          ))}
        </select>
      </div>
      
      {vehicle && (
        <div className="config-section">
          <ModificationSelector
            allModifications={modificationData.allModifications}
            vehicle={vehicle}
            onModificationSelect={handleModificationSelect}
            selectedMods={selectedMods}
          />
        </div>
      )}
      
      {vehicleStats && (
        <div className="vehicle-stats">
          <h2>Vehicle Statistics</h2>
          <table>
            <tbody>
              <tr>
                <td>Chassis:</td>
                <td>{vehicleStats.Chassis.chassisName}</td>
              </tr>
              <tr>
                <td>Engine:</td>
                <td>{vehicleStats.Engine.engineName}</td>
              </tr>
              <tr>
                <td>Handling:</td>
                <td>{vehicleStats.Handling}</td>
              </tr>
              <tr>
                <td>Off-Road:</td>
                <td>{vehicleStats.OffRoad}</td>
              </tr>
              <tr>
                <td>Speed:</td>
                <td>{vehicleStats.Speed}</td>
              </tr>
              <tr>
                <td>Acceleration:</td>
                <td>{vehicleStats.Accel}</td>
              </tr>
              <tr>
                <td>Body:</td>
                <td>{vehicleStats.Body}</td>
              </tr>
              <tr>
                <td>Armour:</td>
                <td>{vehicleStats.Armour}</td>
              </tr>
              <tr>
                <td>Cargo Factor:</td>
                <td>{vehicleStats.CF}</td>
              </tr>
              <tr>
                <td>Cost:</td>
                <td>{vehicleStats.Cost}</td>
              </tr>
            </tbody>
          </table>
          
          <h3>Applied Modifications</h3>
          <ul>
            {selectedMods.map(mod => (
              <li key={mod.modName}>
                {mod.modName} {mod.level ? `(Level: ${mod.level})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VehicleConfigurator;