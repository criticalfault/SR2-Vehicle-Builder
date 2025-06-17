const { evaluateExpression } = require('../vehicleCalculator');

describe('Debug Expression Tests', () => {
  it('should evaluate a simple expression', () => {
    const context = {
      Level: 2,
      Cost: 150,
      Body: 2
    };
    
    const expr = 'Cost += 50 * Level';
    console.log(`Evaluating: ${expr}`);
    const result = evaluateExpression(expr, context);
    console.log(`Result: ${result}`);
    
    expect(context.Cost).toBe(150); // Context should not be modified
  });
});