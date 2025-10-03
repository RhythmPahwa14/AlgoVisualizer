// src/pages/SortingDoc.jsx
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ALGORITHM_INFO } from "../data/algorithmInfo";
import { ALGORITHM_PSEUDOCODE as PSEUDO } from "../data/pseudocode";
import { sortingAlgorithms as CODE } from "../data/allCodes";
import "../styles/SortingDoc.css";

/* helpers */
function normalizeStable(v) {
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "string") return v;
  return String(v ?? "Unknown");
}

const toCamel = (s = "") =>
  s
    .trim()
    .replace(/[_\s]+/g, "-")
    .toLowerCase()
    .replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const toSlug = (s = "") =>
  s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();

const toTitle = (k = "") =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

export default function SortingDoc() {
  const { algoId = "" } = useParams();

  // nested structure under .sorting
  const INFO_ROOT = ALGORITHM_INFO?.sorting ?? {};
  const PSEUDO_ROOT = PSEUDO?.sorting ?? PSEUDO ?? {};
  const CODE_ROOT = CODE?.sorting ?? CODE ?? {};

  const resolvedKey = useMemo(() => {
    const incoming = algoId.trim();

    if (INFO_ROOT[incoming]) return incoming;
    const camel = toCamel(incoming);
    if (INFO_ROOT[camel]) return camel;

    const keys = Object.keys(INFO_ROOT);
    return keys.find((k) => toSlug(k) === incoming.toLowerCase()) || null;
  }, [algoId, INFO_ROOT]);

  const info = resolvedKey ? INFO_ROOT[resolvedKey] : null;
  const pseudo = resolvedKey ? PSEUDO_ROOT?.[resolvedKey] : null;
  const code = resolvedKey ? CODE_ROOT?.[resolvedKey] : null;

  const title = useMemo(() => toTitle(resolvedKey || algoId || ""), [
    resolvedKey,
    algoId,
  ]);

  if (!info) {
    return (
      <div className="doc-page">
        <header className="doc-hero">
          <h1 className="doc-title">Documentation not available</h1>
          <p className="muted">No docs found for “{algoId}”.</p>
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

  return (
    <div className="doc-page">
      {/* HERO */}
      <header className="doc-hero">
        <div className="hero-text">
          <h1 className="doc-title">
            {title} <span className="tag">docs</span>
          </h1>
          <p className="muted">
            {info.description ?? "No description available."}
          </p>

          <div className="cta-row" aria-label="Quick links">
            <Link to="/sorting" className="btn primary">
              Open Visualizer
            </Link>
            {Array.isArray(pseudo) && pseudo.length > 0 && (
              <a className="btn" href="#pseudocode">
                Pseudocode
              </a>
            )}
            {code && (
              <a className="btn" href="#reference">
                Reference
              </a>
            )}
          </div>
        </div>
      </header>

      {/* KEY PROPERTIES */}
      <section className="doc-section" aria-label="Key properties">
        <h2>Key Properties</h2>
        <div className="stats-grid">
          <article className="stat-card">
            <h3>Time Complexity</h3>
            <p>
              <strong>Avg/Worst:</strong> {info.timeComplexity}
            </p>
            <p>
              <strong>Best:</strong> {info.bestCase}
            </p>
          </article>

          <article className="stat-card">
            <h3>Space</h3>
            <p>
              <strong>{info.spaceComplexity}</strong>
            </p>
          </article>

          <article className="stat-card">
            <h3>Stable</h3>
            <p>
              <strong>{normalizeStable(info.stable)}</strong>
            </p>
          </article>

          <article className="stat-card callout success">
            <strong>Tip:</strong> Try the same input in the visualizer and see
            how {title} behaves on nearly-sorted vs. reversed arrays.
          </article>
        </div>
      </section>

      {/* PSEUDOCODE */}
      {Array.isArray(pseudo) && pseudo.length > 0 && (
        <section id="pseudocode" className="doc-section">
          <h2>Pseudocode</h2>
          <div className="steps">
            {pseudo.map((step, i) => (
              <div className="step" key={i}>
                <div className="step-no">{i + 1}</div>
                <div className="step-body">
                  <pre>
                    <code>{step.code}</code>
                  </pre>
                  {step.explain && <p className="muted">{step.explain}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REFERENCE */}
      {code && (
        <section id="reference" className="doc-section">
          <h2>Reference Implementation</h2>
          {code.java && (
            <>
              <h3>Java</h3>
              <pre>
                <code>{code.java}</code>
              </pre>
            </>
          )}
          {code.python && (
            <>
              <h3>Python</h3>
              <pre>
                <code>{code.python}</code>
              </pre>
            </>
          )}
          {code.cpp && (
            <>
              <h3>C++</h3>
              <pre>
                <code>{code.cpp}</code>
              </pre>
            </>
          )}
        </section>
      )}

      {/* CTA */}
      <section className="doc-section center">
        <div className="callout success">
          Ready to experiment? Try small arrays (n ≤ 10) first, then scale up
          and compare {title} with other algorithms.
        </div>
        <Link to="/sorting" className="btn primary lg">
          Try in Visualizer
        </Link>
      </section>
    </div>
  );
}
