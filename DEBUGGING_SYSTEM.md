# Algorithm Debugging System

## Overview

The Algorithm Debugging System is a sophisticated debugging environment integrated into the AlgoVisualizer platform that provides real-time visualization of algorithm execution states, call stacks, variable tracking, and conditional breakpoints with step-through debugging capabilities.

## Features

### Advanced Execution State Tracking

- **Complete Call Stack Visualization**: See function calls, parameters, and return values
- **Real-time Variable State Tracking**: Monitor variable values with memory address representation
- **Pointer/Reference Tracking**: Visualize references for data structure algorithms
- **Scope-aware Variable Highlighting**: Highlight variables based on their scope during execution

### Interactive Debugging Controls

- **Conditional Breakpoints**: Set breakpoints with complex expression evaluation
- **Watch Expressions**: Monitor custom formulas and expressions
- **Standard Controls**: Step-over, Step-into, Step-out functionality
- **Reverse Execution**: Time-travel debugging to revisit prior states
- **Loop Controls**: Special controls for loop iterations and recursive calls

### Memory Visualization System

- **Real-time Heap/Stack Visualization**: See memory allocation and deallocation
- **Dynamic Data Structure Rendering**: Visualize linked lists, trees, and graphs
- **Memory Tracking**: Monitor allocation/deallocation patterns
- **Garbage Collection Visualization**: See when memory is freed
- **Cache Behavior Simulation**: Understand cache effects on performance

### Advanced UI Debugger Components

- **Split-screen Interface**: Code and visualization side-by-side
- **Interactive Memory Inspector**: Drill-down and search capabilities
- **Call Graph Visualization**: Performance metrics for function calls
- **Timeline Scrubbing**: Navigate execution history
- **Multi-threaded Visualization**: For parallel algorithm execution

### Expression Evaluation Engine

- **Complex Logical and Arithmetic Expressions**: Support for advanced expressions
- **Custom Variable and Function Evaluation**: Extensible evaluation system
- **Type Checking and Coercion Handling**: Robust type system
- **Error Reporting and Debugging Assistance**: Detailed error messages

## Technical Implementation

### Architecture

The debugging system is built with:

1. **React Context API**: For state management across components
2. **Expression Evaluator**: Custom parser for conditional breakpoints
3. **Debuggable Algorithm Runner**: Enhanced algorithm execution with debugging hooks
4. **WebAssembly Integration**: For performance-critical operations
5. **D3.js Visualizations**: For memory and call stack visualization

### Performance Considerations

- Minimize performance overhead during normal execution
- Provide real-time data synchronization between engine and UI
- Use efficient data structures for storing execution history
- Implement lazy loading for large data visualizations

## Educational Value

The debugging system enhances learning by:

- Providing deep understanding of algorithm execution mechanics
- Teaching real debugging techniques for complex algorithms
- Enhancing comprehension of memory management concepts
- Demonstrating advanced software engineering patterns
- Introducing compiler and interpreter design fundamentals
- Improving algorithm analysis and optimization skills

## Usage

### Enabling Debugging

1. Navigate to the Debuggable Sorting page at `/sorting/debug`
2. Select an algorithm from the dropdown
3. Check the "Enable Debugging" checkbox
4. Click "Start Sort" to begin debugging

### Using Debugging Controls

Once debugging is enabled, you can:

- **Step Forward/Backward**: Move through execution steps
- **Step Into/Over/Out**: Navigate function calls
- **Set Breakpoints**: Pause execution at specific lines
- **Add Watch Expressions**: Monitor variables and expressions

## Components

### Debugging Context (`DebuggingContext.jsx`)

Manages the global debugging state including:
- Execution state (running, paused, stopped)
- Call stack information
- Variable tracking
- Memory visualization data
- Breakpoints and watch expressions

### Debugging Controls (`DebuggingControls.jsx`)

Provides UI controls for:
- Starting/stopping debugging
- Step-through navigation
- Breakpoint management
- Watch expression management

### Call Stack Visualizer (`CallStackVisualizer.jsx`)

Visualizes the current call stack with:
- Function names and locations
- Parameter values
- Local variables
- Return values

### Variable Tracker (`VariableTracker.jsx`)

Tracks and displays variables with:
- Current scope variables
- Scoped variable hierarchies
- Type information

### Memory Visualizer (`MemoryVisualizer.jsx`)

Visualizes memory usage with:
- Stack memory blocks
- Heap memory blocks
- Memory metrics

### Expression Evaluator (`ExpressionEvaluator.js`)

Evaluates expressions for:
- Conditional breakpoints
- Watch expressions
- Variable computations

### Debuggable Algorithm Runner (`debuggableRunner.js`)

Enhanced algorithm runner with:
- Debugging hooks
- Execution state recording
- Call stack management
- Variable tracking

## Testing

The debugging system includes comprehensive tests for:
- Context state management
- Expression evaluation
- Algorithm execution with debugging
- UI component interactions

## Future Enhancements

Planned improvements include:
- Multi-threaded execution visualization
- Advanced performance profiling
- Code editor integration
- Remote debugging capabilities
- Plugin architecture for custom visualizations