import React from "react";
import { useParams, Link } from "react-router-dom";
import { ALGORITHM_PSEUDOCODE } from "../data/pseudocode";
import "../styles/SortingDoc.css";

/**
 * Minimal info map so Bubble + Selection have friendly text even
 * if ALGORITHM_INFO isn't fully populated. If you already keep
 * ALGORITHM_INFO elsewhere, you can import and use that instead.
 */
const INFO = {
  bubbleSort: {
    name: "Bubble Sort",
    description:
      "Compares adjacent elements and swaps them if out of order; largest element bubbles to the end each pass.",
    timeComplexity: "O(n²)",
    bestCase: "O(n) with early exit",
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
    pattern: "Adjacent compare & swap",
  },
  selectionSort: {
    name: "Selection Sort",
    description:
      "Repeatedly selects the minimum from the unsorted portion and swaps it into the front.",
    timeComplexity: "O(n²)",
    bestCase: "O(n²)",
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
    pattern: "Select min and place",
  },
};

export default function SortingDoc() {
  const { algoId } = useParams();

  // Only Bubble + Selection are implemented
  const supported = algoId === "bubbleSort" || algoId === "selectionSort";
  if (!supported) {
    return (
      <div className="doc-page">
        <header className="doc-hero">
          <h1 className="doc-title">Documentation not available</h1>
          <p className="muted">
            Docs for <code>{algoId}</code> are not implemented yet.
          </p>
          <div className="cta-row">
            <Link className="btn" to="/data-structures">
              Back to Overview
            </Link>
            <Link className="btn primary" to="/sorting">
              Open Visualizer
            </Link>
          </div>
        </header>
      </div>
    );
  }

  const info = INFO[algoId];
  const steps = ALGORITHM_PSEUDOCODE?.[algoId] || [];

  return (
    <div className="doc-page">
      <header className="doc-hero">
        <div className="hero-text">
          <h1 className="doc-title">
            {info.name} <span className="tag">docs</span>
          </h1>
          <p className="muted">{info.description}</p>

          <nav className="cta-row" aria-label="Quick links">
            <Link to="/sorting" className="btn primary">
              Open Visualizer
            </Link>
            {steps.length > 0 && (
              <a className="btn" href="#pseudocode">
                Pseudocode
              </a>
            )}
            <a className="btn" href="#walkthrough">
              Walkthrough
            </a>
          </nav>
        </div>
      </header>

      <section className="stats-grid" aria-label="Key properties">
        <article className="stat-card" role="article">
          <h3>Time Complexity</h3>
          <p>
            <strong>Avg/Worst:</strong> {info.timeComplexity}
          </p>
          <p>
            <strong>Best:</strong> {info.bestCase}
          </p>
        </article>
        <article className="stat-card" role="article">
          <h3>Space</h3>
          <p>
            <strong>{info.spaceComplexity}</strong>
            {info.inPlace ? " (in-place)" : ""}
          </p>
        </article>
        <article className="stat-card" role="article">
          <h3>Stable</h3>
          <p>
            <strong>{info.stable ? "Yes" : "No"}</strong>
          </p>
        </article>
        <article className="stat-card" role="article">
          <h3>Pattern</h3>
          <p>{info.pattern}</p>
        </article>
      </section>

      {steps.length > 0 && (
        <section id="pseudocode" className="doc-section">
          <h2>Pseudocode</h2>
          <ol className="pseudo-list" role="list">
            {steps.map((s, i) => (
              <li key={i} className="pseudo-step">
                <pre>
                  <code>{s.code}</code>
                </pre>
                {s.explain && <p className="muted">{s.explain}</p>}
              </li>
            ))}
          </ol>
          {algoId === "bubbleSort" && (
            <details className="tip">
              <summary>Optimization tip</summary>
              <p>Track last swap index to shrink the next pass range.</p>
            </details>
          )}
        </section>
      )}

      <section id="walkthrough" className="doc-section">
        <h2>Step-by-step walkthrough</h2>

        {algoId === "bubbleSort" && (
          <>
            <p className="muted">
              Example: <code>[5, 1, 4, 2, 8]</code>
            </p>
            <ol className="steps" role="list">
              <li className="step">
                <div className="step-no">1</div>
                <div className="step-body">
                  <p>
                    <strong>Pass 1</strong>: bubble <code>8</code> to the end.
                  </p>
                </div>
              </li>
              <li className="step">
                <div className="step-no">2</div>
                <div className="step-body">
                  <p>
                    <strong>Pass 2</strong>: bubble next largest (
                    <code>5</code>).
                  </p>
                </div>
              </li>
              <li className="step">
                <div className="step-no">3</div>
                <div className="step-body">
                  <p>
                    <strong>Stop early</strong> if no swaps in a pass.
                  </p>
                </div>
              </li>
            </ol>
          </>
        )}

        {algoId === "selectionSort" && (
          <>
            <p className="muted">
              Example: <code>[29, 10, 14, 37, 14]</code>
            </p>
            <ol className="steps" role="list">
              <li className="step">
                <div className="step-no">1</div>
                <div className="step-body">
                  <p>
                    <strong>Pass 1</strong>: find min (
                    <code>10</code>) in the whole array, swap with index{" "}
                    <code>0</code>.
                  </p>
                </div>
              </li>
              <li className="step">
                <div className="step-no">2</div>
                <div className="step-body">
                  <p>
                    <strong>Pass 2</strong>: find min in the subarray starting
                    at index <code>1</code> (<code>14</code>), swap with{" "}
                    <code>1</code>.
                  </p>
                </div>
              </li>
              <li className="step">
                <div className="step-no">3</div>
                <div className="step-body">
                  <p>
                    Continue until the array is sorted. Selection Sort does the
                    same number of comparisons regardless of existing order.
                  </p>
                </div>
              </li>
            </ol>
          </>
        )}
      </section>

      <section className="doc-section">
        <h2>Reference implementation</h2>

        {algoId === "bubbleSort" && (
          <>
            <h3>JavaScript</h3>
            <pre>
              <code>{`function bubbleSort(arr) {
  const a = arr.slice();
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return a;
}`}</code>
            </pre>
          </>
        )}

        {algoId === "selectionSort" && (
          <>
            <h3>JavaScript</h3>
            <pre>
              <code>{`function selectionSort(arr) {
  const a = arr.slice();
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [a[i], a[minIdx]] = [a[minIdx], a[i]];
  }
  return a;
}`}</code>
            </pre>
          </>
        )}
      </section>

      <section className="doc-section center">
        <Link to="/sorting" className="btn primary lg">
          Try in Visualizer
        </Link>
      </section>
    </div>
  );
}
