import ExpressionEvaluator from '../utils/ExpressionEvaluator';

describe('ExpressionEvaluator', () => {
  beforeEach(() => {
    // Reset the evaluator state before each test
    ExpressionEvaluator.variables = {};
    ExpressionEvaluator.functions = {};
  });

  it('should evaluate simple arithmetic expressions', () => {
    expect(ExpressionEvaluator.evaluate('2 + 3')).toBe(5);
    expect(ExpressionEvaluator.evaluate('10 - 4')).toBe(6);
    expect(ExpressionEvaluator.evaluate('6 * 7')).toBe(42);
    expect(ExpressionEvaluator.evaluate('15 / 3')).toBe(5);
  });

  it('should evaluate expressions with parentheses', () => {
    expect(ExpressionEvaluator.evaluate('(2 + 3) * 4')).toBe(20);
    expect(ExpressionEvaluator.evaluate('2 * (3 + 4)')).toBe(14);
  });

  it('should evaluate logical expressions', () => {
    expect(ExpressionEvaluator.evaluate('true && false')).toBe(false);
    expect(ExpressionEvaluator.evaluate('true || false')).toBe(true);
    expect(ExpressionEvaluator.evaluate('5 > 3')).toBe(true);
    expect(ExpressionEvaluator.evaluate('5 < 3')).toBe(false);
  });

  it('should handle variables', () => {
    ExpressionEvaluator.setVariables({ x: 10, y: 5 });
    expect(ExpressionEvaluator.evaluate('x + y')).toBe(15);
    expect(ExpressionEvaluator.evaluate('x * 2')).toBe(20);
  });

  it('should check conditions correctly', () => {
    const context = { i: 5, n: 10 };
    expect(ExpressionEvaluator.checkCondition('i < n', context)).toBe(true);
    expect(ExpressionEvaluator.checkCondition('i > n', context)).toBe(false);
  });

  it('should handle complex expressions', () => {
    ExpressionEvaluator.setVariables({ a: 2, b: 3, c: 4 });
    expect(ExpressionEvaluator.evaluate('a * b + c')).toBe(10);
    expect(ExpressionEvaluator.evaluate('a * (b + c)')).toBe(14);
  });

  it('should throw error for invalid expressions', () => {
    expect(() => ExpressionEvaluator.evaluate('2 +')).toThrow();
    expect(() => ExpressionEvaluator.evaluate('(2 + 3')).toThrow();
  });
});