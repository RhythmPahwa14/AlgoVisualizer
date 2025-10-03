# User Input Feature Documentation

## Overview

The AlgoVisualizer now supports custom user input for all algorithm types, allowing users to visualize their own data instead of being limited to pre-defined demo data. This feature includes an enhanced input panel with validation, sample data, and multiple input methods.

## Features

### 🎯 Universal Input Panel
- **Text Input**: Direct typing with JSON or comma-separated format
- **File Upload**: Support for JSON, CSV, and TXT files
- **Sample Data**: Built-in examples for each algorithm type
- **Validation**: Real-time data validation with helpful error messages
- **Format Guidance**: Clear examples and format descriptions

### 📊 Supported Data Types

#### Arrays (Sorting & Searching)
- **Format**: JSON array or comma-separated values
- **Example**: `[64, 34, 25, 12, 22, 11, 90]` or `64, 34, 25, 12, 22`
- **Validation**: Numbers only, max 1000 elements
- **Auto-sorting**: Searching algorithms automatically sort input data

#### Graphs (BFS, DFS, Dijkstra, etc.)
- **Format**: JSON object with nodes and edges
- **Example**:
```json
{
  "nodes": [
    {"id": 0, "label": "A"},
    {"id": 1, "label": "B"},
    {"id": 2, "label": "C"}
  ],
  "edges": [
    {"id": "0-1", "from": 0, "to": 1, "weight": 5},
    {"id": "1-2", "from": 1, "to": 2, "weight": 3}
  ]
}
```
- **Validation**: Node/edge integrity, max 100 nodes
- **Auto-completion**: Missing labels and IDs are auto-generated

#### Trees (Binary Trees, BST, etc.)
- **Format**: JSON object with recursive structure
- **Example**:
```json
{
  "value": 8,
  "left": {"value": 3, "left": null, "right": null},
  "right": {"value": 10, "left": null, "right": null}
}
```
- **Validation**: Proper tree structure, max 20 levels deep

## How to Use

### Method 1: Text Input
1. Select the "Text Input" tab in the input panel
2. Enter your data in the provided format
3. Click "Load Data" to apply

### Method 2: File Upload
1. Select the "File Upload" tab
2. Choose a JSON, CSV, or TXT file
3. File content is automatically parsed and validated

### Method 3: Sample Data
1. Click "Preview Sample" to see example data
2. Click "Load Sample" to use pre-built examples
3. Click "Download" to save sample data as a file

## File Format Support

### JSON Files (.json)
- Universal format for all data types
- Structured data with full validation
- Best for complex graphs and trees

### CSV Files (.csv)
- Supported for array data only
- Simple comma-separated values
- Example: `64,34,25,12,22,11,90`

### Text Files (.txt)
- Flexible format based on data type
- Arrays: comma-separated or JSON
- Graphs/Trees: JSON format only

## Validation Rules

### Arrays
- ✅ Must be numeric values only
- ✅ Maximum 1000 elements
- ✅ No empty arrays
- ❌ Non-numeric values rejected

### Graphs
- ✅ Must have `nodes` and `edges` arrays
- ✅ Maximum 100 nodes
- ✅ All edge references must point to existing nodes
- ✅ Auto-generates missing IDs and labels
- ❌ Invalid node/edge references rejected

### Trees
- ✅ Must have `value` property for each node
- ✅ Maximum 20 levels deep
- ✅ Proper left/right structure
- ❌ Circular references rejected

## Sample Data Varieties

### Arrays
- **Small**: `[64, 34, 25, 12, 22, 11, 90]`
- **Medium**: 20 random elements
- **Large**: 50 random elements
- **Sorted**: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
- **Reverse**: `[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]`
- **Duplicates**: `[5, 3, 8, 3, 9, 1, 5, 8, 2, 5]`

### Graphs
- **Simple**: 5 nodes, basic connections
- **Complex**: 8 nodes, multiple paths
- **Weighted**: Includes edge weights for Dijkstra
- **Cycle**: Contains cycles for cycle detection

### Trees
- **Binary Search Tree**: Balanced BST example
- **Binary Tree**: Complete binary tree
- **Heap**: Max-heap structure

## Error Handling

### Common Errors and Solutions

| Error | Solution |
|-------|----------|
| "Invalid JSON format" | Check for missing quotes, commas, or brackets |
| "Array size cannot exceed 1000 elements" | Reduce array size |
| "Graph must contain 'nodes' and 'edges'" | Ensure both arrays are present |
| "Edge references unknown node" | Check that all edge `from`/`to` values exist in nodes |
| "Tree depth cannot exceed 20 levels" | Reduce tree depth |

### Success Indicators
- ✅ Green success message
- ✅ Data appears in visualization
- ✅ Algorithm controls become available

## Integration with Existing Features

### Backward Compatibility
- Legacy text inputs remain functional
- Existing functionality preserved
- Gradual migration path for users

### Export Integration
- Custom data can be exported with visualizations
- Recording features work with user data
- Snapshot feature captures custom visualizations

### Performance Optimization
- Input validation prevents performance issues
- Size limits ensure smooth animations
- Efficient parsing for large datasets

## Technical Implementation

### Components
- `InputPanel.jsx`: Main input component
- `sampleData.js`: Sample data definitions
- `InputPanel.css`: Styling and responsive design

### Data Flow
1. User enters data → Input validation
2. Validation passes → Data transformation
3. Data loaded → Algorithm visualization
4. Success feedback → Ready for execution

### Validation Architecture
- Type-specific validation functions
- Centralized error handling
- Consistent user feedback
- Extensible for new data types

## Future Enhancements

### Planned Features
- 🔄 Data format conversion tools
- 📝 Interactive data editor
- 🔗 URL sharing for custom data
- 📋 Clipboard integration
- 🎨 Visual data builder
- 📚 Community data library

### Performance Improvements
- Streaming for large datasets
- Background validation
- Progressive loading
- Caching frequently used data

## Usage Examples

### Sorting Your Own Data
```javascript
// Upload this as a JSON file or paste in text input
[45, 23, 67, 89, 12, 56, 78, 34, 91, 23]
```

### Custom Graph for Pathfinding
```json
{
  "nodes": [
    {"id": "start", "label": "Start"},
    {"id": "goal", "label": "Goal"},
    {"id": "checkpoint", "label": "Checkpoint"}
  ],
  "edges": [
    {"from": "start", "to": "checkpoint", "weight": 10},
    {"from": "checkpoint", "to": "goal", "weight": 5},
    {"from": "start", "to": "goal", "weight": 20}
  ]
}
```

### Binary Search Tree Data
```json
{
  "value": 50,
  "left": {
    "value": 30,
    "left": {"value": 20, "left": null, "right": null},
    "right": {"value": 40, "left": null, "right": null}
  },
  "right": {
    "value": 70,
    "left": {"value": 60, "left": null, "right": null},
    "right": {"value": 80, "left": null, "right": null}
  }
}
```

---

This feature significantly enhances the educational value and practical utility of the AlgoVisualizer by enabling users to experiment with their own data and real-world scenarios.