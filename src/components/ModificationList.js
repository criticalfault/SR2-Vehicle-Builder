import React from 'react';
import '../styles/components/ModificationList.css';

const ModificationList = ({ modifications, onRemoveModification, onLevelChange }) => {
  return (
    <div className="modification-list">
      <h2>Applied Modifications</h2>
      
      {modifications.length === 0 ? (
        <p className="no-mods">No modifications applied</p>
      ) : (
        <div className="applied-mods">
          {modifications.map((mod, index) => (
            <div key={index} className="applied-mod">
              <div className="mod-header">
                <span className="mod-name">{mod.modName}</span>
                <button 
                  className="remove-mod-btn"
                  onClick={() => onRemoveModification(index)}
                >
                  Remove
                </button>
              </div>
              
              <div className="mod-controls">
                <label htmlFor={`mod-level-${index}`}>{mod.label || 'Level'}:</label>
                <input
                  type="number"
                  id={`mod-level-${index}`}
                  min="1"
                  max={mod.limit || 10}
                  value={mod.level || 1}
                  onChange={(e) => onLevelChange(index, parseInt(e.target.value))}
                />
                <span className="mod-limit">
                  Max: {mod.limit || 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModificationList;