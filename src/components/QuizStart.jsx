import React, { useState } from "react";
import { FaPlay, FaClock, FaInfinity } from "react-icons/fa6";

const QuizStart = ({
  topics,
  selectedTopic,
  setSelectedTopic,
  selectedDifficulty,
  setSelectedDifficulty,
  onStartQuiz,
}) => {
  const [timedMode, setTimedMode] = useState(false);
  const [error, setError] = useState("");

  const difficulties = [
    { id: "easy", name: "Easy", description: "Basic concepts and simple problems" },
    { id: "medium", name: "Medium", description: "Intermediate level questions" },
    { id: "hard", name: "Hard", description: "Advanced problems and edge cases" },
    { id: "all", name: "Mixed", description: "A blend of all difficulty levels" },
  ];

  const handleStartQuiz = () => {
    // Allow both topic and difficulty to be 'all'
    if (!selectedTopic || !selectedDifficulty) {
      setError("Please choose both a topic and difficulty.");
      return;
    }
    setError("");
    // Pass the selected options directly without modification
    onStartQuiz(selectedTopic, selectedDifficulty, timedMode);
  };

  return (
    <div className="quiz-start">
      {/* Topic Selection */}
      <div className="topic-selection">
        <h2 className="section-title">Choose a Topic</h2>
        <div className="topic-grid">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`topic-card ${selectedTopic === topic.id ? "selected" : ""}`}
              onClick={() => setSelectedTopic(topic.id)}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedTopic(topic.id)}
              tabIndex={0}
              role="button"
              aria-pressed={selectedTopic === topic.id}
            >
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
            </div>
          ))}
          <div
            className={`topic-card ${selectedTopic === "all" ? "selected" : ""}`}
            onClick={() => setSelectedTopic("all")}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedTopic("all")}
            tabIndex={0}
            role="button"
            aria-pressed={selectedTopic === "all"}
          >
            <h3>All Topics</h3>
            <p>Questions from every category.</p>
          </div>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="difficulty-selection">
        <h2 className="section-title">Choose a Difficulty</h2>
        <div className="difficulty-buttons">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.id}
              className={`difficulty-btn ${difficulty.id} ${selectedDifficulty === difficulty.id ? "selected" : ""}`}
              onClick={() => setSelectedDifficulty(difficulty.id)}
              title={difficulty.description}
            >
              {difficulty.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Mode */}
      <div className="quiz-mode-selection">
        <h2 className="section-title">Select Mode</h2>
        <div className="mode-options centered">
          <label className="mode-option">
            <input
              type="radio"
              name="quizMode"
              checked={!timedMode}
              onChange={() => setTimedMode(false)}
              aria-label="Practice mode - no time limit"
            />
            <div className="mode-content">
              <FaInfinity className="mode-icon big" />
              <div>
                <h3>Practice</h3>
                <p>No time limit</p>
              </div>
            </div>
          </label>
          <label className="mode-option">
            <input
              type="radio"
              name="quizMode"
              checked={timedMode}
              onChange={() => setTimedMode(true)}
              aria-label="Timed mode - 1 minute per question"
            />
            <div className="mode-content">
              <FaClock className="mode-icon big" />
              <div>
                <h3>Timed</h3>
                <p>1 min per question</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Controls */}
      <div className="quiz-controls">
        <button
          className="quiz-btn ready"
          onClick={handleStartQuiz}
          disabled={!selectedTopic || !selectedDifficulty}
          aria-label="Start quiz"
        >
          <FaPlay /> Start Quiz
        </button>
        {error && <p className="error-msg" role="alert">{error}</p>}

        {selectedTopic && selectedDifficulty && (
          <p className="quiz-info">
            Get ready for{" "}
            <strong>
              {selectedTopic === "all"
                ? "All Topics"
                : topics.find((t) => t.id === selectedTopic)?.name}
            </strong>{" "}
            at <strong>{selectedDifficulty}</strong> difficulty{" "}
            {timedMode ? "(Timed)" : "(Practice)"}.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizStart;