import React from 'react';
import '../styles/components/VehicleStats.css';

const VehicleStats = ({ vehicle }) => {
  const { stats } = vehicle;

  return (
    <div className="vehicle-stats">
      <h2>Vehicle Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-group">
          <h3>Basic Stats</h3>
          <div className="stat-row">
            <span className="stat-label">Cost (DP):</span>
            <span className="stat-value">{stats.cost}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Body:</span>
            <span className="stat-value">{stats.body}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Armour:</span>
            <span className="stat-value">{stats.armour}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Handling:</span>
            <span className="stat-value">{stats.handling}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Off-Road:</span>
            <span className="stat-value">{stats.offRoad}</span>
          </div>
        </div>
        
        <div className="stat-group">
          <h3>Performance</h3>
          <div className="stat-row">
            <span className="stat-label">Speed:</span>
            <span className="stat-value">{stats.speed}/{stats.speedMax}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Acceleration:</span>
            <span className="stat-value">{stats.accel}/{stats.accelMax}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Economy:</span>
            <span className="stat-value">{stats.economy}/{stats.economyMax}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Signature:</span>
            <span className="stat-value">{stats.sig}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Fuel:</span>
            <span className="stat-value">{stats.fuel}</span>
          </div>
        </div>
        
        <div className="stat-group">
          <h3>Capacity</h3>
          <div className="stat-row">
            <span className="stat-label">CF:</span>
            <span className="stat-value">{stats.cf}/{stats.cfMax}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">CF Used:</span>
            <span className="stat-value">{stats.cfUsed}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">CF Left:</span>
            <span className="stat-value">{Math.max(0, stats.cfMax - stats.cfUsed)}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Load:</span>
            <span className="stat-value">{stats.load}/{stats.loadMax}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Load Used:</span>
            <span className="stat-value">{stats.loadUsed}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Load Left:</span>
            <span className="stat-value">{Math.max(0, stats.loadMax - stats.loadUsed)}</span>
          </div>
        </div>
        
        <div className="stat-group">
          <h3>Features</h3>
          <div className="stat-row">
            <span className="stat-label">Seating:</span>
            <span className="stat-value">{stats.seating || 'N/A'}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Entry:</span>
            <span className="stat-value">{stats.entry || 'N/A'}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Setup Time:</span>
            <span className="stat-value">{stats.setupTime}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">TOL Profile:</span>
            <span className="stat-value">{stats.tol}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Sensor:</span>
            <span className="stat-value">{stats.sensor || 0}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Autonav:</span>
            <span className="stat-value">{stats.autonav || 0}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Pilot:</span>
            <span className="stat-value">{stats.pilot === -1 ? 'None' : stats.pilot}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleStats;