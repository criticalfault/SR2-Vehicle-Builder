const { evaluateRightSide } = require('../vehicleCalculator');

describe('Debug RightSide Tests', () => {
  it('should evaluate a simple expression', () => {
    const context = {
      Level: 2,
      Cost: 150,
      Body: 2
    };
    
    const formula = '50 * Level';
    console.log(`Evaluating: ${formula}`);
    const result = evaluateRightSide(formula, context);
    console.log(`Result: ${result}`);
    
    expect(result).toBe(100);
  });
});