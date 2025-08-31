import React, { useState } from 'react';
import { FaPlay, FaClock, FaInfinity } from 'react-icons/fa6';

const QuizStart = ({ 
  topics, 
  selectedTopic, 
  setSelectedTopic, 
  selectedDifficulty, 
  setSelectedDifficulty, 
  onStartQuiz 
}) => {
  const [timedMode, setTimedMode] = useState(false);

  const difficulties = [
    { id: 'easy', name: 'Easy', description: 'Basic concepts and simple problems' },
    { id: 'medium', name: 'Medium', description: 'Intermediate level questions' },
    { id: 'hard', name: 'Hard', description: 'Advanced problems and edge cases' },
    { id: 'all', name: 'Mixed', description: 'Questions from all difficulty levels' }
  ];

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
  };

  const handleDifficultySelect = (difficultyId) => {
    setSelectedDifficulty(difficultyId);
  };

  const handleStartQuiz = () => {
    if (!selectedTopic || !selectedDifficulty) {
      alert('Please select both a topic and difficulty level to start the quiz.');
      return;
    }
    onStartQuiz(selectedTopic, selectedDifficulty, timedMode);
  };

  const canStart = selectedTopic && selectedDifficulty;

  return (
    <div className="quiz-start">
      {/* Topic Selection */}
      <div className="topic-selection">
        <h2 className="section-title">Choose Your Topic</h2>
        <div className="topic-grid">
          {topics.map(topic => (
            <div
              key={topic.id}
              className={`topic-card ${selectedTopic === topic.id ? 'selected' : ''}`}
              onClick={() => handleTopicSelect(topic.id)}
            >
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
            </div>
          ))}
          <div
            className={`topic-card ${selectedTopic === 'all' ? 'selected' : ''}`}
            onClick={() => handleTopicSelect('all')}
          >
            <h3>All Topics</h3>
            <p>Mixed questions from all algorithm categories for a comprehensive challenge.</p>
          </div>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="difficulty-selection">
        <h2 className="section-title">Select Difficulty</h2>
        <div className="difficulty-buttons">
          {difficulties.map(difficulty => (
            <button
              key={difficulty.id}
              className={`difficulty-btn ${difficulty.id} ${selectedDifficulty === difficulty.id ? 'selected' : ''}`}
              onClick={() => handleDifficultySelect(difficulty.id)}
              title={difficulty.description}
            >
              {difficulty.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Mode Selection */}
      <div className="quiz-mode-selection">
        <h2 className="section-title">Quiz Mode</h2>
        <div className="mode-options">
          <label className="mode-option">
            <input
              type="radio"
              name="quizMode"
              checked={!timedMode}
              onChange={() => setTimedMode(false)}
            />
            <div className="mode-content">
              <FaInfinity className="mode-icon" />
              <div>
                <h3>Practice Mode</h3>
                <p>Take your time, no time limit</p>
              </div>
            </div>
          </label>
          <label className="mode-option">
            <input
              type="radio"
              name="quizMode"
              checked={timedMode}
              onChange={() => setTimedMode(true)}
            />
            <div className="mode-content">
              <FaClock className="mode-icon" />
              <div>
                <h3>Timed Mode</h3>
                <p>1 minute per question</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Quiz Controls: Show info line or Start button */}
      <div className="quiz-controls">
        {canStart ? (
          <button 
            className="quiz-btn ready"
            onClick={handleStartQuiz}
          >
            <FaPlay />
            Start Quiz
          </button>
          ) : (
          <p className="select-info">Select Topic & Difficulty</p>
        )}
        {selectedTopic && selectedDifficulty && (
          <p className="quiz-info">
            Ready to test your knowledge of{' '}
            <strong>
              {selectedTopic === 'all' ? 'All Topics' : 
               topics.find(t => t.id === selectedTopic)?.name}
            </strong>{' '}
            at{' '}
            <strong>
              {difficulties.find(d => d.id === selectedDifficulty)?.name}
            </strong>{' '}
            level {timedMode ? 'with timer' : 'without timer'}.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizStart;
