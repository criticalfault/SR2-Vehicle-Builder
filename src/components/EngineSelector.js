import React from 'react';
import '../styles/components/EngineSelector.css';

const EngineSelector = ({ engineData, selectedEngine, onEngineSelect, selectedChassis }) => {
  // Filter engines based on the selected chassis
  const filteredEngines = selectedChassis 
    ? engineData.filter(engine => engine.chassisName === selectedChassis.chassisName)
    : [];

  return (
    <div className="engine-selector">
      <h2>Engine</h2>
      
      {selectedChassis ? (
        <div className="engine-list">
          {filteredEngines.length > 0 ? (
            filteredEngines.map((engine, index) => (
              <div 
                key={index} 
                className={`engine-item ${selectedEngine && selectedEngine.engineName === engine.engineName ? 'selected' : ''}`}
                onClick={() => onEngineSelect(engine)}
              >
                <div className="engine-name">{engine.engineName}</div>
                <div className="engine-details">
                  <span>Speed: {engine.speed}/{engine.speedMax}</span>
                  <span>Accel: {engine.accel}/{engine.accelMax}</span>
                  <span>Load: {engine.load}/{engine.loadMax}</span>
                  <span>Cost: {engine.cost}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-engines">No compatible engines found for {selectedChassis.chassisName}</div>
          )}
        </div>
      ) : (
        <div className="no-chassis-selected">Select a chassis to view compatible engines</div>
      )}
    </div>
  );
};

export default EngineSelector;