// Load cheatsheet data from YAML file
import yaml from 'js-yaml';
import cheatsheetYaml from './cheatsheetData.yml?raw';

// Parse YAML content
const parsedData = yaml.load(cheatsheetYaml);

// Export the parsed data with the same structure as before
export const cheatsheetData = {
  sorting: parsedData.sorting,
  searching: parsedData.searching,
  dataStructures: parsedData.dataStructures,
  graph: parsedData.graph,
  tree: parsedData.trees, // added tree to the session.
  advancedAlgorithms: parsedData.advancedAlgorithms
};

// Quick reference for Big-O complexities
export const bigOReference = parsedData.bigOReference;

// Tips and best practices
export const algorithmTips = parsedData.algorithmTips;
