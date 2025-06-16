import React, { useState } from 'react';
import '../styles/components/ModificationSelector.css';

const ModificationSelector = ({ modificationData, onAddModification }) => {
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Get unique modification types for filtering
  const modTypes = ['All', ...new Set(modificationData.map(mod => mod.modType))];
  
  // Filter modifications based on selected type filter
  const filteredMods = modificationData.filter(mod => {
    return typeFilter === 'All' || mod.modType === parseInt(typeFilter);
  });

  const handleAddMod = (mod) => {
    // Create a copy of the mod with level set to 1 by default
    const newMod = { ...mod, level: 1 };
    onAddModification(newMod);
  };

  return (
    <div className="modification-selector">
      <h2>Available Modifications</h2>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="mod-type-filter">Type:</label>
          <select 
            id="mod-type-filter" 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {modTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mod-list">
        {filteredMods.map((mod, index) => (
          <div 
            key={index} 
            className="mod-item"
            onClick={() => handleAddMod(mod)}
          >
            <div className="mod-name">{mod.modName}</div>
            <div className="mod-details">
              <span>Type: {mod.modType}</span>
              <span>Priority: {mod.priority}</span>
              <span>Limit: {mod.limit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModificationSelector;