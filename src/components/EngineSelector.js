import React, { useState } from 'react';
import '../styles/components/EngineSelector.css';

const EngineSelector = ({ engineData, selectedEngine, onEngineSelect }) => {
  const [bookFilter, setBookFilter] = useState('All');
  
  // Get unique books for filtering
  const books = ['All', ...new Set(engineData.map(engine => engine.book))];
  
  // Filter engines based on selected book filter
  const filteredEngines = engineData.filter(engine => {
    return bookFilter === 'All' || engine.book === bookFilter;
  });

  return (
    <div className="engine-selector">
      <h2>Engine</h2>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="engine-book-filter">Book:</label>
          <select 
            id="engine-book-filter" 
            value={bookFilter}
            onChange={(e) => setBookFilter(e.target.value)}
          >
            {books.map((book, index) => (
              <option key={index} value={book}>{book}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="engine-list">
        {filteredEngines.map((engine, index) => (
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