import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Play, Eye, Code, Sparkles } from 'lucide-react';
import {
  getProblemOfTheDay,
  getTimeUntilNextProblem,
  formatTimeRemaining
} from '../utils/problemOfTheDay';
import { getDifficultyColor } from '../data/problemsOfTheDay';

const ProblemOfTheDay = () => {
  const [problem, setProblem] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const todaysProblem = getProblemOfTheDay();
    setProblem(todaysProblem);

    const updateTimer = () => {
      setTimeRemaining(getTimeUntilNextProblem());
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!problem) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md !p-6 border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse !space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded !w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded !w-1/2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded !w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded !w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="!bg-white dark:!bg-gray-800 !rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 !p-4">
        <div className="flex !flex-row !items-center !justify-between !gap-4">
          <div className="!flex !items-center !gap-3">
            <Sparkles size={24} />
            <h2 className="text-xl font-semibold !m-0">Problem of the Day</h2>
          </div>
          <div className="flex !items-center !gap-2 text-base">
            <Clock size={18} />
            <span>Next: {formatTimeRemaining(timeRemaining)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="!px-6 !pt-4 !pb-8 !space-y-8">
        {/* Title & Difficulty */}
        <div className="flex !flex-col md:!flex-row md:!justify-between !items-start md:!items-center !gap-4">
          <h3 className="!text-2xl md:!text-3xl !font-bold !text-gray-900 dark:!text-blue-400 leading-snug !m-0">
            {problem.title}
          </h3>
          <span
            className={`!px-5 !py-2 rounded-full text-base font-semibold ${getDifficultyColor(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 !text-base md:!text-lg !text-justify md:!text-left leading-relaxed !mb-6">
          {problem.description}
        </p>

        {/* Examples */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl !p-6 border border-gray-200 dark:border-gray-600 !space-y-6">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white !mb-4">Examples:</h4>
          <div className="grid !grid-cols-1 lg:!grid-cols-2 !gap-6">
            <div>
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white uppercase !mb-2">Sample Input</h5>
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg !p-4">
                <code className="text-gray-800 dark:text-gray-200 font-mono block !whitespace-pre-wrap">
                  {problem.sampleInput}
                </code>
              </div>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white uppercase !mb-2">Sample Output</h5>
              <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg !p-4">
                <code className="text-gray-800 dark:text-gray-200 font-mono block !whitespace-pre-wrap">
                  {problem.sampleOutput}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-4 !px-4 !pb-4">
        {problem.visualizationLink && (
          <Link
            to={problem.visualizationLink}
            className="bg-blue-600 hover:bg-blue-700 !text-white !font-bold !px-4 !py-3 rounded-lg flex !items-center !justify-center !gap-2 transition-shadow shadow-sm hover:shadow-md"
          >
            <Play size={18} /> Visualize
          </Link>
        )}
        {problem.explanationLink && (
          <Link
            to={problem.explanationLink}
            className="bg-green-600 hover:bg-green-700 !text-white !font-bold !px-4 !py-3 rounded-lg flex !items-center !justify-center !gap-2 transition-shadow shadow-sm hover:shadow-md"
          >
            <Eye size={18} /> View Solution
          </Link>
        )}
        {problem.practiceUrl && (
          <a
            href={problem.practiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 !text-white !font-bold !px-4 !py-3 rounded-lg flex !items-center !justify-center !gap-2 transition-shadow shadow-sm hover:shadow-md"
          >
            <Code size={18} /> Practice
          </a>
        )}
      </div>
    </section>
  );
};

export default ProblemOfTheDay;