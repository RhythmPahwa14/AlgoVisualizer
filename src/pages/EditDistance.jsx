// src/pages/EditDistance.jsx
import React, { useState } from "react";

const EditDistance = () => {
  const [str1, setStr1] = useState("");
  const [str2, setStr2] = useState("");
  const [distance, setDistance] = useState(null);

  const computeEditDistance = (s1, s2) => {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }
    return dp[m][n];
  };

  const handleCompute = () => {
    setDistance(computeEditDistance(str1, str2));
  };

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
    fontFamily: "sans-serif",
  };
  const inputStyle = {
    margin: "0.5rem",
    padding: "0.5rem",
    fontSize: "1rem",
  };
  const buttonStyle = {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  };
  const resultStyle = {
    marginTop: "1rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h2>Edit Distance (Levenshtein Distance) Algorithm</h2>
      <input
        style={inputStyle}
        type="text"
        placeholder="String 1"
        value={str1}
        onChange={(e) => setStr1(e.target.value)}
      />
      <input
        style={inputStyle}
        type="text"
        placeholder="String 2"
        value={str2}
        onChange={(e) => setStr2(e.target.value)}
      />
      <button style={buttonStyle} onClick={handleCompute}>
        Compute Edit Distance
      </button>
      {distance !== null && (
        <p style={resultStyle}>
          Edit Distance between <b>{str1}</b> and <b>{str2}</b> is: <b>{distance}</b>
        </p>
      )}
    </div>
  );
};

export default EditDistance;
