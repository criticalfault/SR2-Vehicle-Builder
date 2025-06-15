import React from 'react';
import '../styles/components/VehicleForm.css';

const VehicleForm = ({ vehicleName, onNameChange }) => {
  return (
    <div className="vehicle-form">
      <div className="form-group">
        <label htmlFor="vehicle-name">Vehicle Name:</label>
        <input
          type="text"
          id="vehicle-name"
          value={vehicleName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter vehicle name"
        />
      </div>
    </div>
  );
};

export default VehicleForm;