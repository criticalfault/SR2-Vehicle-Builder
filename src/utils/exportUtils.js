/**
 * Utility functions for exporting vehicle data
 */

/**
 * Exports vehicle data to HTML format
 * @param {Object} vehicle - The vehicle object to export
 * @returns {string} HTML representation of the vehicle
 */
export const exportToHtml = (vehicle) => {
  const { name, chassis, engine, modifications, stats } = vehicle;
  
  // Create HTML template
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Shadowrun Vehicle</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #222;
    }
    .vehicle-header {
      border-bottom: 2px solid #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
    }
    .stats-section {
      margin-bottom: 30px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .stat-group {
      margin-bottom: 20px;
    }
    .stat-group h3 {
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: 1px dotted #eee;
    }
    .modifications-section {
      margin-top: 30px;
    }
    .mod-item {
      background-color: #f5f5f5;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
    }
    .footer {
      margin-top: 40px;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="vehicle-header">
    <h1>${name}</h1>
    <p>
      <strong>Chassis:</strong> ${chassis ? chassis.chassisName : 'None'} | 
      <strong>Engine:</strong> ${engine ? engine.engineName : 'None'}
    </p>
  </div>
  
  <div class="stats-section">
    <h2>Vehicle Statistics</h2>
    
    <div class="stats-grid">
      <div class="stat-group">
        <h3>Basic Stats</h3>
        <div class="stat-row">
          <span>Cost (DP):</span>
          <span>${stats.cost}</span>
        </div>
        <div class="stat-row">
          <span>Body:</span>
          <span>${stats.body}</span>
        </div>
        <div class="stat-row">
          <span>Armour:</span>
          <span>${stats.armour}</span>
        </div>
        <div class="stat-row">
          <span>Handling:</span>
          <span>${stats.handling}</span>
        </div>
        <div class="stat-row">
          <span>Off-Road:</span>
          <span>${stats.offRoad}</span>
        </div>
      </div>
      
      <div class="stat-group">
        <h3>Performance</h3>
        <div class="stat-row">
          <span>Speed:</span>
          <span>${stats.speed}/${stats.speedMax}</span>
        </div>
        <div class="stat-row">
          <span>Acceleration:</span>
          <span>${stats.accel}/${stats.accelMax}</span>
        </div>
        <div class="stat-row">
          <span>Economy:</span>
          <span>${stats.economy}/${stats.economyMax}</span>
        </div>
        <div class="stat-row">
          <span>Signature:</span>
          <span>${stats.sig}</span>
        </div>
        <div class="stat-row">
          <span>Fuel:</span>
          <span>${stats.fuel}</span>
        </div>
      </div>
      
      <div class="stat-group">
        <h3>Capacity</h3>
        <div class="stat-row">
          <span>CF:</span>
          <span>${stats.cf}/${stats.cfMax}</span>
        </div>
        <div class="stat-row">
          <span>CF Used:</span>
          <span>${stats.cfUsed}</span>
        </div>
        <div class="stat-row">
          <span>CF Left:</span>
          <span>${Math.max(0, stats.cfMax - stats.cfUsed)}</span>
        </div>
        <div class="stat-row">
          <span>Load:</span>
          <span>${stats.load}/${stats.loadMax}</span>
        </div>
        <div class="stat-row">
          <span>Load Used:</span>
          <span>${stats.loadUsed}</span>
        </div>
        <div class="stat-row">
          <span>Load Left:</span>
          <span>${Math.max(0, stats.loadMax - stats.loadUsed)}</span>
        </div>
      </div>
      
      <div class="stat-group">
        <h3>Features</h3>
        <div class="stat-row">
          <span>Seating:</span>
          <span>${stats.seating || 'N/A'}</span>
        </div>
        <div class="stat-row">
          <span>Entry:</span>
          <span>${stats.entry || 'N/A'}</span>
        </div>
        <div class="stat-row">
          <span>Setup Time:</span>
          <span>${stats.setupTime}</span>
        </div>
        <div class="stat-row">
          <span>TOL Profile:</span>
          <span>${stats.tol}</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modifications-section">
    <h2>Modifications</h2>
    ${modifications.length === 0 ? '<p>No modifications applied</p>' : ''}
    ${modifications.map(mod => `
      <div class="mod-item">
        <h3>${mod.modName}</h3>
        <div class="stat-row">
          <span>${mod.label || 'Level'}:</span>
          <span>${mod.level || 1}</span>
        </div>
        <div class="stat-row">
          <span>Book:</span>
          <span>${mod.book || 'Unknown'}</span>
        </div>
      </div>
    `).join('')}
  </div>
  
  <div class="footer">
    <p>Created with Shadowrun Vehicle Creator</p>
  </div>
</body>
</html>
  `;
  
  return html;
};

/**
 * Triggers download of vehicle data as HTML file
 * @param {Object} vehicle - The vehicle object to export
 */
export const downloadHtmlExport = (vehicle) => {
  const html = exportToHtml(vehicle);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${vehicle.name.replace(/\s+/g, '_')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};