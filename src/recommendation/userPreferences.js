/**
 * User Preference and Personalization System
 * 
 * This module manages user preferences, historical usage tracking,
 * and personalized recommendation weighting.
 */

/**
 * User preference manager class
 */
export class UserPreferenceManager {
  constructor() {
    // In a real implementation, this would connect to a database or localStorage
    this.preferences = {};
    this.history = {};
  }
  
  /**
   * Set user preferences
   * @param {string} userId - User identifier
   * @param {Object} preferences - User preferences
   */
  setPreferences(userId, preferences) {
    if (!this.preferences[userId]) {
      this.preferences[userId] = {};
    }
    
    this.preferences[userId] = {
      ...this.preferences[userId],
      ...preferences
    };
    
    // In a real implementation, this would persist to storage
    console.log(`Preferences updated for user ${userId}:`, preferences);
  }
  
  /**
   * Get user preferences
   * @param {string} userId - User identifier
   * @returns {Object} User preferences
   */
  getPreferences(userId) {
    return this.preferences[userId] || {};
  }
  
  /**
   * Record algorithm usage in user history
   * @param {string} userId - User identifier
   * @param {string} algorithm - Algorithm name
   * @param {Object} usageData - Usage data
   */
  recordUsage(userId, algorithm, usageData) {
    if (!this.history[userId]) {
      this.history[userId] = {};
    }
    
    if (!this.history[userId][algorithm]) {
      this.history[userId][algorithm] = [];
    }
    
    this.history[userId][algorithm].push({
      ...usageData,
      timestamp: new Date().toISOString()
    });
    
    // In a real implementation, this would persist to storage
    console.log(`Usage recorded for user ${userId}, algorithm ${algorithm}:`, usageData);
  }
  
  /**
   * Get user history for an algorithm
   * @param {string} userId - User identifier
   * @param {string} algorithm - Algorithm name
   * @returns {Array} Usage history
   */
  getHistory(userId, algorithm) {
    return (this.history[userId] && this.history[userId][algorithm]) || [];
  }
  
  /**
   * Record feedback for an algorithm
   * @param {string} userId - User identifier
   * @param {string} algorithm - Algorithm name
   * @param {string} feedback - Feedback ('positive' or 'negative')
   * @param {string} comment - Optional comment
   */
  recordFeedback(userId, algorithm, feedback, comment = '') {
    const usageHistory = this.getHistory(userId, algorithm);
    const lastUsage = usageHistory.length > 0 ? usageHistory[usageHistory.length - 1] : null;
    
    const feedbackRecord = {
      feedback,
      comment,
      timestamp: new Date().toISOString(),
      usageContext: lastUsage || null
    };
    
    // Store feedback
    if (!this.history[userId]) {
      this.history[userId] = {};
    }
    
    if (!this.history[userId][`${algorithm}_feedback`]) {
      this.history[userId][`${algorithm}_feedback`] = [];
    }
    
    this.history[userId][`${algorithm}_feedback`].push(feedbackRecord);
    
    // In a real implementation, this would persist to storage
    console.log(`Feedback recorded for user ${userId}, algorithm ${algorithm}:`, feedbackRecord);
  }
  
  /**
   * Get weighted scoring factors based on user preferences
   * @param {string} userId - User identifier
   * @returns {Object} Weighted scoring factors
   */
  getWeightedScoringFactors(userId) {
    const preferences = this.getPreferences(userId);
    
    // Default weights
    const weights = {
      speed: 1.0,
      memory: 1.0,
      accuracy: 1.0,
      userHistory: 1.0
    };
    
    // Adjust based on explicit preferences
    if (preferences.priority === 'speed') {
      weights.speed = 1.5;
      weights.memory = 0.8;
    } else if (preferences.priority === 'memory') {
      weights.memory = 1.5;
      weights.speed = 0.8;
    }
    
    // Adjust based on learning style preferences
    if (preferences.learningStyle === 'visual') {
      // Boost algorithms with good visualization support
      weights.visualSupport = 1.2;
    } else if (preferences.learningStyle === 'theoretical') {
      weights.theoretical = 1.2;
    }
    
    return weights;
  }
  
  /**
   * Get personalized recommendations based on user history
   * @param {string} userId - User identifier
   * @param {Array} recommendations - Base recommendations
   * @returns {Array} Personalized recommendations
   */
  personalizeRecommendations(userId, recommendations) {
    const history = this.history[userId] || {};
    const weights = this.getWeightedScoringFactors(userId);
    
    return recommendations.map(rec => {
      let score = rec.confidence;
      
      // Boost algorithms with positive feedback history
      const feedbackHistory = history[`${rec.algorithm}_feedback`] || [];
      if (feedbackHistory.length > 0) {
        const positiveFeedback = feedbackHistory.filter(f => f.feedback === 'positive').length;
        const negativeFeedback = feedbackHistory.filter(f => f.feedback === 'negative').length;
        const feedbackScore = (positiveFeedback - negativeFeedback) / feedbackHistory.length;
        score *= (1 + feedbackScore * 0.2);
      }
      
      // Boost recently used algorithms (recency weighting)
      const algoHistory = history[rec.algorithm] || [];
      if (algoHistory.length > 0) {
        const lastUsage = new Date(algoHistory[algoHistory.length - 1].timestamp);
        const daysSince = (new Date() - lastUsage) / (1000 * 60 * 60 * 24);
        // Boost algorithms used in the last 30 days
        if (daysSince < 30) {
          score *= (1 + (30 - daysSince) / 30 * 0.3);
        }
      }
      
      return {
        ...rec,
        personalizedScore: score,
        weightsApplied: weights
      };
    }).sort((a, b) => (b.personalizedScore || b.confidence) - (a.personalizedScore || a.confidence));
  }
}

// Create a singleton instance
const preferenceManager = new UserPreferenceManager();

export default preferenceManager;