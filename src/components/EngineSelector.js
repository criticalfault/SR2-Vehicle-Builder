import React from 'react';
import '../styles/components/EngineSelector.css';

const EngineSelector = ({ engineData, selectedEngine, onEngineSelect }) => {
  return (
    <div className="engine-selector">
      <h2>Engine</h2>
      
      <div className="engine-list">
        {engineData.map((engine, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default EngineSelector;