import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import { learnSections } from "../utils/navigation";
import { Search } from "lucide-react";
import { useTheme } from "../ThemeContext"; // ⬅️ use your theme context
import "../styles/LearnLanding.css";

const BINARY_TREE_PATH = "/data-structures/binary-tree";

const LearnLanding = () => {
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { theme } = useTheme(); // "dark" | "light"

  const fuse = useMemo(() => {
    const allItems = learnSections.flatMap((sec) =>
      sec.items.map((item) => ({
        ...item,
        sectionId: sec.id,
        sectionHeading: sec.heading,
      }))
    );
    return new Fuse(allItems, {
      keys: ["label", "keywords", "description", "sectionHeading"],
      includeScore: true,
      threshold: 0.4,
    });
  }, []);

  const categories = useMemo(() => ["All", ...learnSections.map((sec) => sec.heading)], []);

  const filtered = useMemo(() => {
    // Start with all sections or filter by category if one is selected
    const baseSections =
      selectedCategory === "All"
        ? learnSections
        : learnSections.filter((sec) => sec.heading === selectedCategory);

    if (!q.trim()) return baseSections;

    const results = fuse.search(q);
    const sections = new Map();

    for (const { item } of results) {
      // Only include results that match the selected category (or all if "All" is selected)
      if (selectedCategory === "All" || item.sectionHeading === selectedCategory) {
        if (!sections.has(item.sectionId)) {
          sections.set(item.sectionId, {
            id: item.sectionId,
            heading: item.sectionHeading,
            items: [],
          });
        }
        sections.get(item.sectionId).items.push(item);
      }
    }
    return Array.from(sections.values());
  }, [q, fuse, selectedCategory]);

  return (
      <div className={`learn-page ${theme}`}>
      <div className="learn-wrap">
        <header className="learn-hero">
          <h1>Learn by Topic</h1>
          <p>Explore visualizers, overviews, and comparisons across core CS topics.</p>

          <div className="learn-search">
            <Search size={24} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search algorithms, topics, and visualizers…"
              aria-label="Search learn topics"
            />
            {q && <button onClick={() => setQ("")} aria-label="Clear search">Clear</button>}
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-filter-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        <section className="learn-grid enhanced-learn-grid">
          {/*No Results Message */}
          {filtered.length === 0 && (
            <p className="no-results">No results found. Try another search.</p>
          )}
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
