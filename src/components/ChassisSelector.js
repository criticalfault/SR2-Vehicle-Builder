import React, { useState } from 'react';
import '../styles/components/ChassisSelector.css';

const ChassisSelector = ({ chassisData, selectedChassis, onChassisSelect }) => {
  const [filter, setFilter] = useState('All');
  
  // Get unique chassis types for filtering
  const chassisTypes = ['All', ...new Set(chassisData.map(chassis => chassis.chassisType))];
  
  // Filter chassis based on selected type filter
  const filteredChassis = chassisData.filter(chassis => {
    if(filter === 'Drones'){
      return chassis.pilot !== undefined && chassis.pilot !== -1
    }
    if(filter === 'Vehicles'){
      return chassis.pilot === undefined || chassis.pilot === -1
    }
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
             <option key={0} value="All">All</option>
             <option key={1} value="Drones">All Drones</option>
             <option key={2} value="Vehicles">All Vehicles</option>
             <option key={3} value={17}>Bikes</option>
             <option key={4} value={1}>Ground vehicles</option>
             <option key={5} value={2}>Water craft</option>
             <option key={6} value={4}>Hovercraft</option>
             <option key={7} value={8}>Aircraft</option>
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