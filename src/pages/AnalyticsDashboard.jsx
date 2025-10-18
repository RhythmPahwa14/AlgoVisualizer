import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const EVENTS_URL = "/sample-data/analytics-events.json";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const parseISO = (iso) => new Date(iso);

const formatDateLocal = (d) => d.toISOString().slice(0, 10);

const exportCSV = (rows, filename = "analytics-export.csv") => {
  if (!rows || rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const fetchEvents = async () => {
  const res = await fetch(EVENTS_URL);
  return res.json();
};

const AnalyticsDashboard = () => {
  const [events, setEvents] = useState(null);
  const [algorithmFilter, setAlgorithmFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchEvents().then(setEvents).catch(console.error);
  }, []);

  const algorithms = useMemo(() => {
    if (!events) return [];
    return Array.from(new Set(events.map((e) => e.algorithm))).filter(Boolean);
  }, [events]);

  const filtered = useMemo(() => {
    if (!events) return [];
    return events.filter((e) => {
      if (algorithmFilter !== "all" && e.algorithm !== algorithmFilter) return false;
      if (fromDate) {
        const from = new Date(fromDate + "T00:00:00Z");
        if (parseISO(e.timestamp) < from) return false;
      }
      if (toDate) {
        const to = new Date(toDate + "T23:59:59Z");
        if (parseISO(e.timestamp) > to) return false;
      }
      return true;
    });
  }, [events, algorithmFilter, fromDate, toDate]);

  const metrics = useMemo(() => {
    if (!filtered) return { avgTime: 0, sessions: 0, retries: 0, avgCompletionStep: 0 };

    const sessions = {};
    let totalDuration = 0;
    let durationCount = 0;
    let retryCount = 0;

    filtered.forEach((e) => {
      if (e.event === "session_start") {
        sessions[e.sessionId] = sessions[e.sessionId] || { algorithm: e.algorithm, steps: 0 };
      }
      if (e.event === "step_complete") {
        sessions[e.sessionId] = sessions[e.sessionId] || { algorithm: e.algorithm, steps: 0 };
        sessions[e.sessionId].steps = (sessions[e.sessionId].steps || 0) + 1;
      }
      if (e.event === "session_end" && typeof e.durationSec === "number") {
        totalDuration += e.durationSec;
        durationCount += 1;
      }
      if (e.event === "retry") retryCount++;
    });

    const sessionCount = durationCount; // sessions with end+duration
    const avgTime = durationCount > 0 ? totalDuration / durationCount : 0;

    // average completion = average steps across sessions
    const stepCounts = Object.values(sessions).map((s) => s.steps || 0);
    const avgCompletionStep = stepCounts.length ? stepCounts.reduce((a, b) => a + b, 0) / stepCounts.length : 0;

    return { avgTime, sessions: sessionCount, retries: retryCount, avgCompletionStep };
  }, [filtered]);

  const avgTimePerAlgo = useMemo(() => {
    if (!events) return [];
    const map = {};
    events.forEach((e) => {
      if (e.event === "session_end" && typeof e.durationSec === "number") {
        map[e.algorithm] = map[e.algorithm] || { total: 0, count: 0 };
        map[e.algorithm].total += e.durationSec;
        map[e.algorithm].count += 1;
      }
    });
    return Object.keys(map).map((k) => ({ name: k, seconds: map[k].total / map[k].count }));
  }, [events]);

  const retriesPerAlgo = useMemo(() => {
    if (!events) return [];
    const map = {};
    events.forEach((e) => {
      if (e.event === "retry") {
        map[e.algorithm] = (map[e.algorithm] || 0) + 1;
      }
    });
    return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
  }, [events]);

  const completionChartData = useMemo(() => {
    if (!events) return [];
    // Build steps progression for each algorithm per session
    const algSessions = {};
    events.forEach((e) => {
      if (!e.sessionId || !e.algorithm) return;
      algSessions[e.sessionId] = algSessions[e.sessionId] || { algorithm: e.algorithm, steps: [] };
      if (e.event === "step_complete") algSessions[e.sessionId].steps.push(e.step || null);
    });

    // Build average step completion per step index across algorithms
    const perAlgo = {};
    Object.values(algSessions).forEach((s) => {
      perAlgo[s.algorithm] = perAlgo[s.algorithm] || [];
      s.steps.forEach((_, idx) => {
        perAlgo[s.algorithm][idx] = (perAlgo[s.algorithm][idx] || 0) + 1; // count sessions reaching this step
      });
    });

    const result = [];
    Object.keys(perAlgo).forEach((alg) => {
      result.push({ algorithm: alg, counts: perAlgo[alg] });
    });
    return result;
  }, [events]);

  if (!events) return <div>Loading analytics...</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Algorithm Analytics Dashboard</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "1rem 0" }}>
        <label>
          Algorithm:
          <select value={algorithmFilter} onChange={(e) => setAlgorithmFilter(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="all">All</option>
            {algorithms.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>

        <label>
          From:
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ marginLeft: 8 }} />
        </label>

        <label>
          To:
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ marginLeft: 8 }} />
        </label>

        <ShowResultsButton filtered={filtered} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
        <div>
          <section style={{ height: 320, margin: "1rem 0" }}>
            <h3>Average Time Spent (per algorithm)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={avgTimePerAlgo} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="seconds" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </section>

          <section style={{ height: 320, margin: "1rem 0" }}>
            <h3>Step Completion (sessions reaching step index)</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={completionChartData.reduce((acc, alg) => {
                  alg.counts.forEach((count, idx) => {
                    acc[idx] = acc[idx] || { step: `Step ${idx + 1}` };
                    acc[idx][alg.algorithm] = count;
                  });
                  return acc;
                }, [])}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {completionChartData.map((alg, idx) => (
                    <Line key={alg.algorithm} type="monotone" dataKey={alg.algorithm} stroke={COLORS[idx % COLORS.length]} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <aside>
          <section style={{ marginBottom: 16 }}>
            <h3>Key Metrics</h3>
            <div>Average Time (s): {metrics.avgTime.toFixed(2)}</div>
            <div>Sessions (with duration): {metrics.sessions}</div>
            <div>Retries: {metrics.retries}</div>
            <div>Avg Steps Completed: {metrics.avgCompletionStep.toFixed(2)}</div>
          </section>

          <section>
            <h3>Most Retried</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={retriesPerAlgo} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {retriesPerAlgo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </aside>
      </div>

      <ResultsSection filtered={filtered} />
    </div>
  );
};

const ShowResultsButton = ({ filtered }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow((s) => !s)} style={{ marginLeft: 12 }}>
        {show ? "Hide Results" : `Show Results (${filtered.length})`}
      </button>
      {show && <ResultsTable filtered={filtered} />}
    </>
  );
};

const ResultsSection = ({ filtered }) => {
  return (
    <section style={{ marginTop: 24 }}>
      <h3>Filtered Events</h3>
      <ResultsTable filtered={filtered} />
    </section>
  );
};

const ResultsTable = ({ filtered }) => {
  return (
    <div style={{ maxHeight: 360, overflow: "auto", border: "1px solid #eee", borderRadius: 6 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Timestamp</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Event</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Algorithm</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Session</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e, idx) => (
            <tr key={idx}>
              <td style={{ padding: "8px 4px" }}>{new Date(e.timestamp).toLocaleString()}</td>
              <td style={{ padding: "8px 4px" }}>{e.event}</td>
              <td style={{ padding: "8px 4px" }}>{e.algorithm}</td>
              <td style={{ padding: "8px 4px" }}>{e.sessionId}</td>
              <td style={{ padding: "8px 4px" }}>{JSON.stringify({ durationSec: e.durationSec, step: e.step })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
    export default AnalyticsDashboard;
