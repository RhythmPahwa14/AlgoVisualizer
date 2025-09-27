// src/pages/GameSearchOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import GameSearchPage from "./GameSearchPage"; // Your visualizer component
import AOS from "aos";
import "aos/dist/aos.css";

const GameSearchOverview = () => {
  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">Game Search Algorithms</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Game search algorithms are used in AI to determine the best move in two-player or multi-agent games.
        They explore the game tree to find optimal strategies, considering opponent moves and probabilistic outcomes.
      </p>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--text-color)",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "var(--accent-primary)",
          }}
        >
          Goal
        </span>{" "}
        : Efficiently evaluate game positions and select the optimal move using search techniques.
      </p>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="200">
        <div className="theme-card-header">
          <h3>What are Game Search Algorithms?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          Game search algorithms explore the possible moves in a game to determine the best course of action.
          Common algorithms include Minimax, Alpha-Beta Pruning, Expectimax, and Monte Carlo Tree Search (MCTS).
          These algorithms are widely used in board games like Chess, Tic-Tac-Toe, and Go, as well as in decision-making AI systems.
        </p>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Minimax explores all possible moves to find optimal strategies for two-player games</li>
          <li>Alpha-Beta Pruning optimizes Minimax by cutting off unnecessary branches</li>
          <li>Expectimax handles stochastic or probabilistic games</li>
          <li>Monte Carlo Tree Search (MCTS) uses simulations to estimate the best moves</li>
          <li>Efficient exploration of the game tree is key to AI performance</li>
        </ul>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="400">
        <div className="theme-card-header">
          <h3>⚡ Complexity Analysis</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Minimax</td>
              <td>O(b^d)</td>
              <td>O(d)</td>
              <td>b = branching factor, d = depth of tree; explores all game states</td>
            </tr>
            <tr>
              <td>Alpha-Beta Pruning</td>
              <td>O(b^(d/2))</td>
              <td>O(d)</td>
              <td>Prunes branches not affecting outcome; same optimal result as Minimax</td>
            </tr>
            <tr>
              <td>Expectimax</td>
              <td>O(b^d)</td>
              <td>O(d)</td>
              <td>Handles probabilistic moves; evaluates expected utility instead of min/max</td>
            </tr>
            <tr>
              <td>Monte Carlo Tree Search (MCTS)</td>
              <td>O(n)</td>
              <td>O(n)</td>
              <td>Uses simulations; n = number of iterations; balances exploration/exploitation</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Include your interactive game search visualizer */}
      <GameSearchPage />
    </div>
  );
};

export default GameSearchOverview;
