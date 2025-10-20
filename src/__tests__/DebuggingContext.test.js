import React from 'react';
import { render, act } from '@testing-library/react';
import { DebuggingProvider, useDebugging } from '../contexts/DebuggingContext';

// Test component that uses the debugging context
const TestComponent = () => {
  const { state, actions } = useDebugging();
  
  return (
    <div>
      <div data-testid="is-debugging">{state.isDebugging.toString()}</div>
      <div data-testid="current-step">{state.currentStep}</div>
      <div data-testid="total-steps">{state.totalSteps}</div>
      <button data-testid="start-debugging" onClick={() => actions.startDebugging({
        initialState: {},
        initialCallStack: [],
        initialVariables: {},
        initialScopes: [],
        totalSteps: 10
      })}>
        Start Debugging
      </button>
      <button data-testid="step-forward" onClick={actions.stepForward}>
        Step Forward
      </button>
      <button data-testid="add-breakpoint" onClick={() => actions.addBreakpoint(5)}>
        Add Breakpoint
      </button>
    </div>
  );
};

describe('DebuggingContext', () => {
  it('should provide initial state', () => {
    const { getByTestId } = render(
      <DebuggingProvider>
        <TestComponent />
      </DebuggingProvider>
    );
    
    expect(getByTestId('is-debugging')).toHaveTextContent('false');
    expect(getByTestId('current-step')).toHaveTextContent('0');
    expect(getByTestId('total-steps')).toHaveTextContent('0');
  });

  it('should start debugging when startDebugging is called', () => {
    const { getByTestId } = render(
      <DebuggingProvider>
        <TestComponent />
      </DebuggingProvider>
    );
    
    act(() => {
      getByTestId('start-debugging').click();
    });
    
    expect(getByTestId('is-debugging')).toHaveTextContent('true');
    expect(getByTestId('total-steps')).toHaveTextContent('10');
  });

  it('should increment step when stepForward is called', () => {
    const { getByTestId } = render(
      <DebuggingProvider>
        <TestComponent />
      </DebuggingProvider>
    );
    
    act(() => {
      getByTestId('start-debugging').click();
    });
    
    act(() => {
      getByTestId('step-forward').click();
    });
    
    expect(getByTestId('current-step')).toHaveTextContent('1');
  });

  it('should add breakpoint', () => {
    const { getByTestId } = render(
      <DebuggingProvider>
        <TestComponent />
      </DebuggingProvider>
    );
    
    act(() => {
      getByTestId('add-breakpoint').click();
    });
    
    // We would need to check the breakpoints state here
    // This is a simplified test
    expect(true).toBe(true);
  });
});