import React from 'react';
import '../styles/components/SaveLoadButtons.css';

const SaveLoadButtons = ({ onSave, onLoad }) => {
  return (
    <div className="save-load-buttons">
      <button className="save-button" onClick={onSave}>
        Save Vehicle
      </button>
      
      <div className="load-button-container">
        <label htmlFor="load-vehicle" className="load-button">
          Load Vehicle
        </label>
        <input
          type="file"
          id="load-vehicle"
          accept=".json"
          onChange={onLoad}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default SaveLoadButtons;