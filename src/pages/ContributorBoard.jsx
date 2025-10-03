import React, { useState } from "react";
import { contributors as initialContributors } from "../data/contributors";

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

  const sortedContributors = [...initialContributors].sort((a, b) => {
    if (order === "asc") return a[sortBy] - b[sortBy];
    else return b[sortBy] - a[sortBy];
  });

  const badgesMap = assignBadges(sortedContributors);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Top Contributors</h2>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <label className="flex items-center gap-2">
          <span className="font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-1 rounded-md shadow-sm"
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
            onChange={(e) => setOrder(e.target.value)}
            className="border px-3 py-1 rounded-md shadow-sm"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-center">Commits</th>
              <th className="border px-4 py-2 text-center">Content</th>
              <th className="border px-4 py-2 text-center">Quiz Points</th>
              <th className="border px-4 py-2 text-center">Level</th>
              <th className="border px-4 py-2 text-center">Badges</th>
            </tr>
          </thead>
          <tbody>
            {sortedContributors.map((c, index) => {
              const totalPoints = calculatePoints(c);
              const level = getLevel(totalPoints);
              const contributorBadges = badgesMap[c.id] || [];

              return (
                <tr
                  key={c.id}
                  className={`${
                    index < 3 ? "bg-yellow-100 font-semibold" : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td
                    className="border px-4 py-2 cursor-pointer text-blue-600 hover:underline"
                    onClick={() => setSelectedContributor(c)}
                  >
                    {c.name}
                  </td>
                  <td className="border px-4 py-2 text-center">{c.commits}</td>
                  <td className="border px-4 py-2 text-center">{c.content}</td>
                  <td className="border px-4 py-2 text-center">{c.quizPoints}</td>
                  <td className="border px-4 py-2 text-center font-medium">{level}</td>
                  <td className="border px-4 py-2">
                    {contributorBadges.length > 0
                      ? contributorBadges.map((badge, i) => (
                          <span
                            key={i}
                            className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mr-1"
                          >
                            {badge}
                          </span>
                        ))
                      : <span className="text-gray-500 text-xs">No Badges</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Contributor Modal */}
      {selectedContributor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
              onClick={() => setSelectedContributor(null)}
            >
              ✖
            </button>
            <div className="text-center">
              <img
                src={selectedContributor.avatar}
                alt={selectedContributor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{selectedContributor.name}</h3>
              <p className="mb-1">Level: {getLevel(calculatePoints(selectedContributor))}</p>
              <p className="mb-2">Total Points: {calculatePoints(selectedContributor)}</p>
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
              <ul className="text-left text-sm max-h-48 overflow-y-auto">
                {selectedContributor.history.map((h, i) => (
                  <li key={i} className="border-b py-1">
                    {h.date}: Commits {h.commits}, Content {h.content}, Quiz Points {h.quizPoints}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributorBoard;
