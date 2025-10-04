import React, { createContext, useState, useContext } from "react";

// Create the context
const AlgorithmContext = createContext();

// Provider component
export const AlgorithmProvider = ({ children }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");
  const [difficultyLevel, setDifficultyLevel] = useState("easy"); // optional

  return (
    <AlgorithmContext.Provider
      value={{
        selectedAlgorithm,
        setSelectedAlgorithm,
        difficultyLevel,
        setDifficultyLevel,
      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

// Custom hook for easier usage
export const useAlgorithm = () => {
  const context = useContext(AlgorithmContext);
  if (!context) {
    throw new Error("useAlgorithm must be used within an AlgorithmProvider");
  }
  return context;
};
