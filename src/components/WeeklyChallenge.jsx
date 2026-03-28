import React, { useState } from "react";
import { Target, CheckCircle2 } from "lucide-react";

const challenges = [
  "Implement Binary Search",
  "Solve Pacific Atlantic Water Flow",
  "Visualize Merge Sort",
  "Build Stack from Scratch",
];

const WeeklyChallenge = () => {
  const [challenge] = useState(
    challenges[Math.floor(Math.random() * challenges.length)]
  );
  const [completed, setCompleted] = useState(false);

  return (
    <div className="p-4 bg-white rounded-2xl shadow mt-4">
      <h2 className="text-xl font-bold mb-2" style={{ display: "flex", alignItems: "center", gap: 8 }}><Target size={18} /> Weekly Challenge</h2>
      <p className="mb-2">{challenge}</p>
      <button
        onClick={() => setCompleted(true)}
        disabled={completed}
        className={`px-3 py-1 rounded ${
          completed ? "bg-green-500 text-white" : "bg-blue-500 text-white"
        }`}
      >
        {completed ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><CheckCircle2 size={14} /> Completed</span> : "Mark as Done"}
      </button>
    </div>
  );
};


export default WeeklyChallenge;
