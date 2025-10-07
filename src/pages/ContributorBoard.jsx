import React, { useState, useEffect, useCallback } from "react";
import { contributors as initialContributors } from "../data/contributors";

// 🎯 Debug logging helper
const logDebug = (message, data = null) => {
  console.log(`🏆 ContributorBoardDebug: ${message}`, data ? data : '');
};

// 🎯 Performance monitoring helper
const trackPerformance = (operation, startTime) => {
  const duration = performance.now() - startTime;
  logDebug(`⏱️ ${operation} Performance`, { duration: `${duration.toFixed(2)}ms` });
  return duration;
};

// Helpers for points and levels
const calculatePoints = (c) => c.commits * 0.4 + c.content * 0.3 + c.quizPoints * 0.3;
const getLevel = (points) => {
  if (points >= 601) return "Platinum 🏅";
  if (points >= 301) return "Gold 🥇";
  if (points >= 101) return "Silver 🥈";
  return "Bronze 🥉";
};

// Assign badges
const assignBadges = (contributors) => {
  const badges = {};
  if (contributors.length === 0) return badges;

  const topCommitter = [...contributors].sort((a, b) => b.commits - a.commits)[0];
  const quizMaster = [...contributors].sort((a, b) => b.quizPoints - a.quizPoints)[0];
  const contentCreator = [...contributors].sort((a, b) => b.content - a.content)[0];

  badges[topCommitter.id] = (badges[topCommitter.id] || []).concat("Top Committer 🔥");
  badges[quizMaster.id] = (badges[quizMaster.id] || []).concat("Quiz Master 🧠");
  badges[contentCreator.id] = (badges[contentCreator.id] || []).concat("Content Creator ✍️");

  return badges;
};

const ContributorBoard = () => {
  const [sortBy, setSortBy] = useState("commits");
  const [order, setOrder] = useState("desc");
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    sortOperations: 0,
    modalViews: 0,
    interactions: 0,
    tableRenderTime: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // 🎯 Component lifecycle logging
  useEffect(() => {
    const loadStartTime = performance.now();
    logDebug('🚀 ContributorBoard component mounted', {
      contributorCount: initialContributors.length,
      initialSort: sortBy,
      initialOrder: order
    });

    // Simulate loading completion
    const loadTimer = setTimeout(() => {
      const loadDuration = performance.now() - loadStartTime;
      setIsLoading(false);
      setPerformanceMetrics(prev => ({
        ...prev,
        tableRenderTime: loadDuration
      }));
      
      logDebug('✅ Contributors loaded', {
        loadTime: `${loadDuration.toFixed(2)}ms`,
        totalContributors: initialContributors.length,
        badgeCount: Object.keys(assignBadges(initialContributors)).length
      });
    }, 300);

    return () => {
      clearTimeout(loadTimer);
      logDebug('🧹 ContributorBoard unmounting', {
        totalSorts: performanceMetrics.sortOperations,
        modalViews: performanceMetrics.modalViews,
        totalInteractions: performanceMetrics.interactions
      });
    };
  }, []);

  // 🎯 Performance-optimized sorting with logging
  const sortedContributors = React.useMemo(() => {
    const sortStartTime = performance.now();
    
    const sorted = [...initialContributors].sort((a, b) => {
      if (order === "asc") return a[sortBy] - b[sortBy];
      else return b[sortBy] - a[sortBy];
    });

    const sortDuration = trackPerformance('Sort Operation', sortStartTime);
    
    setPerformanceMetrics(prev => ({
      ...prev,
      sortOperations: prev.sortOperations + 1
    }));

    logDebug('🔄 Contributors sorted', {
      sortBy,
      order,
      duration: `${sortDuration.toFixed(2)}ms`,
      totalSorts: performanceMetrics.sortOperations + 1
    });

    return sorted;
  }, [sortBy, order, initialContributors]);

  const badgesMap = assignBadges(sortedContributors);

  // 🎯 Sort handler with logging
  const handleSortChange = useCallback((newSortBy) => {
    const previousSort = sortBy;
    setSortBy(newSortBy);
    
    setPerformanceMetrics(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));

    logDebug('🎯 Sort criteria changed', {
      previous: previousSort,
      new: newSortBy,
      order,
      totalInteractions: performanceMetrics.interactions + 1
    });
  }, [sortBy, order, performanceMetrics.interactions]);

  // 🎯 Order handler with logging
  const handleOrderChange = useCallback((newOrder) => {
    const previousOrder = order;
    setOrder(newOrder);
    
    setPerformanceMetrics(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));

    logDebug('🔄 Sort order changed', {
      previous: previousOrder,
      new: newOrder,
      sortBy,
      totalInteractions: performanceMetrics.interactions + 1
    });
  }, [order, sortBy, performanceMetrics.interactions]);

  // 🎯 Contributor selection handler with logging
  const handleContributorSelect = useCallback((contributor) => {
    setSelectedContributor(contributor);
    
    setPerformanceMetrics(prev => ({
      ...prev,
      modalViews: prev.modalViews + 1,
      interactions: prev.interactions + 1
    }));

    logDebug('👤 Contributor selected', {
      name: contributor.name,
      level: getLevel(calculatePoints(contributor)),
      badges: assignBadges([contributor])[contributor.id]?.length || 0,
      totalModalViews: performanceMetrics.modalViews + 1
    });
  }, [performanceMetrics.modalViews, performanceMetrics.interactions]);

  // 🎯 Modal close handler with logging
  const handleModalClose = useCallback(() => {
    logDebug('❌ Modal closed', { 
      contributor: selectedContributor?.name,
      viewDuration: 'N/A' // Could track this with more complex state
    });
    setSelectedContributor(null);
  }, [selectedContributor]);

  // 🎯 Keyboard navigation support
  const handleKeyDown = (event, action, data) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (action === 'select_contributor') {
        handleContributorSelect(data);
      } else if (action === 'close_modal') {
        handleModalClose();
      }
    } else if (event.key === 'Escape' && selectedContributor) {
      handleModalClose();
    }
  };

  // 🎯 Get contributor statistics
  const getContributorStats = () => {
    const totalPoints = sortedContributors.reduce((sum, c) => sum + calculatePoints(c), 0);
    const averagePoints = totalPoints / sortedContributors.length;
    const topContributor = sortedContributors[0];
    
    return {
      totalContributors: sortedContributors.length,
      averagePoints: averagePoints.toFixed(1),
      topContributor: topContributor?.name || 'N/A',
      topPoints: calculatePoints(topContributor) || 0
    };
  };

  const stats = getContributorStats();

  return (
    <div 
      className="p-4 max-w-5xl mx-auto"
      role="main"
      aria-label="Contributor Leaderboard"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Top Contributors</h2>

      {/* 🎯 Loading State */}
      {isLoading && (
        <div 
          className="text-center p-8 bg-white rounded-lg shadow mb-6"
          role="status"
          aria-label="Loading contributors"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading contributor data...</p>
        </div>
      )}

      {/* 🎯 Performance Metrics (Debug View) */}
      {!isLoading && process.env.NODE_ENV === 'development' && (
        <div 
          className="bg-blue-50 p-3 rounded-lg mb-6 text-center text-sm text-blue-800"
          role="complementary"
          aria-label="Performance Statistics"
        >
          <strong>📊 Debug Stats:</strong> {performanceMetrics.sortOperations} sorts •{' '}
          {performanceMetrics.modalViews} modal views • {performanceMetrics.interactions} interactions
          {performanceMetrics.tableRenderTime && (
            ` • Rendered in ${performanceMetrics.tableRenderTime.toFixed(2)}ms`
          )}
        </div>
      )}

      {/* Sort Controls */}
      <div 
        className="flex flex-wrap gap-4 justify-center mb-6"
        role="toolbar"
        aria-label="Sorting controls"
      >
        <label className="flex items-center gap-2">
          <span className="font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border px-3 py-1 rounded-md shadow-sm"
            aria-label="Select field to sort by"
          >
            <option value="commits">Commits</option>
            <option value="content">Content</option>
            <option value="quizPoints">Quiz Points</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="font-medium">Order:</span>
          <select
            value={order}
            onChange={(e) => handleOrderChange(e.target.value)}
            className="border px-3 py-1 rounded-md shadow-sm"
            aria-label="Select sort order"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>

      {/* 🎯 Contributor Statistics */}
      {!isLoading && (
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          role="complementary"
          aria-label="Contributor statistics"
        >
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalContributors}</div>
            <div className="text-sm text-gray-600">Total Contributors</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">{stats.averagePoints}</div>
            <div className="text-sm text-gray-600">Average Points</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.topContributor}</div>
            <div className="text-sm text-gray-600">Top Contributor</div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      {!isLoading && (
        <div className="overflow-x-auto">
          <table 
            className="w-full border-collapse border border-gray-300 rounded-lg shadow"
            role="grid"
            aria-label="Contributors leaderboard"
          >
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th scope="col" className="border px-4 py-2 text-left">Name</th>
                <th scope="col" className="border px-4 py-2 text-center">Commits</th>
                <th scope="col" className="border px-4 py-2 text-center">Content</th>
                <th scope="col" className="border px-4 py-2 text-center">Quiz Points</th>
                <th scope="col" className="border px-4 py-2 text-center">Level</th>
                <th scope="col" className="border px-4 py-2 text-center">Badges</th>
              </tr>
            </thead>
            <tbody>
              {sortedContributors.map((c, index) => {
                const totalPoints = calculatePoints(c);
                const level = getLevel(totalPoints);
                const contributorBadges = badgesMap[c.id] || [];
                const isTopThree = index < 3;

                return (
                  <tr
                    key={c.id}
                    className={`${
                      isTopThree ? "bg-yellow-100 font-semibold" : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition-colors`}
                    role="row"
                    aria-rowindex={index + 2}
                  >
                    <td
                      className="border px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                      onClick={() => handleContributorSelect(c)}
                      onKeyDown={(e) => handleKeyDown(e, 'select_contributor', c)}
                      role="gridcell"
                      tabIndex={0}
                      aria-label={`View details for ${c.name}`}
                    >
                      {c.name}
                      {isTopThree && (
                        <span className="ml-2" aria-label={`Rank ${index + 1}`}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                      )}
                    </td>
                    <td className="border px-4 py-2 text-center" role="gridcell">{c.commits}</td>
                    <td className="border px-4 py-2 text-center" role="gridcell">{c.content}</td>
                    <td className="border px-4 py-2 text-center" role="gridcell">{c.quizPoints}</td>
                    <td className="border px-4 py-2 text-center font-medium" role="gridcell">{level}</td>
                    <td className="border px-4 py-2" role="gridcell">
                      {contributorBadges.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {contributorBadges.map((badge, i) => (
                            <span
                              key={i}
                              className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
                              aria-label={`Badge: ${badge}`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs">No Badges</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Contributor Modal */}
      {selectedContributor && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-label={`Details for ${selectedContributor.name}`}
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-lg shadow-lg w-96 max-h-90vh overflow-hidden relative"
            role="document"
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
              onClick={handleModalClose}
              onKeyDown={(e) => handleKeyDown(e, 'close_modal')}
              aria-label="Close contributor details"
              tabIndex={0}
            >
              ✖
            </button>
            <div className="text-center p-6">
              <img
                src={selectedContributor.avatar}
                alt={`Avatar of ${selectedContributor.name}`}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-200"
              />
              <h3 className="text-xl font-bold mb-2">{selectedContributor.name}</h3>
              <p className="mb-1">
                <strong>Level:</strong> {getLevel(calculatePoints(selectedContributor))}
              </p>
              <p className="mb-2">
                <strong>Total Points:</strong> {calculatePoints(selectedContributor).toFixed(1)}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {assignBadges([selectedContributor])[selectedContributor.id]?.map((badge, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h4 className="font-semibold mb-2">Contribution History:</h4>
              <ul 
                className="text-left text-sm max-h-48 overflow-y-auto border rounded p-2"
                role="list"
                aria-label="Contribution history"
              >
                {selectedContributor.history.map((h, i) => (
                  <li key={i} className="border-b py-1 last:border-b-0" role="listitem">
                    <strong>{h.date}:</strong> Commits {h.commits}, Content {h.content}, Quiz Points {h.quizPoints}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 🎯 Accessibility Helper */}
      {!isLoading && (
        <div 
          className="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-700 text-center"
          role="complementary"
          aria-label="Accessibility information"
        >
          <strong>♿ Accessibility:</strong> Use Tab to navigate the table. Press Enter or Space to view contributor details. 
          Press Escape to close the modal. Screen reader users can navigate using standard grid commands.
        </div>
      )}
    </div>
  );
};

export default ContributorBoard;
