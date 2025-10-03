import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizStart from './QuizStart';
import QuestionCard from './QuestionCard';
import ResultPage from './ResultPage';
import quizQuestions from '../data/quizQuestions.json';
import "../styles/global-theme.css";

// Topic definitions
const TOPICS = [
  {
    id: 'sorting',
    name: 'Sorting',
    description: 'Test your knowledge of sorting algorithms like Bubble Sort, Quick Sort, Merge Sort, and more.'
  },
  {
    id: 'searching',
    name: 'Searching',
    description: 'Learn about search algorithms including Binary Search, Linear Search, and their implementations.'
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    description: 'Explore fundamental data structures like Arrays, Linked Lists, Stacks, and Queues.'
  },
  {
    id: "paradigms",
    name: "Paradigms",
    description: "Dive into problem-solving approaches including  Backtracking Algorithms, Dynamic Programming, Greedy Algorithms, and Divide & Conquer."
  },
  {
    id: "otherTopics",
    name: "Other Topics",
    description:  "Explore specialized areas including Hashing Algorithms, Tree Algorithms, Game Search Algorithms, and Branch & Bound."
  }
];

// Quiz step constants
const QUIZ_STEPS = {
  START: 'start',
  QUIZ: 'quiz',
  RESULTS: 'results'
};

// Sub-component for pause overlay
const PauseOverlay = ({ onResume }) => (
  <div className="quiz-overlay quiz-overlay-pause" role="dialog" aria-modal="true" aria-labelledby="pause-title">
    <div className="overlay-content">
      <h2 id="pause-title">Quiz Paused</h2>
      <button 
        className="quiz-btn"
        onClick={onResume}
        aria-label="Resume quiz"
      >
        Resume
      </button>
    </div>
  </div>
);

// Sub-component for exit confirmation overlay
const ExitConfirmationOverlay = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const buttons = Array.from(document.querySelectorAll(".exit-dialog button"));
      const currentIndex = buttons.indexOf(document.activeElement);

      if (e.key === "Enter") {
        if (document.activeElement instanceof HTMLButtonElement) {
          document.activeElement.click();
        }
      }

      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        if (currentIndex !== -1) {
          const nextIndex =
            e.key === "ArrowRight"
              ? (currentIndex + 1) % buttons.length
              : (currentIndex - 1 + buttons.length) % buttons.length;
          buttons[nextIndex].focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="quiz-overlay quiz-overlay-confirm exit-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
    >
      <div className="overlay-content">
        <h2 id="exit-title">Are you sure you want to exit the quiz?</h2>
        <div className="overlay-buttons">
          <button
            className="quiz-btn"
            onClick={onConfirm}
            aria-label="Confirm exit"
            autoFocus
          >
            Yes, Exit
          </button>
          <button
            className="quiz-btn secondary"
            onClick={onCancel}
            aria-label="Cancel exit"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper functions for quiz logic
const QuizHelpers = {
  // Create topic mapping for better filtering
  getTopicMapping: () => ({
    'sorting': 'Sorting',
    'searching': 'Searching', 
    'data-structures': 'Data Structures',
    'paradigms': 'Paradigms',
    'otherTopics': 'Other Topics',
    'all': 'all'
  }),

  // Filter and shuffle questions
  filterAndShuffleQuestions: (questions, topic, difficulty) => {
    const topicMapping = QuizHelpers.getTopicMapping();
    const mappedTopic = topicMapping[topic] || topic;
    
    // Filter questions based on topic and difficulty
    let filteredQuestions = questions.filter(q => {
      const topicMatch = mappedTopic === 'all' || q.topic === mappedTopic;
      const difficultyMatch = difficulty === 'all' || q.difficulty.toLowerCase() === difficulty.toLowerCase();
      return topicMatch && difficultyMatch;
    });

    // Shuffle questions and limit to 10
    return filteredQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
  },

  // Calculate quiz results
  calculateResults: (questions, userAnswers, startTime, endTime) => {
    let correct = 0;
    let total = questions.length;
    
    const questionResults = questions.map(question => {
      const userAnswer = userAnswers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correct++;
      
      return {
        question,
        userAnswer,
        isCorrect,
        userAnswerText: userAnswer !== undefined ? question.options[userAnswer] : 'Not answered',
        correctAnswerText: question.options[question.correctAnswer]
      };
    });

    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const timeTaken = startTime && endTime 
      ? Math.round((endTime - startTime) / 1000) 
      : 0;

    return {
      correct,
      total,
      percentage,
      timeTaken,
      questionResults
    };
  },

  // Format time in MM:SS format
  formatTime: (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
};

const QuizManager = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(QUIZ_STEPS.START);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timedMode, setTimedMode] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer;
    if (timedMode && timeRemaining > 0 && currentStep === QUIZ_STEPS.QUIZ && !isPaused) {
      timer = setTimeout(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timedMode && timeRemaining === 0 && currentStep === QUIZ_STEPS.QUIZ) {
      handleSubmitQuiz();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, timedMode, currentStep, isPaused]);

  // 🔹 Scroll fix
useEffect(() => {
  if (currentStep === QUIZ_STEPS.QUIZ) {
    window.scrollTo(0, 0);
  }
}, [currentStep]);

  const startQuiz = (topic, difficulty, timed = false) => {
    // Filter and shuffle questions
    let filteredQuestions = QuizHelpers.filterAndShuffleQuestions(quizQuestions, topic, difficulty);

    if (filteredQuestions.length === 0) {
      alert('No questions available for the selected criteria. Please try different options.');
      return;
    }

    setSelectedTopic(topic);
    setSelectedDifficulty(difficulty);
    setQuestions(filteredQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimedMode(timed);
    setQuizStartTime(new Date());
    
    if (timed) {
      setTimeRemaining(filteredQuestions.length * 60); // 1 minute per question
    }
    
    setCurrentStep(QUIZ_STEPS.QUIZ);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizEndTime(new Date());
    setCurrentStep(QUIZ_STEPS.RESULTS);
  };

  const restartQuiz = () => {
    setCurrentStep(QUIZ_STEPS.START);
    setSelectedTopic('');
    setSelectedDifficulty('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeRemaining(null);
    setTimedMode(false);
    setQuizStartTime(null);
    setQuizEndTime(null);
    setIsPaused(false);
    setShowExitConfirm(false);
  };

  const goHome = () => {
    navigate('/');
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);
  const handleExit = () => setShowExitConfirm(true);
  const confirmExit = () => {
    setShowExitConfirm(false);
    restartQuiz();
  };
  const cancelExit = () => setShowExitConfirm(false);

  // Render start screen
  if (currentStep === QUIZ_STEPS.START) {
    return (
      <div className="theme-container">
        <div className="quiz-header">
          <h1 className="theme-title">Algorithm Quiz</h1>
          <p>Test your knowledge of algorithms and data structures</p>
        </div>
        <QuizStart
          topics={TOPICS}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          onStartQuiz={startQuiz}
        />
      </div>
    );
  }

  // Render quiz screen
  if (currentStep === QUIZ_STEPS.QUIZ) {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="theme-container">
        {/* Pause/Exit Buttons */}
        <div className="quiz-controls-top">
          <button 
            className="quiz-btn secondary"
            onClick={handlePause} 
            disabled={isPaused}
            aria-label="Pause quiz"
          >
            Pause
          </button>
          <button 
            className="quiz-btn secondary"
            onClick={handleExit}
            aria-label="Exit quiz"
          >
            Exit
          </button>
        </div>
        
        {/* Pause Overlay */}
        {isPaused && <PauseOverlay onResume={handleResume} />}
        
        {/* Exit Confirmation */}
        {showExitConfirm && (
          <ExitConfirmationOverlay 
            onConfirm={confirmExit} 
            onCancel={cancelExit} 
          />
        )}
        
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          progress={progress}
          userAnswer={userAnswers[currentQuestion.id]}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNextQuestion}
          onPrevious={handlePreviousQuestion}
          onSubmit={handleSubmitQuiz}
          canGoNext={currentQuestionIndex < questions.length - 1}
          canGoPrevious={currentQuestionIndex > 0}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
          timeRemaining={timeRemaining}
          timedMode={timedMode}
          formatTime={QuizHelpers.formatTime}
        />
      </div>
    );
  }

  // Render results screen
  if (currentStep === QUIZ_STEPS.RESULTS) {
    const results = QuizHelpers.calculateResults(
      questions, 
      userAnswers, 
      quizStartTime, 
      quizEndTime
    );
    
    return (
      <div className="theme-container">
        <ResultPage
          results={results}
          selectedTopic={selectedTopic}
          selectedDifficulty={selectedDifficulty}
          timedMode={timedMode}
          onRestart={restartQuiz}
          onGoHome={goHome}
          formatTime={QuizHelpers.formatTime}
        />
      </div>
    );
  }

  return null;
};

export default QuizManager;