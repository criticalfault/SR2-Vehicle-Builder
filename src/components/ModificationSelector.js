import React, { useState, useEffect } from 'react';
import '../styles/VehicleConfigurator.css';
import { getAvailableModifications, canApplyModification } from '../utils/modificationLimits';

/**
 * Component for selecting vehicle modifications with limit validation
 */
const ModificationSelector = ({ 
  allModifications, 
  vehicle, 
  onModificationSelect,
  selectedMods = []
}) => {
  const [availableMods, setAvailableMods] = useState([]);
  const [globalVars, setGlobalVars] = useState({});
  
  // Update available modifications when vehicle or globals change
  useEffect(() => {
    const updatedAvailableMods = getAvailableModifications(
      allModifications, 
      vehicle, 
      globalVars
    );
    setAvailableMods(updatedAvailableMods);
  }, [allModifications, vehicle, globalVars]);

  // Handle modification selection
  const handleModSelect = (modification, level = 1) => {
    // Create a copy of the modification with the selected level
    const modWithLevel = { ...modification, level };
    
    // Check if the modification can be applied with this level
    if (canApplyModification(modWithLevel, vehicle, globalVars)) {
      // Update global variables based on the modification
      const updatedGlobals = { ...globalVars };
      
      // Process expressions that set global variables
      if (modification.expr) {
        // This is simplified - in a real implementation you'd need to parse the expr
        // and extract global variable assignments
        if (modification.expr.includes('Global.EC =')) {
          updatedGlobals.EC = level;
        }
        if (modification.expr.includes('Global.DBW =')) {
          updatedGlobals.DBW = 10;
        }
        if (modification.expr.includes('Global.Rigged =')) {
          updatedGlobals.Rigged = 1;
        }
        // Add other global variable assignments as needed
      }
      
      setGlobalVars(updatedGlobals);
      onModificationSelect(modWithLevel);
    } else {
      alert(`Cannot apply ${modification.modName} at level ${level} due to limitations.`);
    }
  };

  // Group modifications by type for better organization
  const modsByType = availableMods.reduce((acc, mod) => {
    const type = mod.modType;
    if (!acc[type]) acc[type] = [];
    acc[type].push(mod);
    return acc;
  }, {});

  // Map modification types to readable names
  const modTypeNames = {
    1: "Design Modifications",
    2: "Engine Modifications",
    3: "Control Modifications",
    4: "Protection Modifications"
  };

  return (
    <div className="modification-selector">
      <h2>Available Modifications</h2>
      
      {Object.keys(modsByType).map(type => (
        <div key={type} className="mod-type-section">
          <h3>{modTypeNames[type] || `Type ${type} Modifications`}</h3>
          <ul>
            {modsByType[type].map(mod => {
              const isSelected = selectedMods.some(m => m.modName === mod.modName);
              
              return (
                <li key={mod.modName} className={isSelected ? 'selected' : ''}>
                  <div className="mod-info">
                    <span 
                      className="mod-name clickable" 
                      onClick={() => !isSelected && handleModSelect(mod)}
                      style={{ cursor: isSelected ? 'default' : 'pointer' }}
                    >
                      {mod.modName} {isSelected && '✓'}
                    </span>
                    
                    {mod.label && (
                      <div className="mod-level-selector">
                        <label>{mod.label}:</label>
                        <select 
                          onChange={(e) => handleModSelect(mod, parseInt(e.target.value, 10))}
                          value={selectedMods.find(m => m.modName === mod.modName)?.level || mod.level || 1}
                        >
                          {[...Array(10)].map((_, i) => {
                            const level = i + 1;
                            const modWithLevel = { ...mod, level };
                            const canApply = canApplyModification(modWithLevel, vehicle, globalVars);
                            
                            return (
                              <option 
                                key={level} 
                                value={level}
                                disabled={!canApply}
                              >
                                {level}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      
      {Object.keys(modsByType).length === 0 && (
        <p>No modifications available for this vehicle configuration.</p>
      )}
    </div>
  );
};

export default ModificationSelector;