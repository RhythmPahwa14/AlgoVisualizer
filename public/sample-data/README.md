# Sample Data Files

This directory contains example data files that you can download and use to test the AlgoVisualizer's custom input functionality.

## 📁 Available Files

### Arrays (Sorting & Searching)
- **`sample-array.json`** - JSON format array with 20 random numbers
- **`sample-array.csv`** - CSV format with the same data

**Usage**: Upload these files in the Sorting or Searching algorithm pages to visualize your own data.

### Graphs (BFS, DFS, Dijkstra)
- **`sample-graph.json`** - Complete graph structure with 6 nodes and weighted edges

**Usage**: Upload this file in any Graph algorithm page to visualize pathfinding algorithms.

### Trees (Binary Tree, BST)
- **`sample-tree.json`** - Binary search tree structure with 7 nodes

**Usage**: Upload this file in Tree visualization pages to see tree traversal algorithms.

## 🔧 How to Use

1. **Download**: Right-click any file and "Save as" to your computer
2. **Upload**: Use the "File Upload" tab in the Input Panel on any algorithm page
3. **Visualize**: The data will be automatically validated and loaded

## 📝 File Formats Supported

### JSON (.json)
```json
[64, 34, 25, 12, 22, 11, 90]
```

### CSV (.csv)
```csv
64,34,25,12,22,11,90
```

### Graph JSON
```json
{
  "nodes": [{"id": 0, "label": "A"}],
  "edges": [{"id": "0-1", "from": 0, "to": 1, "weight": 5}]
}
```

### Tree JSON
```json
{
  "value": 50,
  "left": {"value": 30, "left": null, "right": null},
  "right": {"value": 70, "left": null, "right": null}
}
```

## ✨ Quick Start

1. Go to any algorithm page (Sorting, Searching, Graph, etc.)
2. Look for the "Input Panel" at the top
3. Click "File Upload" tab
4. Select one of these sample files
5. Click "Load Data" and start visualizing!

## 🎯 Tips

- **Arrays**: Will be automatically sorted for searching algorithms
- **Graphs**: Missing IDs and labels will be auto-generated
- **Trees**: Maximum depth of 20 levels supported
- **Validation**: All files include proper error checking

Happy visualizing! 🚀