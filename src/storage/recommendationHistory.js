/**
 * Recommendation History Storage
 * 
 * This module persists recommendation history, user feedback, and benchmark records.
 */

// In a real implementation, this would connect to a database or use localStorage
// For now, we'll simulate with in-memory storage

class RecommendationHistory {
  constructor() {
    this.history = [];
    this.feedback = [];
    this.benchmarks = [];
  }
  
  /**
   * Save recommendation history
   * @param {Object} recommendationRecord - Recommendation record to save
   * @returns {string} Record ID
   */
  saveRecommendation(recommendationRecord) {
    const record = {
      ...recommendationRecord,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    };
    
    this.history.push(record);
    
    // In a real implementation, this would persist to storage
    console.log('Recommendation saved:', record);
    
    return record.id;
  }
  
  /**
   * Get recommendation history for a user
   * @param {string} userId - User identifier
   * @param {number} limit - Number of records to return
   * @returns {Array} Recommendation history
   */
  getUserHistory(userId, limit = 10) {
    return this.history
      .filter(record => record.userId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }
  
  /**
   * Save user feedback
   * @param {Object} feedbackRecord - Feedback record to save
   * @returns {string} Record ID
   */
  saveFeedback(feedbackRecord) {
    const record = {
      ...feedbackRecord,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    };
    
    this.feedback.push(record);
    
    // In a real implementation, this would persist to storage
    console.log('Feedback saved:', record);
    
    return record.id;
  }
  
  /**
   * Get feedback for an algorithm
   * @param {string} algorithm - Algorithm name
   * @returns {Array} Feedback records
   */
  getAlgorithmFeedback(algorithm) {
    return this.feedback.filter(record => record.algorithm === algorithm);
  }
  
  /**
   * Get aggregated feedback statistics
   * @returns {Object} Feedback statistics
   */
  getFeedbackStatistics() {
    const totalFeedback = this.feedback.length;
    
    if (totalFeedback === 0) {
      return { totalFeedback: 0 };
    }
    
    // Count positive/negative feedback
    const positiveFeedback = this.feedback.filter(f => f.feedback === 'positive').length;
    const negativeFeedback = this.feedback.filter(f => f.feedback === 'negative').length;
    
    // Group feedback by algorithm
    const algorithmFeedback = {};
    this.feedback.forEach(record => {
      if (!algorithmFeedback[record.algorithm]) {
        algorithmFeedback[record.algorithm] = { positive: 0, negative: 0 };
      }
      
      if (record.feedback === 'positive') {
        algorithmFeedback[record.algorithm].positive++;
      } else if (record.feedback === 'negative') {
        algorithmFeedback[record.algorithm].negative++;
      }
    });
    
    return {
      totalFeedback,
      positiveFeedback,
      negativeFeedback,
      positivePercentage: (positiveFeedback / totalFeedback) * 100,
      negativePercentage: (negativeFeedback / totalFeedback) * 100,
      algorithmFeedback
    };
  }
  
  /**
   * Save benchmark record
   * @param {Object} benchmarkRecord - Benchmark record to save
   * @returns {string} Record ID
   */
  saveBenchmark(benchmarkRecord) {
    const record = {
      ...benchmarkRecord,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    };
    
    this.benchmarks.push(record);
    
    // In a real implementation, this would persist to storage
    console.log('Benchmark saved:', record);
    
    return record.id;
  }
  
  /**
   * Get benchmarks for an algorithm
   * @param {string} algorithm - Algorithm name
   * @returns {Array} Benchmark records
   */
  getAlgorithmBenchmarks(algorithm) {
    return this.benchmarks.filter(record => record.algorithm === algorithm);
  }
  
  /**
   * Get recent benchmarks
   * @param {number} limit - Number of records to return
   * @returns {Array} Recent benchmark records
   */
  getRecentBenchmarks(limit = 10) {
    return this.benchmarks
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }
  
  /**
   * Generate a unique ID
   * @returns {string} Unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  /**
   * Clear all history (for testing purposes)
   */
  clear() {
    this.history = [];
    this.feedback = [];
    this.benchmarks = [];
  }
}

// Create a singleton instance
const recommendationHistory = new RecommendationHistory();

export default recommendationHistory;