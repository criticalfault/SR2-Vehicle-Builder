module.exports = {
  // The root of your source code, typically /src
  roots: ['<rootDir>/src'],
  
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Runs special logic, such as cleaning up components
  // when using React Testing Library
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js'
  ],
  
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  
  // Module file extensions for importing
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // Handle CSS imports in tests
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  
  // Increase timeout for tests
  testTimeout: 10000,
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};