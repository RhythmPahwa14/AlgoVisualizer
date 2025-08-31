import React from 'react';
import { FaCircleCheck, FaCircleXmark, FaRotateRight, FaHouse } from 'react-icons/fa6';

const ResultPage = ({
  results,
  selectedTopic,
  selectedDifficulty,
  timedMode,
  onRestart,
  onGoHome,
  formatTime
}) => {
  const { correct, total, percentage, timeTaken, questionResults } = results;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Excellent! You're a master!", color: "#3fb950" };
    if (percentage >= 80) return { message: "Great job! Well done!", color: "#58a6ff" };
    if (percentage >= 70) return { message: "Good work! Keep it up!", color: "#d29922" };
    if (percentage >= 60) return { message: "Not bad! Room for improvement.", color: "#f85149" };
    return { message: "Keep studying and try again!", color: "#f85149" };
  };

  const performanceMessage = getPerformanceMessage();

  const topicName = selectedTopic === 'all' ? 'All Topics' : 
    selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1).replace('-', ' ');

  const difficultyName = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);

  return (
    <div className="results-container result-page">
      <div className="results-header">
        <h1 className="results-title">Quiz Complete!</h1>
        <p style={{ color: performanceMessage.color, fontSize: '1.2rem', fontWeight: '600' }}>
          {performanceMessage.message}
        </p>
      </div>

      {/* Score Display */}
      <div className="score-display">
        <div className="score-item">
          <div className="score-value" style={{ color: performanceMessage.color }}>
            {percentage}%
          </div>
          <div className="score-label">Score</div>
        </div>
        
        <div className="score-item">
          <div className="score-value">
            {correct}/{total}
          </div>
          <div className="score-label">Correct</div>
        </div>
        
        {timedMode && (
          <div className="score-item">
            <div className="score-value">
              {formatTime(timeTaken)}
            </div>
            <div className="score-label">Time Taken</div>
          </div>
        )}
        
        <div className="score-item">
          <div className="score-value">
            {topicName}
          </div>
          <div className="score-label">Topic</div>
        </div>
        
        <div className="score-item">
          <div className="score-value">
            {difficultyName}
          </div>
          <div className="score-label">Difficulty</div>
        </div>
      </div>

      {/* Question Breakdown */}
      <div className="results-breakdown">
        <h2 className="breakdown-title">Detailed Results</h2>
        
        {questionResults.map((result, index) => (
          <div 
            key={result.question.id} 
            className={`question-result ${result.isCorrect ? 'correct' : 'incorrect'}`}
          >
            <div className="result-header">
              <h3 className="result-question">
                {index + 1}. {result.question.question}
              </h3>
              <span className={`result-icon ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                {result.isCorrect ? <FaCircleCheck /> : <FaCircleXmark />}
              </span>
            </div>
            
            <div className="result-answers">
              <div className="answer-row">
                <span className="answer-label">Your Answer:</span>
                <span className={`answer-value ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                  {result.userAnswerText}
                </span>
              </div>
              
              {!result.isCorrect && (
                <div className="answer-row">
                  <span className="answer-label">Correct Answer:</span>
                  <span className="answer-value correct">
                    {result.correctAnswerText}
                  </span>
                </div>
              )}
            </div>
            
            <div className="result-explanation">
              <strong>Explanation:</strong> {result.question.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="quiz-controls">
        <button className="quiz-btn" onClick={onRestart}>
          <FaRotateRight />
          Take Another Quiz
        </button>
        
        <button className="quiz-btn secondary" onClick={onGoHome}>
          <FaHouse />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
