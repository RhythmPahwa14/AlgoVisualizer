

/**
 * Trie (Prefix Tree) implementation with animation steps
 *
 * A Trie is a tree-like data structure used to store a dynamic set of strings.
 * It is particularly efficient for operations involving prefixes, such as searching
 * for words with a given prefix or autocomplete functionalities.
 *
 * Core Components:
 * - TrieNode: Contains a Map of child nodes and an isEndOfWord flag
 * - Root Node: Starting point for all operations (doesn't represent a character)
 *
 * Key Operations:
 * - insert(word): Builds the trie structure for the word
 * - search(word): Checks if the exact word exists
 * - searchPrefix(prefix): Finds all words starting with the prefix
 * - delete(word): Removes a word and cleans up unused nodes
 *
 * Each node represents a character in the alphabet.
 */

import React, { useState, useRef, useMemo } from "react";
import { Trie } from "./trie";
import { layoutTrie } from "./layout";
import "./TrieVisualizer.css";

export default function TrieVisualizer() {
  // Core trie state - using a ref to avoid re-renders on every operation
  const trieRef = useRef(null);
  const [trieKey, setTrieKey] = useState(0); // Force re-render key

  // Initialize trie
  if (!trieRef.current) {
    trieRef.current = new Trie();
    trieRef.current.root.id = 0;
  }

  const trie = trieRef.current;

  // UI state
  const [word, setWord] = useState("");      // single ops
  const [bulk, setBulk] = useState("");        // batch insert
  const [animateInserts, setAnimateInserts] = useState(false);
  const [stepMode, setStepMode] = useState(false);
  const [speed, setSpeed] = useState(450);
  const [isBusy, setIsBusy] = useState(false);
  const [searchResult, setSearchResult] = useState(null); // null = no result, true/false = word search result
  const [prefixResult, setPrefixResult] = useState(null); // null = no result, true/false = prefix search result
  const [lastSearchedWord, setLastSearchedWord] = useState(""); // Store the word that was searched
  const [prefixWords, setPrefixWords] = useState([]);
  const [showExplanation, setShowExplanation] = useState(true); // Toggle for Trie explanation (default: shown)

  // Animation state
  const [activePath, setActivePath] = useState([]);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [visited, setVisited] = useState([]);
  const [highlightedWords, setHighlightedWords] = useState([]);

  // Layout
  const laidOut = useMemo(() => layoutTrie(trie), [trieKey, trie.nodeIdCounter]);

  // Step runner
  const nextResolver = useRef(null);
  function waitForNextClick() {
    return new Promise((resolve) => { nextResolver.current = resolve; });
  }
  function handleNext() {
    if (nextResolver.current) {
      nextResolver.current();
      nextResolver.current = null;
    }
  }

  async function runWithSteps(steps, postApply) {
    setIsBusy(true);
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      if (s.type === "focus") {
        setActiveNodeId(s.nodeId);
        setActivePath((p) => (p[p.length - 1] === s.nodeId ? p : [...p, s.nodeId]));
      } else if (s.type === "visit") {
        setVisited((v) => (v[v.length - 1] === s.nodeId ? v : [...v, s.nodeId]));
      } else if (s.type === "apply") {
        // Force re-render after trie modification
        setTrieKey(k => k + 1);
        if (typeof postApply === "function") postApply();
      }

      if (stepMode) {
        await waitForNextClick();
      } else {
        await new Promise((r) => setTimeout(r, speed));
      }
    }
    if (typeof postApply === "function") postApply();
    setIsBusy(false);
  }

  function resetHighlights() {
    setActivePath([]);
    setActiveNodeId(null);
    setVisited([]);
    setSearchResult();
    setPrefixResult(null);
    setLastSearchedWord("");
    setPrefixWords([]);
    setHighlightedWords([]);
  }

  // Operations
  async function onInsert(e) {
    e?.preventDefault?.();
    if (word === "") return;

    resetHighlights();
    const { success, steps } = trie.insert(word);
    if (success) {
      await runWithSteps(steps);
    }
    setWord("");
  }

  async function onSearch(e) {
    e?.preventDefault?.();
    if (word === "") return;

    resetHighlights();
    const searchWord = word; // Store the word before it gets cleared
    const { found, steps, substringIn } = trie.search(searchWord);

    await runWithSteps(steps, () => {
      setSearchResult(found);
      if (!found) {
        const wrap = document.querySelector(".tv-canvas");
        wrap?.classList.add("tv-shake");
        setTimeout(() => wrap?.classList.remove("tv-shake"), 420);
      }
    });

    // Store which word contains the substring for display
    if (found && substringIn) {
      setLastSearchedWord(`${searchWord} (found in "${substringIn}")`);
    } else {
      setLastSearchedWord(searchWord);
    }
  }

  async function onPrefixSearch(e) {
    e?.preventDefault?.();
    if (word === "") return;

    resetHighlights();
    const searchWord = word; // Store the word before it gets cleared
    const { found, words, steps } = trie.searchPrefix(searchWord);

    await runWithSteps(steps, () => {
      if (found) {
        setPrefixWords(words);
        setHighlightedWords(words);
      } else {
        setSearchResult(false); // Show not found for prefix search too
        const wrap = document.querySelector(".tv-canvas");
        wrap?.classList.add("tv-shake");
        setTimeout(() => wrap?.classList.remove("tv-shake"), 420);
      }
    });
  }

  async function onDelete(e) {
    e?.preventDefault?.();
    if (word === "") return;

    resetHighlights();
    const deleteWord = word; // Store the word before it gets cleared
    const { deleted, steps, deletedWord } = trie.delete(deleteWord);

    if (deleted) {
      await runWithSteps(steps);
      // Show which word was actually deleted
      if (deletedWord) {
        // Substring deletion - show which word contained the substring
        setLastSearchedWord(`${deleteWord} (deleted word "${deletedWord}")`);
      } else {
        // Exact word deletion
        setLastSearchedWord(`${deleteWord} (deleted)`);
      }
      setSearchResult(true); // Show success message
    } else {
      const wrap = document.querySelector(".tv-canvas");
      wrap?.classList.add("tv-shake");
      setTimeout(() => wrap?.classList.remove("tv-shake"), 420);
      setLastSearchedWord(deleteWord);
      setSearchResult(false); // Show not found message
    }
    setWord("");
  }

  function onInsertMany() {
    const words = bulk
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (!words.length) return;
    resetHighlights();

    for (const w of words) {
      trie.insert(w);
    }

    // Force re-render
    setTrieKey(k => k + 1);
    setBulk("");
  }

  function onClear() {
    resetHighlights();
    // Reset trie
    trie.root = new Trie().root;
    trie.root.id = 0;
    trie.nodeIdCounter = 1;
    setTrieKey(k => k + 1);
  }

  // Keyboard shortcuts
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) onInsert(e);
      if (e.key === "Enter" && e.shiftKey) onDelete(e);
      if (e.key === "Enter" && e.ctrlKey) onSearch(e);
      if ((e.key === "n" || e.key === "N") && stepMode) handleNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepMode, word]);

  return (
    <div className="tv-wrap">
      {/* TRIE INTRODUCTION */}
      <section className="tv-intro">
        <div className="tv-intro-content">
          <h2 className="tv-intro-title">Tree (Prefix Tree) Visualizer</h2>
          <p className="tv-intro-description">
            A Trie is a tree-like data structure that stores strings efficiently. Each node represents a character,
            making it perfect for prefix-based operations like autocomplete and spell checking.
          </p>
          <div className="tv-intro-features">
            <span className="tv-feature-tag">Insert words</span>
            <span className="tv-feature-tag">Search exact words</span>
            <span className="tv-feature-tag">Find substrings</span>
            <span className="tv-feature-tag">Prefix matching</span>
            <span className="tv-feature-tag">Delete operations</span>
          </div>
        </div>
      </section>

      {/* TOP BAR */}
      <header className="tv-toolbar">
        <div className="tv-controls">
          <div className="tv-row">
            {/* Insert */}
            <div className="tv-card">
              <div className="tv-card-title">Insert Words</div>
              <div className="tv-input-row">
                <input
                  className="tv-input"
                  type="text"
                  placeholder="e.g. hello"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  disabled={isBusy && stepMode}
                />
                <button
                  className="tv-btn tv-primary"
                  onClick={onInsert}
                  disabled={isBusy && stepMode}
                  title="Insert word"
                >
                  Insert
                </button>
              </div>

              <div className="tv-subtle">Insert multiple words: spaces / commas / newlines</div>
              <div className="tv-input-row">
                <textarea
                  className="tv-input tv-textarea"
                  placeholder="hello world test"
                  value={bulk}
                  onChange={(e) => setBulk(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="tv-input-row">
                <button className="tv-btn" onClick={onInsertMany} disabled={isBusy}>
                  Insert all (instant)
                </button>
              </div>

              <label className="tv-checkbox">
                <input
                  type="checkbox"
                  checked={animateInserts}
                  onChange={(e) => setAnimateInserts(e.target.checked)}
                />
                Animate single inserts
              </label>
            </div>

            {/* Search / Delete */}
            <div className="tv-card">
              <div className="tv-card-title">Search / Delete</div>
              <div className="tv-input-row">
                <input
                  className="tv-input"
                  type="text"
                  placeholder="word or prefix"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
                <button className="tv-btn" onClick={onSearch} disabled={isBusy && stepMode}>
                  Search Word
                </button>
                <button className="tv-btn" onClick={onPrefixSearch} disabled={isBusy && stepMode}>
                  Search Prefix
                </button>
                <button className="tv-btn" onClick={onDelete} disabled={isBusy && stepMode}>
                  Delete
                </button>
              </div>

              <div className="tv-toggle-row">
                <label className="tv-checkbox">
                  <input
                    type="checkbox"
                    checked={stepMode}
                    onChange={(e) => setStepMode(e.target.checked)}
                  />
                  Step-by-step
                </label>
                <div className="tv-speed">
                  <label className="tv-speed-label">Speed</label>
                  <input
                    type="range"
                    min="200"
                    max="1200"
                    step="50"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    disabled={stepMode}
                    aria-label="Animation speed"
                  />
                </div>
                {stepMode && (
                  <button
                    className="tv-btn tv-accent"
                    type="button"
                    onClick={handleNext}
                    disabled={!isBusy}
                    title="Next step (N)"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="tv-card">
              <div className="tv-card-title">Actions</div>
              <div className="tv-actions">
                <button className="tv-btn" onClick={onClear}>Clear All</button>
              </div>
            </div>
          </div>

          <p className="tv-hint">
            Insert complete words into the Trie. Search for exact words, substrings, or prefixes.
            Press <kbd>Enter</kbd> to insert, <kbd>Shift+Enter</kbd> to delete, <kbd>Ctrl+Enter</kbd> to search.
            Press <kbd>N</kbd> to advance when Step-by-step is on.
          </p>
        </div>
      </header>

      {/* CANVAS */}
      <section className="tv-canvas" role="region" aria-label="Trie canvas">
        <svg className="tv-svg" viewBox={laidOut.viewBox.join(" ")} preserveAspectRatio="xMidYMid meet">
          {/* edges */}
          {laidOut.edges.map((edge) => (
            <line
              key={`${edge.source}-${edge.target}`}
              x1={edge.sourceNode?.x || 0}
              y1={edge.sourceNode?.y || 0}
              x2={edge.targetNode?.x || 0}
              y2={edge.targetNode?.y || 0}
              className="tv-edge"
            />
          ))}
          {/* nodes */}
          {laidOut.nodes.map((node) => {
            const isActive = node.id === activeNodeId;
            const inPath = activePath.includes(node.id);
            const isVisited = visited.includes(node.id);
            const classes = ["tv-node", isActive && "is-active", inPath && "in-path", isVisited && "is-visited", node.isEndOfWord && "is-end"]
              .filter(Boolean)
              .join(" ");
            return (
              <g key={node.id} transform={`translate(${node.x},${node.y})`} className={classes}>
                <circle r="20" />
                <text dy="6">{node.char || 'root'}</text>
              </g>
            );
          })}
        </svg>
      </section>

      {/* LEGEND */}
      <footer className="tv-legend" aria-label="Legend">
        <span className="chip chip-active" /> Current
        <span className="chip chip-path" /> Path
        <span className="chip chip-visited" /> Visited
        <span className="chip chip-end" /> End of Word
        <button
          className="tv-info-toggle"
          onClick={() => setShowExplanation(!showExplanation)}
          aria-label="Toggle Trie explanation"
        >
          {showExplanation ? 'Hide' : 'Show'} Info
        </button>
      </footer>

      {/* TRIE EXPLANATION */}
      {showExplanation && (
        <section className="tv-explanation" aria-label="Trie explanation">
          <div className="tv-explanation-content">
            <h3 className="tv-explanation-title">Trie (Prefix Tree) Implementation with Animation Steps</h3>
            <div className="tv-explanation-text-block">
              <p className="tv-explanation-text">
                A Trie is a tree-like data structure used to store a dynamic set of strings.
                It is particularly efficient for operations involving prefixes, such as searching
                for words with a given prefix or autocomplete functionalities.
              </p>

              <h4 className="tv-explanation-subtitle">Core Components:</h4>
              <ul className="tv-explanation-list">
                <li><strong>TrieNode:</strong> Contains a Map of child nodes (one for each possible character) and an isEndOfWord boolean flag that marks the end of a complete word</li>
                <li><strong>Root Node:</strong> The starting point for all operations (typically doesn't represent any character itself)</li>
                <li><strong>Edges:</strong> Represent the relationship between parent and child nodes, labeled with characters</li>
              </ul>

              <h4 className="tv-explanation-subtitle">Key Operations:</h4>
              <ul className="tv-explanation-list">
                <li><strong>insert(word):</strong> Traverses the trie character by character, creating new nodes as needed, and marks the final node as end-of-word</li>
                <li><strong>search(word):</strong> Traverses the trie following the word's characters and checks if the final node is marked as end-of-word</li>
                <li><strong>searchPrefix(prefix):</strong> Traverses to the prefix end and collects all complete words in that subtree</li>
                <li><strong>delete(word):</strong> Finds the word and removes the end-of-word marking, potentially cleaning up unused nodes</li>
              </ul>

              <h4 className="tv-explanation-subtitle">Advantages:</h4>
              <ul className="tv-explanation-list">
                <li><strong>Efficient Prefix Operations:</strong> O(m) time complexity where m is the length of the prefix</li>
                <li><strong>Space Efficient:</strong> Shares common prefixes, reducing storage compared to storing complete strings</li>
                <li><strong>Fast Lookups:</strong> No need to check every stored string - just traverse the tree</li>
                <li><strong>Autocomplete Ready:</strong> Perfect for implementing autocomplete and spell-checking features</li>
              </ul>

              <h4 className="tv-explanation-subtitle">Common Use Cases:</h4>
              <ul className="tv-explanation-list">
                <li><strong>Autocomplete Systems:</strong> Suggesting words as users type</li>
                <li><strong>Spell Checkers:</strong> Finding correctly spelled words</li>
                <li><strong>IP Routing:</strong> Longest prefix matching for network routing</li>
                <li><strong>Dictionary Implementations:</strong> Fast word lookups and prefix searches</li>
                <li><strong>Contact Lists:</strong> Searching contacts by name prefixes</li>
              </ul>

              <h4 className="tv-explanation-subtitle">How It Works:</h4>
              <div className="tv-explanation-workflow">
                <p><strong>Example:</strong> Inserting "hello", "help", "world"</p>
                <ul className="tv-explanation-steps">
                  <li>Start at root node</li>
                  <li>For "hello": create path h→e→l→l→o, mark 'o' as end-of-word</li>
                  <li>For "help": reuse h→e→l→l, then create p, mark 'p' as end-of-word</li>
                  <li>For "world": create separate path w→o→r→l→d, mark 'd' as end-of-word</li>
                  <li>Searching "he" finds the prefix exists</li>
                  <li>Searching "hello" finds the complete word</li>
                  <li>Searching "help" finds the complete word</li>
                </ul>
              </div>

              <p className="tv-explanation-note">
                <em>Each node represents a character in the alphabet. The root node is empty and serves as the entry point for all operations.</em>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SEARCH RESULTS */}
      {searchResult !== null && (
        <section className="tv-result" aria-label="Search result">
          <div className="tv-result-content">
            {lastSearchedWord} {searchResult ? "found" : "not found"} in Trie
          </div>
        </section>
      )}

      {/* PREFIX WORDS */}
      {prefixWords.length > 0 && (
        <section className="tv-words" aria-label="Prefix words">
          <div className="tv-words-head">
            <span className="tv-words-title">Words with prefix "{word}"</span>
          </div>
          <div className="tv-words-list">
            {prefixWords.map((w, i) => (
              <span key={w} className="tv-word-pill">{w}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
