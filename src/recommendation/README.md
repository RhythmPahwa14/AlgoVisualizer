# Algorithm Recommendation System

## Overview

The Algorithm Recommendation System is an intelligent system that suggests the most appropriate algorithms for a given dataset and constraints using machine learning techniques. The system analyzes dataset characteristics, predicts algorithm performance, and provides personalized recommendations.

## Features

- **Dataset Analysis Engine**: Automatically extracts features from input datasets
- **Machine Learning Models**: Classification, regression, and clustering models for recommendations
- **Performance Prediction**: Predicts runtime and memory usage with confidence intervals
- **Personalization**: Adapts recommendations based on user preferences and history
- **Explainability**: Provides clear explanations for why algorithms are recommended
- **Feedback Loop**: Learns from user feedback to improve future recommendations

## Directory Structure

```
recommendation/
├── featureExtractor.js         # Dataset feature extraction engine
├── service.js                  # Main recommendation service
├── performancePredictor.js     # Performance prediction system
├── userPreferences.js          # User preference management
├── models/
│   └── modelWrapper.js         # ML model wrappers
├── README.md                   # This file
```

## Usage

### Basic Usage

```javascript
import { generateRecommendations } from './recommendation/service.js';

// Your dataset (array of numbers)
const dataset = [5, 2, 8, 1, 9, 3, 7, 4, 6];

// Optional user preferences
const userPreferences = {
  priority: 'speed',        // 'speed', 'memory', or 'accuracy'
  learningStyle: 'visual'   // 'visual', 'theoretical', or 'practical'
};

// Generate recommendations
const recommendations = await generateRecommendations(dataset, userPreferences);
console.log(recommendations);
```

### Feature Extraction

```javascript
import { extractFeatures } from './recommendation/featureExtractor.js';

const dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const features = extractFeatures(dataset);

console.log(features);
// Output: {
//   size: 10,
//   mean: 5.5,
//   median: 5.5,
//   variance: 8.25,
//   stdDev: 2.8722813232690143,
//   min: 1,
//   max: 10,
//   range: 9,
//   skewness: 0,
//   kurtosis: -1.22,
//   distribution: 'uniform',
//   sortedness: 1,
//   nearlySorted: true,
//   runs: 1,
//   inversions: 0,
//   duplicates: 0,
//   count: 0,
//   percentage: 0,
//   dataType: 'integer',
//   isNumeric: true,
//   isCategorical: false
// }
```

## UI Components

The system includes React components for displaying recommendations:

- `RecommendationPanel`: Main dashboard component
- `RecommendationList`: List of recommended algorithms
- `ExplanationPane`: Explanation of why an algorithm was recommended
- `PerformanceComparison`: Visual comparison of algorithm performance
- `FeedbackControls`: Interface for user feedback

## Integration

To integrate the recommendation system into your application:

1. Import the recommendation service:
   ```javascript
   import { generateRecommendations } from './recommendation/service.js';
   ```

2. Call the service with your dataset:
   ```javascript
   const result = await generateRecommendations(yourDataset);
   ```

3. Use the results to display recommendations to users.

## Development

### Adding New Algorithms

To add support for new algorithms:

1. Update the algorithm database in `src/algorithms/algorithms.json`
2. Add feature importance data in `models/modelWrapper.js`
3. Update the mock models with new algorithm characteristics

### Extending Feature Extraction

To extend the feature extraction capabilities:

1. Modify `featureExtractor.js` to add new feature extraction functions
2. Update the `extractFeatures` function to handle new data types
3. Ensure new features are normalized in `normalizeFeatures`

## Testing

Unit tests are located in the `tests/recommendation/` directory:

- `featureExtractor.test.js`: Tests for feature extraction
- `service.test.js`: Tests for the recommendation service
- `integration.test.js`: Integration tests

## Documentation

Detailed documentation is available in `docs/RecommendationSystem.md`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add appropriate tests
5. Submit a pull request

Please follow the existing code style and ensure all tests pass before submitting.