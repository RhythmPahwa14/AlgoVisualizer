// src/pages/MathOverview.jsx
import React from "react";
import "../styles/global-theme.css";
import MathPage from "./MathPage"; // Your visualizer component
import AOS from 'aos';
import 'aos/dist/aos.css';

const MathOverview = () => {
  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title" style={{ marginTop: "4rem" }}>
        Guide to <span className="highlight">Mathematical Algorithms</span>
      </h1>

      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "-2rem auto 2rem auto",
          color: "var(--theme-text-secondary)",
        }}
      >
        Mathematical algorithms are essential computational procedures used to solve numerical and combinatorial problems efficiently. 
        They include number theory algorithms, modular arithmetic, prime generation, and transforms like FFT.
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
        : Understand and implement mathematical algorithms efficiently, visualizing step-by-step computation.
      </p>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="200">
        <div className="theme-card-header">
          <h3>Why Study Mathematical Algorithms?</h3>
        </div>
        <p style={{ color: "var(--theme-text-secondary)", lineHeight: 1.6 }}>
          Mathematical algorithms form the foundation of computer science, cryptography, numerical computing, and competitive programming. 
          They help solve problems involving greatest common divisors, prime numbers, modular exponentiation, and signal processing efficiently.
        </p>
      </div>

      <div className="theme-card" style={{ width: "1300px" }} data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>🌱 Key Takeaways</h3>
        </div>
        <ul className="search-points">
          <li>Algorithms for GCD, primes, modular arithmetic, and FFT</li>
          <li>Optimized approaches reduce time and space complexity</li>
          <li>Step-by-step visualization helps understand the computation process</li>
          <li>Useful in competitive programming, cryptography, and numeric computing</li>
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
              <td>GCD (Euclidean)</td>
              <td>O(log min(a,b))</td>
              <td>O(1) / O(log min(a,b)) recursion</td>
              <td>Efficient computation of greatest common divisor</td>
            </tr>
            <tr>
              <td>Sieve of Eratosthenes</td>
              <td>O(n log log n)</td>
              <td>O(n)</td>
              <td>Generates all primes ≤ n efficiently</td>
            </tr>
            <tr>
              <td>Modular Exponentiation</td>
              <td>O(log b)</td>
              <td>O(1)</td>
              <td>Computes (a^b) mod m efficiently using binary exponentiation</td>
            </tr>
            <tr>
              <td>Fast Fourier Transform (FFT)</td>
              <td>O(n log n)</td>
              <td>O(n)</td>
              <td>Efficient computation of discrete Fourier transform</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Include your interactive Math visualizer */}
      <MathPage />
    </div>
  );
};

export default MathOverview;
