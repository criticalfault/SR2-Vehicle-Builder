import React, { useState } from 'react';
import '../styles/components/ChassisSelector.css';

const ChassisSelector = ({ chassisData, selectedChassis, onChassisSelect }) => {
  const [filter, setFilter] = useState('All');
  
  // Get unique chassis types for filtering
  const chassisTypes = ['All', ...new Set(chassisData.map(chassis => chassis.chassisType))];
  
  // Filter chassis based on selected type filter
  const filteredChassis = chassisData.filter(chassis => {
    return filter === 'All' || chassis.chassisType === parseInt(filter);
  });

  return (
    <div className="chassis-selector">
      <h2>Chassis</h2>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="chassis-type-filter">Type:</label>
          <select 
            id="chassis-type-filter" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {chassisTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="chassis-list">
        {filteredChassis.map((chassis, index) => (
          <div 
            key={index} 
            className={`chassis-item ${selectedChassis && selectedChassis.chassisName === chassis.chassisName ? 'selected' : ''}`}
            onClick={() => onChassisSelect(chassis)}
          >
            <div className="chassis-name">{chassis.chassisName}</div>
            <div className="chassis-details">
              <span>Body: {chassis.body}</span>
              <span>Handling: {chassis.handling}/{chassis.offRoad}</span>
              <span>CF: {chassis.cf}/{chassis.cfMax}</span>
              <span>Cost: {chassis.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChassisSelector;