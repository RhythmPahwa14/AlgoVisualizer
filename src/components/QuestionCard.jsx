import React from 'react';
import { FaClock, FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa6';

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  progress,
  userAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  onSubmit,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
  timeRemaining,
  timedMode,
  formatTime
}) => {
  
  const handleOptionSelect = (optionIndex) => {
    onAnswerSelect(question.id, optionIndex);
  };

  return (
    <div className="question-container">
      {/* Progress Bar */}
      <div className="quiz-progress">
        <div className="progress-info">
          <span className="question-counter">
            Question {questionNumber} of {totalQuestions}
          </span>
          {timedMode && timeRemaining !== null && (
            <span className="timer">
              <FaClock />
              {formatTime(timeRemaining)}
            </span>
          )}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="question-content">
        <div className="question-meta">
          <span className="meta-badge topic">{question.topic}</span>
          <span className={`meta-badge difficulty ${question.difficulty.toLowerCase()}`}>
            {question.difficulty}
          </span>
          {question.algorithm && (
            <span className="meta-badge algorithm">{question.algorithm}</span>
          )}
        </div>
        
        <h2 className="question-text">{question.question}</h2>
        
        <ul className="options-list">
          {question.options.map((option, index) => (
            <li key={index} className="option-item">
              <label 
                className={`option-label ${userAnswer === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className={`option-radio ${userAnswer === index ? 'selected' : ''}`}></div>
                <span className="option-text">{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <div className="question-navigation">
        <div className="nav-left">
          {canGoPrevious && (
            <button className="quiz-btn secondary" onClick={onPrevious}>
              <FaArrowLeft />
              Previous
            </button>
          )}
        </div>
        
        <div className="nav-right">
          {canGoNext && (
            <button 
              className="quiz-btn" 
              onClick={onNext}
              disabled={userAnswer === undefined}
            >
              Next
              <FaArrowRight />
            </button>
          )}
          
          {isLastQuestion && (
            <button 
              className="quiz-btn" 
              onClick={onSubmit}
              style={{ 
                background: '#3fb950',
                borderColor: '#3fb950'
              }}
            >
              <FaCheck />
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
