import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VehicleForm from './components/VehicleForm';
import ChassisSelector from './components/ChassisSelector';
import EngineSelector from './components/EngineSelector';
import ModificationList from './components/ModificationList';
import VehicleStats from './components/VehicleStats';
import SaveLoadButtons from './components/SaveLoadButtons';
import VehicleConfigurator from './components/VehicleConfigurator';
import ModificationSelector from './components/ModificationSelector';
import { loadChassisData, loadEngineData, loadModificationData } from './utils/dataLoader';
import { calculateVehicleStats } from './utils/vehicleCalculator';
import './styles/App.css';

function App() {
  const [chassisData, setChassisData] = useState([]);
  const [engineData, setEngineData] = useState([]);
  const [modificationData, setModificationData] = useState({ modifications: [], designs: [], allModifications: [] });
  const [loading, setLoading] = useState(true);
  
  const [vehicle, setVehicle] = useState({
    name: 'New Vehicle',
    chassis: null,
    engine: null,
    modifications: [],
    stats: {
      cost: 0,
      handling: 0,
      offRoad: 0,
      body: 0,
      armour: 0,
      cf: 0,
      cfMax: 0,
      cfUsed: 0,
      speed: 0,
      speedMax: 0,
      accel: 0,
      accelMax: 0,
      load: 0,
      loadMax: 0,
      loadUsed: 0,
      sig: 0,
      economy: 0,
      economyMax: 0,
      fuel: 0,
      seating: '',
      entry: '',
      setupTime: 0,
      tol: 'N'
    }
  });

  // Load data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const chassis = await loadChassisData();
        const engines = await loadEngineData();
        const mods = await loadModificationData();
        
        setChassisData(chassis);
        setEngineData(engines);
        setModificationData(mods);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Update vehicle stats whenever chassis, engine, or modifications change
  useEffect(() => {
    if (vehicle.chassis || vehicle.engine || vehicle.modifications.length > 0) {
      const updatedStats = calculateVehicleStats(vehicle);
      setVehicle(prev => ({ ...prev, stats: updatedStats }));
    }
  }, [vehicle.chassis, vehicle.engine, vehicle.modifications]);

  const handleNameChange = (name) => {
    setVehicle(prev => ({ ...prev, name }));
  };

  const handleChassisSelect = (chassis) => {
    // When changing chassis, reset the engine since it might not be compatible
    setVehicle(prev => ({ ...prev, chassis, engine: null }));
  };

  const handleEngineSelect = (engine) => {
    setVehicle(prev => ({ ...prev, engine }));
  };

  const handleAddModification = (mod) => {
    // Check if the modification is already in the list
    const existingModIndex = vehicle.modifications.findIndex(m => m.modName === mod.modName);
    
    if (existingModIndex >= 0) {
      // Update existing modification
      const updatedMods = [...vehicle.modifications];
      updatedMods[existingModIndex] = mod;
      
      setVehicle(prev => ({
        ...prev,
        modifications: updatedMods
      }));
    } else {
      // Add new modification
      setVehicle(prev => ({
        ...prev,
        modifications: [...prev.modifications, mod]
      }));
    }
  };

  const handleRemoveModification = (index) => {
    setVehicle(prev => ({
      ...prev,
      modifications: prev.modifications.filter((_, i) => i !== index)
    }));
  };

  const handleModificationLevelChange = (index, level) => {
    setVehicle(prev => {
      const updatedMods = [...prev.modifications];
      updatedMods[index] = { ...updatedMods[index], level };
      return { ...prev, modifications: updatedMods };
    });
  };

  const handleSaveVehicle = () => {
    const vehicleData = JSON.stringify(vehicle);
    const blob = new Blob([vehicleData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${vehicle.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadVehicle = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loadedVehicle = JSON.parse(e.target.result);
        setVehicle(loadedVehicle);
      } catch (error) {
        console.error('Error parsing vehicle file:', error);
        alert('Invalid vehicle file format');
      }
    };
    reader.readAsText(file);
  };

  if (loading) {
    return <div className="loading">Loading vehicle data...</div>;
  }

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <div className="left-panel">
          <VehicleForm 
            vehicleName={vehicle.name} 
            onNameChange={handleNameChange} 
          />
          <ChassisSelector 
            chassisData={chassisData} 
            selectedChassis={vehicle.chassis} 
            onChassisSelect={handleChassisSelect} 
          />
          <EngineSelector 
            engineData={engineData} 
            selectedEngine={vehicle.engine} 
            onEngineSelect={handleEngineSelect}
            selectedChassis={vehicle.chassis}
          />
        </div>
        <div className="right-panel">
          <VehicleStats vehicle={vehicle} />
          <SaveLoadButtons 
            onSave={handleSaveVehicle} 
            onLoad={handleLoadVehicle} 
          />
        </div>
      </div>
      <div className="modifications-panel">
        {vehicle.chassis && vehicle.engine && (
          <ModificationSelector
            allModifications={modificationData.allModifications || []}
            vehicle={{
              Chassis: vehicle.chassis,
              Engine: vehicle.engine,
              Handling: vehicle.chassis.handling,
              OffRoad: vehicle.chassis.offRoad,
              Body: vehicle.chassis.body,
              Armour: vehicle.chassis.armour || 0,
              CF: vehicle.chassis.cf,
              CFMax: vehicle.chassis.cfMax,
              Speed: vehicle.engine.speed || 0,
              SpeedMax: vehicle.engine.speedMax || 0,
              Accel: vehicle.engine.accel || 0,
              AccelMax: vehicle.engine.accelMax || 0,
              Load: vehicle.engine.load || 0,
              LoadMax: vehicle.engine.loadMax || 0,
              Cost: (vehicle.chassis.cost || 0) + (vehicle.engine.cost || 0)
            }}
            onModificationSelect={handleAddModification}
            selectedMods={vehicle.modifications}
          />
        )}
        <ModificationList 
          modifications={vehicle.modifications} 
          onRemoveModification={handleRemoveModification}
          onLevelChange={handleModificationLevelChange}
        />
      </div>
    </div>
  );
}

export default App;