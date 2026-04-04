import React, { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import { cheatsheetData } from "../data/cheatsheetData";
import "../styles/complexity-analysis-page.css";

const COMPLEXITY_ORDER = [
  "o(1)",
  "o(log n)",
  "o(sqrt(n))",
  "o(n)",
  "o(n log n)",
  "o(n^2)",
  "o(n2)",
  "o(n³)",
  "o(n3)",
  "o(2^n)",
  "o(2n)",
  "o(n!)",
];

function normalizeComplexity(value) {
  if (!value) return "N/A";
  return String(value)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3");
}

function getRank(value) {
  const normalized = normalizeComplexity(value);
  const idx = COMPLEXITY_ORDER.findIndex((item) => normalized.includes(item));
  return idx === -1 ? 6 : idx;
}

function getShade(rank) {
  if (rank <= 3) return "#000000";
  if (rank <= 6) return "#374151";
  return "#d1d5db";
}

function getWidth(rank) {
  const min = 22;
  const max = 100;
  const steps = COMPLEXITY_ORDER.length - 1;
  const width = min + ((rank + 1) / (steps + 1)) * (max - min);
  return `${Math.round(width)}%`;
}

function toRows() {
  const sorting = (cheatsheetData.sorting?.algorithms || []).map((item) => {
    const time = item.timeComplexity;
    const best = typeof time === "object" ? time.best : time || "N/A";
    const average = typeof time === "object" ? time.average || time.worst || best : time || "N/A";
    const worst = typeof time === "object" ? time.worst || time.average || best : time || "N/A";

    return {
      category: "Sorting",
      name: item.name,
      best,
      average,
      worst,
      space: item.spaceComplexity || "N/A",
    };
  });

  const searching = (cheatsheetData.searching?.algorithms || []).map((item) => {
    const time = item.timeComplexity;
    const best = typeof time === "object" ? time.best : time || "N/A";
    const average = typeof time === "object" ? time.average || time.worst || best : time || "N/A";
    const worst = typeof time === "object" ? time.worst || time.average || best : time || "N/A";

    return {
      category: "Searching",
      name: item.name,
      best,
      average,
      worst,
      space: item.spaceComplexity || "N/A",
    };
  });

  const dataStructures = (cheatsheetData.dataStructures?.structures || []).map((item) => {
    const time = item.timeComplexity || {};
    const values = Object.values(time).filter(Boolean);
    const best = values[0] || "N/A";
    const average = values[1] || values[0] || "N/A";
    const worst = values[2] || values[values.length - 1] || values[0] || "N/A";

    return {
      category: "Data Structure",
      name: item.name,
      best,
      average,
      worst,
      space: item.spaceComplexity || "N/A",
    };
  });

  return [...sorting, ...searching, ...dataStructures];
}

export default function ComplexityAnalysisPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const rows = useMemo(() => toRows(), []);
  const categories = ["All", "Sorting", "Searching", "Data Structure"];

  const filteredRows = useMemo(() => {
    if (activeCategory === "All") return rows;
    return rows.filter((row) => row.category === activeCategory);
  }, [activeCategory, rows]);

  return (
    <div className="theme-container complexity-page" data-aos="fade-up">
      <h1 className="theme-title">Complexity Analysis</h1>
      <p className="complexity-subtitle">
        Sorting, Searching, and Data Structure complexity overview with grayscale bars.
      </p>

      <div className="complexity-legend" aria-label="Complexity bar color legend">
        <span><i style={{ background: "#000000" }} /> Fast</span>
        <span><i style={{ background: "#374151" }} /> Medium</span>
        <span><i style={{ background: "#d1d5db" }} /> Heavy</span>
      </div>

      <div className="complexity-filters" aria-label="Complexity category filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`complexity-filter-btn ${activeCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="theme-card complexity-table-wrap">
        <div className="theme-card-header">
          <h3>
            <BarChart3 size={18} aria-hidden="true" />
            <span>{activeCategory === "All" ? "All Core Complexities" : `${activeCategory} Complexities`}</span>
          </h3>
        </div>

        <div className="complexity-table">
          {filteredRows.map((row) => {
            const avgRank = getRank(row.average);
            const spaceRank = getRank(row.space);
            return (
              <article className="complexity-row" key={`${row.category}-${row.name}`}>
                <div className="algo-meta">
                  <p className="algo-name">{row.name}</p>
                  <span className="algo-cat">{row.category}</span>
                </div>

                <div className="metric-group">
                  <label>Best</label>
                  <span>{row.best}</span>
                </div>
                <div className="metric-group">
                  <label>Average</label>
                  <span>{row.average}</span>
                </div>
                <div className="metric-group">
                  <label>Worst</label>
                  <span>{row.worst}</span>
                </div>
                <div className="metric-group">
                  <label>Space</label>
                  <span>{row.space}</span>
                </div>

                <div className="bar-col" title={`Average: ${row.average}`}>
                  <div className="bar-bg">
                    <div
                      className="bar-fill"
                      style={{
                        width: getWidth(avgRank),
                        background: getShade(avgRank),
                      }}
                    />
                  </div>
                </div>

                <div className="bar-col" title={`Space: ${row.space}`}>
                  <div className="bar-bg">
                    <div
                      className="bar-fill"
                      style={{
                        width: getWidth(spaceRank),
                        background: getShade(spaceRank),
                      }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
