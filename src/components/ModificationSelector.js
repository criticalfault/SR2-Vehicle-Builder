import React, { useState } from 'react';
import '../styles/components/ModificationSelector.css';

const ModificationSelector = ({ modificationData, onAddModification }) => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [bookFilter, setBookFilter] = useState('All');
  
  // Get unique modification types and books for filtering
  const modTypes = ['All', ...new Set(modificationData.map(mod => mod.modType))];
  const books = ['All', ...new Set(modificationData.map(mod => mod.book))];
  
  // Filter modifications based on selected filters
  const filteredMods = modificationData.filter(mod => {
    const typeMatch = typeFilter === 'All' || mod.modType === parseInt(typeFilter);
    const bookMatch = bookFilter === 'All' || mod.book === bookFilter;
    return typeMatch && bookMatch;
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
        
        <div className="filter-group">
          <label htmlFor="mod-book-filter">Book:</label>
          <select 
            id="mod-book-filter" 
            value={bookFilter}
            onChange={(e) => setBookFilter(e.target.value)}
          >
            {books.map((book, index) => (
              <option key={index} value={book}>{book}</option>
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
              <span>Book: {mod.book}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModificationSelector;