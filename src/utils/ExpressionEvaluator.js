/**
 * Expression Evaluator for the Debugging System
 * 
 * This module provides a robust expression parser and evaluator that can:
 * - Parse and evaluate arithmetic and logical expressions
 * - Handle variables and custom functions
 * - Perform type checking and coercion
 * - Provide detailed error reporting
 */

class ExpressionEvaluator {
  constructor() {
    this.variables = {};
    this.functions = {};
    this.operators = {
      '+': { precedence: 1, associativity: 'left', fn: (a, b) => a + b },
      '-': { precedence: 1, associativity: 'left', fn: (a, b) => a - b },
      '*': { precedence: 2, associativity: 'left', fn: (a, b) => a * b },
      '/': { precedence: 2, associativity: 'left', fn: (a, b) => a / b },
      '%': { precedence: 2, associativity: 'left', fn: (a, b) => a % b },
      '^': { precedence: 3, associativity: 'right', fn: (a, b) => Math.pow(a, b) },
      '==': { precedence: 0, associativity: 'left', fn: (a, b) => a == b },
      '!=': { precedence: 0, associativity: 'left', fn: (a, b) => a != b },
      '<': { precedence: 0, associativity: 'left', fn: (a, b) => a < b },
      '>': { precedence: 0, associativity: 'left', fn: (a, b) => a > b },
      '<=': { precedence: 0, associativity: 'left', fn: (a, b) => a <= b },
      '>=': { precedence: 0, associativity: 'left', fn: (a, b) => a >= b },
      '&&': { precedence: -1, associativity: 'left', fn: (a, b) => a && b },
      '||': { precedence: -2, associativity: 'left', fn: (a, b) => a || b }
    };
  }

  /**
   * Set variables for evaluation
   * @param {Object} vars - Object containing variable names and values
   */
  setVariables(vars) {
    this.variables = { ...this.variables, ...vars };
  }

  /**
   * Set custom functions for evaluation
   * @param {Object} funcs - Object containing function names and implementations
   */
  setFunctions(funcs) {
    this.functions = { ...this.functions, ...funcs };
  }

  /**
   * Tokenize an expression string into tokens
   * @param {string} expression - The expression to tokenize
   * @returns {Array} - Array of tokens
   */
  tokenize(expression) {
    const tokens = [];
    let current = '';
    
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      
      if (/\s/.test(char)) {
        if (current) {
          tokens.push(this.createToken(current));
          current = '';
        }
        continue;
      }
      
      if (/[+\-*/%^()!=<>&|]/.test(char)) {
        if (current) {
          tokens.push(this.createToken(current));
          current = '';
        }
        
        // Handle multi-character operators
        if (i < expression.length - 1) {
          const twoChar = char + expression[i + 1];
          if (this.operators[twoChar]) {
            tokens.push({ type: 'operator', value: twoChar });
            i++;
            continue;
          }
        }
        
        if (this.operators[char]) {
          tokens.push({ type: 'operator', value: char });
        } else {
          tokens.push({ type: 'unknown', value: char });
        }
        continue;
      }
      
      current += char;
    }
    
    if (current) {
      tokens.push(this.createToken(current));
    }
    
    return tokens;
  }

  /**
   * Create a token from a string value
   * @param {string} value - The string value
   * @returns {Object} - Token object
   */
  createToken(value) {
    if (/^(true|false)$/.test(value)) {
      return { type: 'boolean', value: value === 'true' };
    }
    
    if (!isNaN(value)) {
      return { type: 'number', value: parseFloat(value) };
    }
    
    if (/^"[^"]*"$|^'[^']*'$/.test(value)) {
      return { type: 'string', value: value.slice(1, -1) };
    }
    
    return { type: 'identifier', value };
  }

  /**
   * Convert infix notation to postfix (Reverse Polish Notation)
   * @param {Array} tokens - Array of tokens
   * @returns {Array} - Postfix expression
   */
  toPostfix(tokens) {
    const output = [];
    const operatorStack = [];
    
    for (const token of tokens) {
      if (token.type === 'number' || token.type === 'string' || token.type === 'boolean' || token.type === 'identifier') {
        output.push(token);
      } else if (token.type === 'operator') {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1].type === 'operator' &&
          (
            (this.operators[token.value].associativity === 'left' && 
             this.operators[token.value].precedence <= this.operators[operatorStack[operatorStack.length - 1].value].precedence) ||
            (this.operators[token.value].associativity === 'right' && 
             this.operators[token.value].precedence < this.operators[operatorStack[operatorStack.length - 1].value].precedence)
          )
        ) {
          output.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token.value === '(') {
        operatorStack.push(token);
      } else if (token.value === ')') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].value !== '(') {
          output.push(operatorStack.pop());
        }
        if (operatorStack.length === 0) {
          throw new Error('Mismatched parentheses');
        }
        operatorStack.pop(); // Remove the '('
      }
    }
    
    while (operatorStack.length > 0) {
      const op = operatorStack.pop();
      if (op.value === '(' || op.value === ')') {
        throw new Error('Mismatched parentheses');
      }
      output.push(op);
    }
    
    return output;
  }

  /**
   * Evaluate a postfix expression
   * @param {Array} postfix - Postfix expression
   * @returns {*} - Result of evaluation
   */
  evaluatePostfix(postfix) {
    const stack = [];
    
    for (const token of postfix) {
      if (token.type === 'number' || token.type === 'string' || token.type === 'boolean') {
        stack.push(token.value);
      } else if (token.type === 'identifier') {
        if (this.variables.hasOwnProperty(token.value)) {
          stack.push(this.variables[token.value]);
        } else if (this.functions.hasOwnProperty(token.value)) {
          // Handle function calls
          stack.push({ type: 'function', name: token.value });
        } else {
          throw new Error(`Undefined variable: ${token.value}`);
        }
      } else if (token.type === 'operator') {
        if (stack.length < 2) {
          throw new Error(`Not enough operands for operator: ${token.value}`);
        }
        
        const b = stack.pop();
        const a = stack.pop();
        const result = this.operators[token.value].fn(a, b);
        stack.push(result);
      }
    }
    
    if (stack.length !== 1) {
      throw new Error('Invalid expression');
    }
    
    return stack[0];
  }

  /**
   * Evaluate an expression string
   * @param {string} expression - The expression to evaluate
   * @returns {*} - Result of evaluation
   */
  evaluate(expression) {
    try {
      const tokens = this.tokenize(expression);
      const postfix = this.toPostfix(tokens);
      return this.evaluatePostfix(postfix);
    } catch (error) {
      throw new Error(`Evaluation error: ${error.message}`);
    }
  }

  /**
   * Check if a breakpoint condition is met
   * @param {string} condition - The condition expression
   * @param {Object} context - Variables context
   * @returns {boolean} - Whether the condition is met
   */
  checkCondition(condition, context = {}) {
    try {
      this.setVariables(context);
      const result = this.evaluate(condition);
      return Boolean(result);
    } catch (error) {
      console.error(`Condition evaluation error: ${error.message}`);
      return false;
    }
  }
}

// Export a singleton instance
export default new ExpressionEvaluator();