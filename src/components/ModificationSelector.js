import React, { useState } from 'react';
import '../styles/components/ModificationSelector.css';

const ModificationSelector = ({ modificationData, onAddModification }) => {
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Get unique modification types for filtering
  //const modTypes = ['All', ...new Set(modificationData.map(mod => mod.modType))];
  
  // Filter modifications based on selected type filter
  const filteredMods = modificationData.filter(mod => {
    return typeFilter === 0 || mod.modType === parseInt(typeFilter);
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
            <option key={0} value={0}>All</option>
            <option key={1} value={1}>Design Options</option>
            <option key={2} value={2}>Engine Customization</option>
            <option key={3} value={3}>Control Systems</option>
            <option key={4} value={4}>Protective Systems</option>
            <option key={5} value={5}>Signature</option>
            <option key={6} value={6}>Weapon Mounts</option>
            <option key={7} value={7}>Electronic Systems</option>
            <option key={8} value={8}>Accessories</option>
            <option key={9} value={9}>Other</option>
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