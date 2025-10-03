import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { learnSections } from "../utils/navigation";
import { Search } from "lucide-react";
import { useTheme } from "../ThemeContext"; // ⬅️ use your theme context
import "../styles/LearnLanding.css";

const BINARY_TREE_PATH = "/data-structures/binary-tree";

const LearnLanding = () => {
  const [q, setQ] = useState("");
  const { theme } = useTheme(); // "dark" | "light"

  const filtered = useMemo(() => {
    if (!q.trim()) return learnSections;
    const lower = q.toLowerCase();
    return learnSections
      .map((sec) => ({
        ...sec,
        items: sec.items.filter((it) =>
          it.label.toLowerCase().includes(lower)
        ),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [q]);

  return (
      <div className={`learn-page ${theme}`}>
      <div className="learn-wrap">
        <header className="learn-hero">
          <h1>Learn by Topic</h1>
          <p>Explore visualizers, overviews, and comparisons across core CS topics.</p>

          <div className="learn-search">
            <Search size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search topics & pages…"
              aria-label="Search learn topics"
            />
            {q && <button onClick={() => setQ("")} aria-label="Clear search">Clear</button>}
          </div>
        </header>

        <section className="learn-grid enhanced-learn-grid">
          {filtered.map((sec) => (
            <article key={sec.id || sec.heading} className="learn-card enhanced-learn-card">
              <h3>{sec.heading}</h3>
              <ul>
                {sec.items.map((it) => (
                  <li key={it.path}>
                    <Link to={it.path}>{it.label}</Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
  </section>

        <aside className="learn-feature">
          <div className="feature-pill">Featured</div>
          <div className="feature-title">🌳 Binary Tree Visualizer</div>
          <p>Insert, delete, traverse—see the structure evolve in real time. Perfect for interview prep.</p>
          <Link className="feature-cta" to={BINARY_TREE_PATH}>
            Open Visualizer
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default LearnLanding;
