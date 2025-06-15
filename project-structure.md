# Shadowrun Vehicle Creator - Project Structure

```
shadowrun-vehicle-creator/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── data/
│       ├── chassis.json
│       ├── engines.json
│       └── modifications.json
├── src/
│   ├── App.js
│   ├── index.js
│   ├── components/
│   │   ├── Header.js
│   │   ├── VehicleForm.js
│   │   ├── ChassisSelector.js
│   │   ├── EngineSelector.js
│   │   ├── ModificationList.js
│   │   ├── ModificationSelector.js
│   │   ├── VehicleStats.js
│   │   └── SaveLoadButtons.js
│   ├── hooks/
│   │   └── useVehicle.js
│   ├── utils/
│   │   ├── dataLoader.js
│   │   ├── vehicleCalculator.js
│   │   └── exportUtils.js
│   └── styles/
│       ├── index.css
│       └── components/
│           ├── Header.css
│           ├── VehicleForm.css
│           └── ...
└── package.json
```