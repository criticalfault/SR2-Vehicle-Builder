# Shadowrun Vehicle Creator - Project Structure

```
shadowrun-vehicle-creator/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── data/
│       ├── chassis.json        # Vehicle chassis data (converted from chassis.csv)
│       ├── engines.json       # Engine data with chassis compatibility (converted from engines.csv)
│       └── modifications.json # Vehicle modifications data
├── src/
│   ├── App.js                 # Main application component
│   ├── index.js               # Application entry point
│   ├── components/
│   │   ├── Header.js          # Application header
│   │   ├── VehicleForm.js     # Vehicle name input form
│   │   ├── ChassisSelector.js # Chassis selection component with type filtering
│   │   ├── EngineSelector.js  # Engine selection component with chassis compatibility filtering
│   │   ├── ModificationList.js # List of applied modifications
│   │   ├── ModificationSelector.js # Modification selection component with type filtering
│   │   ├── VehicleStats.js    # Vehicle statistics display
│   │   └── SaveLoadButtons.js # Save/load functionality
│   ├── utils/
│   │   ├── dataLoader.js      # Functions to load data from JSON files
│   │   └── vehicleCalculator.js # Vehicle statistics calculation logic
│   ├── styles/
│   │   ├── index.css          # Global styles
│   │   ├── App.css            # App component styles
│   │   └── components/        # Component-specific styles
│   │       ├── Header.css
│   │       ├── VehicleForm.css
│   │       └── ...
│   └── __tests__/             # App-level tests
│       └── App.test.js
├── .gitignore                 # Git ignore file
├── package.json               # Project dependencies and scripts
├── babel.config.js            # Babel configuration for tests
├── jest.config.js             # Jest testing configuration
└── README.md                  # Project documentation
```

## Key Features

- **Chassis-Engine Compatibility**: Engines are filtered based on the selected chassis
- **Type-based Filtering**: Chassis and modifications can be filtered by type
- **JSON Data Storage**: Vehicle data is stored in separate JSON files for easier management
- **Comprehensive Test Suite**: Unit and integration tests for components and utilities
- **Responsive Design**: Works on various screen sizes
- **Save/Load Functionality**: Save and load vehicle designs as JSON files