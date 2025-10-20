/**
 * Feedback Controls Component
 * 
 * Provides controls for users to give feedback on recommendations.
 */

import React, { useState } from 'react';

const FeedbackControls = ({ onFeedback }) => {
  const [feedback, setFeedback] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (feedback) {
      onFeedback(feedback, comment);
      setSubmitted(true);
      // Reset form after submission
      setFeedback('');
      setComment('');
      
      // Reset submission status after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="feedback-controls bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Provide Feedback</h3>
      
      {submitted ? (
        <div className="text-center py-4">
          <div className="text-green-500 text-2xl mb-2">✓</div>
          <p className="text-gray-700">Thank you for your feedback!</p>
          <p className="text-sm text-gray-500 mt-1">This will help improve future recommendations.</p>
        </div>
      ) : (
        <>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setFeedback('positive')}
              className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                feedback === 'positive'
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-green-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl">👍</span>
                <span className="mt-1 font-medium">Helpful</span>
              </div>
            </button>
            
            <button
              onClick={() => setFeedback('negative')}
              className={`flex-1 py-3 px-4 rounded-lg border transition-colors ${
                feedback === 'negative'
                  ? 'bg-red-100 border-red-500 text-red-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-red-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl">👎</span>
                <span className="mt-1 font-medium">Not Helpful</span>
              </div>
            </button>
          </div>
          
          <div className="mb-4">
            <label htmlFor="feedback-comment" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </label>
            <textarea
              id="feedback-comment"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="What could be improved? Did you try this algorithm?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!feedback}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              feedback
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Feedback
          </button>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            Your feedback helps improve algorithm recommendations for everyone
          </p>
        </>
      )}
    </div>
  );
};

export default FeedbackControls;