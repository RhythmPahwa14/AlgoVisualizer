// src/components/BinaryTree/BinaryTreeVisualizer.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import "./BinaryTreeVisualizer.css";
import { insertBST, deleteBST, findBST, cloneTree } from "./utils/bst";
import { layoutTree } from "./utils/layout";

export default function BinaryTreeVisualizer() {
  // core tree
  const [root, setRoot] = useState(null);

  // UI state
  const [value, setValue] = useState("");      // single ops
  const [bulk, setBulk] = useState("");        // batch insert
  const [animateInserts, setAnimateInserts] = useState(false); // instant by default
  const [stepMode, setStepMode] = useState(false);             // off by default
  const [speed, setSpeed] = useState(450);
  const [traversal, setTraversal] = useState("inorder");
  const [isBusy, setIsBusy] = useState(false);

  // animation state
  const [activePath, setActivePath] = useState([]);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [visited, setVisited] = useState([]);

  // textual traversal order
  const [order, setOrder] = useState([]);

  // id generator
  const idCounter = useRef(1);
  function makeNode(val) {
    return { id: idCounter.current++, val, left: null, right: null };
  }

  const laidOut = useMemo(() => layoutTree(root), [root, activeNodeId]);

  function resetHighlights() {
    setActivePath([]);
    setActiveNodeId(null);
    setVisited([]);
    setOrder([]);
  }

  // ---- step runner ----
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
      } else if (s.type === "apply" && s.snapshot) {
        setRoot(cloneTree(s.snapshot));
      }

      if (stepMode) {
        // eslint-disable-next-line no-await-in-loop
        await waitForNextClick();
      } else {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, speed));
      }
    }
    if (typeof postApply === "function") postApply();
    setIsBusy(false);
  }

  // ---- helpers ----
  function parseNums(str) {
    return str
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number)
      .filter((n) => Number.isFinite(n));
  }

  // ---- ops ----
  async function onInsertOne(e) {
    e?.preventDefault?.();
    if (value === "") return;
    const num = Number(value);
    if (!Number.isFinite(num)) return;

    resetHighlights();
    const { rootAfter, steps } = insertBST(root, makeNode, num);
    if (animateInserts) {
      await runWithSteps(steps, () => setRoot(rootAfter));
    } else {
      setRoot(rootAfter); // instant
    }
    setValue("");
  }

  async function onSearch(e) {
    e?.preventDefault?.();
    if (value === "") return;
    const num = Number(value);
    if (!Number.isFinite(num)) return;

    resetHighlights();
    const { found, steps } = findBST(root, num);
    await runWithSteps(steps, () => {
      if (!found) {
        const wrap = document.querySelector(".btv-canvas");
        wrap?.classList.add("btv-shake");
        setTimeout(() => wrap?.classList.remove("btv-shake"), 420);
      }
    });
  }

  async function onDelete(e) {
    e?.preventDefault?.();
    if (value === "") return;
    const num = Number(value);
    if (!Number.isFinite(num)) return;

    resetHighlights();
    const { rootAfter, steps } = deleteBST(root, num);
    await runWithSteps(steps, () => setRoot(rootAfter));
    setValue("");
  }

  async function onInsertMany() {
    const nums = parseNums(bulk);
    if (!nums.length) return;
    resetHighlights();
    let cur = root;
    for (const n of nums) {
      const { rootAfter } = insertBST(cur, makeNode, n);
      cur = rootAfter;
    }
    setRoot(cur);     // instant batch
    setBulk("");
  }

  async function onInsertManyAnimated() {
    const nums = parseNums(bulk);
    if (!nums.length) return;
    resetHighlights();
    let cur = root;
    setIsBusy(true);
    for (const n of nums) {
      const { rootAfter, steps } = insertBST(cur, makeNode, n);
      await runWithSteps(steps);
      cur = rootAfter;
    }
    setRoot(cur);
    setBulk("");
    setIsBusy(false);
  }

  // Traversals with textual order
  async function onTraverse(kind) {
    resetHighlights();
    setTraversal(kind);

    const seq = [];
    const orderVals = [];
    const pushVisit = (node) => {
      if (!node) return;
      seq.push({ type: "visit", nodeId: node.id });
      orderVals.push(node.val);
    };

    function inorder(n) {
      if (!n) return;
      seq.push({ type: "focus", nodeId: n.id });
      inorder(n.left);
      pushVisit(n);
      inorder(n.right);
    }
    function preorder(n) {
      if (!n) return;
      seq.push({ type: "focus", nodeId: n.id });
      pushVisit(n);
      preorder(n.left);
      preorder(n.right);
    }
    function postorder(n) {
      if (!n) return;
      seq.push({ type: "focus", nodeId: n.id });
      postorder(n.left);
      postorder(n.right);
      pushVisit(n);
    }
    function level(n) {
      const q = [];
      if (n) q.push(n);
      while (q.length) {
        const cur = q.shift();
        seq.push({ type: "focus", nodeId: cur.id });
        pushVisit(cur);
        if (cur.left) q.push(cur.left);
        if (cur.right) q.push(cur.right);
      }
    }

    if (kind === "inorder") inorder(root);
    if (kind === "preorder") preorder(root);
    if (kind === "postorder") postorder(root);
    if (kind === "level") level(root);

    setOrder(orderVals); // show the order immediately
    await runWithSteps(seq);
  }

  function onClear() {
    resetHighlights();
    setRoot(null);
    setOrder([]);
  }

  // keyboard: Enter inserts; shift+Enter deletes; N advances in step mode
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Enter" && !e.shiftKey) onInsertOne(e);
      if (e.key === "Enter" && e.shiftKey) onDelete(e);
      if ((e.key === "n" || e.key === "N") && stepMode) handleNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepMode, value, root]);

  return (
    <div className="btv-wrap">
      {/* TOP BAR */}
      <header className="btv-toolbar">
        <div className="btv-controls">
          <div className="btv-row">
            {/* Insert */}
            <div className="btv-card">
              <div className="btv-card-title">Insert (fast)</div>
              <div className="btv-input-row">
                <input
                  className="btv-input"
                  type="number"
                  placeholder="e.g. 50"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={isBusy && stepMode}
                />
                <button
                  className="btv-btn btv-primary"
                  onClick={onInsertOne}
                  disabled={isBusy && stepMode}
                  title="Insert instantly"
                >
                  Insert
                </button>
              </div>

              <div className="btv-subtle">Paste many: spaces / commas / newlines</div>
              <div className="btv-input-row">
                <textarea
                  className="btv-input btv-textarea"
                  placeholder="50 30,70 20,40 60 80"
                  value={bulk}
                  onChange={(e) => setBulk(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="btv-input-row">
                <button className="btv-btn" onClick={onInsertMany} disabled={isBusy}>
                  Insert all (instant)
                </button>
                <button
                  className="btv-btn"
                  onClick={onInsertManyAnimated}
                  disabled={isBusy}
                  title="Show each path"
                >
                  Insert all (animated)
                </button>
              </div>

              <label className="btv-checkbox">
                <input
                  type="checkbox"
                  checked={animateInserts}
                  onChange={(e) => setAnimateInserts(e.target.checked)}
                />
                Animate single inserts
              </label>
            </div>

            {/* Search / Delete */}
            <div className="btv-card">
              <div className="btv-card-title">Search / Delete</div>
              <div className="btv-input-row">
                <input
                  className="btv-input"
                  type="number"
                  placeholder="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button className="btv-btn" onClick={onSearch} disabled={isBusy && stepMode}>
                  Search
                </button>
                <button className="btv-btn" onClick={onDelete} disabled={isBusy && stepMode}>
                  Delete
                </button>
              </div>

              <div className="btv-toggle-row">
                <label className="btv-checkbox">
                  <input
                    type="checkbox"
                    checked={stepMode}
                    onChange={(e) => setStepMode(e.target.checked)}
                  />
                  Step-by-step
                </label>
                <div className="btv-speed">
                  <label className="btv-speed-label">Speed</label>
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
                    className="btv-btn btv-accent"
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

            {/* Traversals */}
            <div className="btv-card">
              <div className="btv-card-title">Traversals</div>
              <div className="btv-seg" role="group" aria-label="Traversal">
                {[
                  ["inorder", "Inorder"],
                  ["preorder", "Preorder"],
                  ["postorder", "Postorder"],
                  ["level", "Level"],
                ].map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    className={`btv-seg-btn ${traversal === k ? "is-active" : ""}`}
                    onClick={() => onTraverse(k)}
                    disabled={!root || (isBusy && stepMode)}
                    aria-pressed={traversal === k}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="btv-actions">
                <button className="btv-btn" onClick={onClear}>Clear</button>
              </div>
            </div>
          </div>

          <p className="btv-hint">
            Insert many instantly, then pick a traversal to see the path and the exact visiting order.
            Press <kbd>N</kbd> to advance when Step-by-step is on. Shift+Enter deletes the current value.
          </p>
        </div>
      </header>

      {/* CANVAS */}
      <section className="btv-canvas" role="region" aria-label="Binary tree canvas">
        <svg className="btv-svg" viewBox={laidOut.viewBox.join(" ")} preserveAspectRatio="xMidYMid meet">
          {/* edges */}
          {laidOut.links.map((l) => (
            <line
              key={`${l.source.id}-${l.target.id}`}
              x1={l.source.x}
              y1={l.source.y}
              x2={l.target.x}
              y2={l.target.y}
              className="btv-edge"
            />
          ))}
          {/* nodes */}
          {laidOut.nodes.map((n) => {
            const isActive = n.id === activeNodeId;
            const inPath = activePath.includes(n.id);
            const isVisited = visited.includes(n.id);
            const classes = ["btv-node", isActive && "is-active", inPath && "in-path", isVisited && "is-visited"]
              .filter(Boolean)
              .join(" ");
            return (
              <g key={n.id} transform={`translate(${n.x},${n.y})`} className={classes}>
                <circle r="20" />
                <text dy="6">{n.val}</text>
              </g>
            );
          })}
        </svg>
      </section>

      {/* LEGEND */}
      <footer className="btv-legend" aria-label="Legend">
        <span className="chip chip-active" /> Current
        <span className="chip chip-path" /> Path
        <span className="chip chip-visited" /> Visited
      </footer>

      {/* TRAVERSAL ORDER */}
      {order.length > 0 && (
        <section className="btv-order" aria-label="Traversal order">
          <div className="btv-order-head">
            <span className="btv-order-title">
              {traversal === "inorder" && "Inorder"}
              {traversal === "preorder" && "Preorder"}
              {traversal === "postorder" && "Postorder"}
              {traversal === "level" && "Level-order"} order
            </span>
            <button
              className="btv-btn btv-order-copy"
              type="button"
              onClick={() => navigator.clipboard?.writeText(order.join(" "))}
              title="Copy order"
            >
              Copy
            </button>
          </div>

          <div className="btv-order-line" role="list">
            {order.map((v, i) => (
              <React.Fragment key={`${v}-${i}`}>
                <span role="listitem" className="btv-pill">{v}</span>
                {i < order.length - 1 && <span className="btv-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
