import React, { createContext, useContext, useReducer, useMemo } from 'react';

// Debugging context
const DebuggingContext = createContext();

// Initial debugging state
const initialState = {
  // Debugging execution state
  isDebugging: false,
  isPaused: false,
  currentStep: 0,
  totalSteps: 0,
  executionHistory: [],
  
  // Call stack information
  callStack: [],
  
  // Variable tracking
  variables: {},
  scopes: [],
  
  // Memory visualization
  memory: {
    heap: [],
    stack: []
  },
  
  // Breakpoints
  breakpoints: new Set(),
  conditionalBreakpoints: {},
  
  // Watch expressions
  watchExpressions: [],
  watchResults: {},
  
  // Current execution context
  currentLine: null,
  currentFunction: null,
  
  // Performance metrics
  metrics: {
    time: 0,
    memoryUsage: 0,
    operations: 0
  }
};

// Debugging reducer
function debuggingReducer(state, action) {
  switch (action.type) {
    case 'START_DEBUGGING':
      return {
        ...initialState,
        isDebugging: true,
        executionHistory: [action.payload.initialState],
        callStack: action.payload.initialCallStack || [],
        variables: action.payload.initialVariables || {},
        scopes: action.payload.initialScopes || [],
        totalSteps: action.payload.totalSteps || 0
      };
      
    case 'PAUSE_EXECUTION':
      return {
        ...state,
        isPaused: true,
        currentStep: action.payload.step
      };
      
    case 'RESUME_EXECUTION':
      return {
        ...state,
        isPaused: false
      };
      
    case 'STEP_FORWARD':
      const nextStep = Math.min(state.currentStep + 1, state.totalSteps - 1);
      return {
        ...state,
        currentStep: nextStep,
        isPaused: true,
        ...state.executionHistory[nextStep]
      };
      
    case 'STEP_BACKWARD':
      const prevStep = Math.max(state.currentStep - 1, 0);
      return {
        ...state,
        currentStep: prevStep,
        isPaused: true,
        ...state.executionHistory[prevStep]
      };
      
    case 'STEP_INTO':
      return {
        ...state,
        isPaused: true
      };
      
    case 'STEP_OVER':
      return {
        ...state,
        isPaused: true
      };
      
    case 'STEP_OUT':
      return {
        ...state,
        isPaused: true
      };
      
    case 'ADD_EXECUTION_STATE':
      return {
        ...state,
        executionHistory: [...state.executionHistory, action.payload.state],
        totalSteps: state.executionHistory.length + 1
      };
      
    case 'UPDATE_CALL_STACK':
      return {
        ...state,
        callStack: action.payload.callStack
      };
      
    case 'UPDATE_VARIABLES':
      return {
        ...state,
        variables: { ...state.variables, ...action.payload.variables }
      };
      
    case 'UPDATE_MEMORY':
      return {
        ...state,
        memory: {
          ...state.memory,
          ...action.payload.memory
        }
      };
      
    case 'ADD_BREAKPOINT':
      const newBreakpoints = new Set(state.breakpoints);
      newBreakpoints.add(action.payload.line);
      return {
        ...state,
        breakpoints: newBreakpoints
      };
      
    case 'REMOVE_BREAKPOINT':
      const updatedBreakpoints = new Set(state.breakpoints);
      updatedBreakpoints.delete(action.payload.line);
      return {
        ...state,
        breakpoints: updatedBreakpoints
      };
      
    case 'ADD_CONDITIONAL_BREAKPOINT':
      return {
        ...state,
        conditionalBreakpoints: {
          ...state.conditionalBreakpoints,
          [action.payload.line]: action.payload.condition
        }
      };
      
    case 'REMOVE_CONDITIONAL_BREAKPOINT':
      const updatedConditionalBreakpoints = { ...state.conditionalBreakpoints };
      delete updatedConditionalBreakpoints[action.payload.line];
      return {
        ...state,
        conditionalBreakpoints: updatedConditionalBreakpoints
      };
      
    case 'ADD_WATCH_EXPRESSION':
      return {
        ...state,
        watchExpressions: [...state.watchExpressions, action.payload.expression]
      };
      
    case 'REMOVE_WATCH_EXPRESSION':
      return {
        ...state,
        watchExpressions: state.watchExpressions.filter((_, i) => i !== action.payload.index)
      };
      
    case 'UPDATE_WATCH_RESULTS':
      return {
        ...state,
        watchResults: { ...state.watchResults, ...action.payload.results }
      };
      
    case 'UPDATE_METRICS':
      return {
        ...state,
        metrics: { ...state.metrics, ...action.payload.metrics }
      };
      
    case 'STOP_DEBUGGING':
      return {
        ...initialState
      };
      
    default:
      return state;
  }
}

// Debugging provider component
export const DebuggingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(debuggingReducer, initialState);
  
  // Action creators
  const actions = useMemo(() => ({
    startDebugging: (payload) => dispatch({ type: 'START_DEBUGGING', payload }),
    pauseExecution: (step) => dispatch({ type: 'PAUSE_EXECUTION', payload: { step } }),
    resumeExecution: () => dispatch({ type: 'RESUME_EXECUTION' }),
    stepForward: () => dispatch({ type: 'STEP_FORWARD' }),
    stepBackward: () => dispatch({ type: 'STEP_BACKWARD' }),
    stepInto: () => dispatch({ type: 'STEP_INTO' }),
    stepOver: () => dispatch({ type: 'STEP_OVER' }),
    stepOut: () => dispatch({ type: 'STEP_OUT' }),
    addExecutionState: (state) => dispatch({ type: 'ADD_EXECUTION_STATE', payload: { state } }),
    updateCallStack: (callStack) => dispatch({ type: 'UPDATE_CALL_STACK', payload: { callStack } }),
    updateVariables: (variables) => dispatch({ type: 'UPDATE_VARIABLES', payload: { variables } }),
    updateMemory: (memory) => dispatch({ type: 'UPDATE_MEMORY', payload: { memory } }),
    addBreakpoint: (line) => dispatch({ type: 'ADD_BREAKPOINT', payload: { line } }),
    removeBreakpoint: (line) => dispatch({ type: 'REMOVE_BREAKPOINT', payload: { line } }),
    addConditionalBreakpoint: (line, condition) => dispatch({ 
      type: 'ADD_CONDITIONAL_BREAKPOINT', 
      payload: { line, condition } 
    }),
    removeConditionalBreakpoint: (line) => dispatch({ 
      type: 'REMOVE_CONDITIONAL_BREAKPOINT', 
      payload: { line } 
    }),
    addWatchExpression: (expression) => dispatch({ 
      type: 'ADD_WATCH_EXPRESSION', 
      payload: { expression } 
    }),
    removeWatchExpression: (index) => dispatch({ 
      type: 'REMOVE_WATCH_EXPRESSION', 
      payload: { index } 
    }),
    updateWatchResults: (results) => dispatch({ 
      type: 'UPDATE_WATCH_RESULTS', 
      payload: { results } 
    }),
    updateMetrics: (metrics) => dispatch({ 
      type: 'UPDATE_METRICS', 
      payload: { metrics } 
    }),
    stopDebugging: () => dispatch({ type: 'STOP_DEBUGGING' })
  }), []);
  
  return (
    <DebuggingContext.Provider value={{ state, actions }}>
      {children}
    </DebuggingContext.Provider>
  );
};

// Custom hook for using the debugging context
export const useDebugging = () => {
  const context = useContext(DebuggingContext);
  if (!context) {
    throw new Error('useDebugging must be used within a DebuggingProvider');
  }
  return context;
};