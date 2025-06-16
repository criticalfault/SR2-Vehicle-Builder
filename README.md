# Shadowrun Vehicle Creator

A React-based static site for creating and customizing vehicles for Shadowrun 2. This application is a modern conversion of the original VB6 "Shop142s" program.

## Features

- Select from various chassis and engine types
- Add modifications to your vehicle
- Calculate vehicle statistics based on your selections
- Save and load vehicle designs

## Test Suite

The application includes a comprehensive test suite to ensure functionality and reliability:

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage
```

### Test Structure

- **Unit Tests**: Test individual components and utilities in isolation
- **Integration Tests**: Test interactions between components

#### Test Files

- **Utility Tests**:
  - `dataLoader.test.js`: Tests data loading from JSON files
  - `vehicleCalculator.test.js`: Tests vehicle statistics calculation logic

- **Component Tests**:
  - `ChassisSelector.test.js`: Tests chassis selection functionality
  - `EngineSelector.test.js`: Tests engine selection functionality
  - `ModificationList.test.js`: Tests modification management
  - `VehicleStats.test.js`: Tests statistics display

- **App Tests**:
  - `App.test.js`: Tests the main application component

## Deployment to AWS S3

This application is designed to be deployed as a static website on an AWS S3 bucket. Follow these steps to deploy:

### 1. Build the React Application

```bash
# Install dependencies
npm install

# Build the production version
npm run build
```

### 2. Create and Configure an S3 Bucket

1. Log in to the AWS Management Console
2. Navigate to S3 and create a new bucket
   - Choose a unique bucket name (e.g., `shadowrun-vehicle-creator`)
   - Select the region closest to your users
   - Uncheck "Block all public access" (since this will be a public website)
   - Acknowledge the warning about making the bucket public
   - Create the bucket

3. Enable Static Website Hosting
   - Go to the bucket properties
   - Scroll down to "Static website hosting" and click "Edit"
   - Select "Enable"
   - Set "Index document" to `index.html`
   - Set "Error document" to `index.html` (for SPA routing)
   - Save changes

4. Set Bucket Policy for Public Access
   - Go to the "Permissions" tab
   - Click "Bucket Policy"
   - Add the following policy (replace `your-bucket-name` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### 3. Upload the Build Files

1. Upload all files from the `build` directory to your S3 bucket
   - You can use the AWS Management Console, AWS CLI, or a tool like AWS Amplify

Using AWS CLI:
```bash
aws s3 sync build/ s3://your-bucket-name
```

### 4. Access Your Website

Your website will be available at:
```
http://your-bucket-name.s3-website-your-region.amazonaws.com
```

For example:
```
http://shadowrun-vehicle-creator.s3-website-us-east-1.amazonaws.com
```

## Development

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/criticalfault/SR2-Vehicle-Builder.git
cd shadowrun-vehicle-creator

# Install dependencies
npm install

# Start development server
npm start
```

### Development Workflow

1. Make changes to the code
2. Run tests to ensure functionality: `npm test`
3. Start the development server: `npm start`
4. View the application at `http://localhost:3000`

## Data Structure

The application uses JSON files to store vehicle data:

- `public/data/rigger2.json`: Contains chassis, engine, and modification data from the Rigger 2 sourcebook

## License

This project is open source and available under the MIT License.

## Acknowledgements

This application is based on the original "Shop142s" VB6 program for Shadowrun 2.