import React from "react";

export default function About() {
  return (
    <div style={styles.about}>
      <div style={styles.header}>
        <h2 style={styles.title}>About AlgoVisualizer</h2>
      </div>

      <div style={styles.section}>
        <p style={styles.text}>
          AlgoVisualizer is an interactive web application designed to help
          students, developers, and algorithm enthusiasts understand how sorting
          and searching algorithms work through real-time visualization. By
          breaking down complex algorithms into step-by-step animations,
          AlgoVisualizer makes learning intuitive and engaging.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Why AlgoVisualizer?</h2>
        <p style={styles.text}>
          Understanding algorithms can be challenging, especially when dealing
          with abstract concepts. Traditional learning methods rely on static
          diagrams or pseudocode, which may not fully demonstrate how an
          algorithm processes data.
        </p>
        <h3 style={styles.smallTitle}>AlgoVisualizer bridges this gap by:</h3>
        <ul style={styles.list}>
          <li>Providing real-time animations of how algorithms manipulate data.</li>
          <li>
            Allowing users to interact with different inputs and observe
            algorithmic behavior.
          </li>
          <li>
            Simplifying complex concepts through visual step-by-step execution.
          </li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Our Mission</h2>
        <p style={styles.text}>
          Our goal is to make algorithm learning accessible, interactive, and
          fun. Whether you're a beginner exploring sorting techniques or an
          experienced programmer refining your knowledge, AlgoVisualizer helps
          you grasp the mechanics behind essential algorithms efficiently.
        </p>
      </div>

      <div style={styles.featureSection}>
        <h2 style={styles.subtitle}>Features</h2>
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Sorting Algorithms</h3>
            <ul style={styles.list}>
              <li>Bubble Sort – Elements "bubble up" to their positions.</li>
              <li>
                Insertion Sort – Builds a sorted array one element at a time.
              </li>
              <li>Selection Sort – Repeatedly selects the smallest element.</li>
              <li>Merge Sort – Divide-and-conquer sorting approach.</li>
              <li>Quick Sort – Partitioning and recursive sorting.</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Searching Algorithms</h3>
            <ul style={styles.list}>
              <li>Linear Search – Sequentially checks each element.</li>
              <li>Binary Search – Halves the search space efficiently.</li>
              <li>
                Jump Search – Optimized block-based searching technique.
              </li>
              <li>
                Exponential Search – Combines binary search with exponential
                ranges.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <a
          href="https://github.com/RhythmPahwa14/AlgoVisualizer"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.button}
        >
          Visit GitHub
        </a>
      </div>
    </div>
  );
}

// Inline CSS styles
const styles = {
  about: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    background: "#f9f9f9",
    lineHeight: "1.6",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    animation: "fadeInDown 1s ease-in-out",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#004aad",
  },
  subtitle: {
    fontSize: "24px",
    margin: "20px 0 10px",
    color: "#004aad",
  },
  smallTitle: {
    fontSize: "18px",
    margin: "15px 0 8px",
    color: "#333",
  },
  text: {
    fontSize: "16px",
    color: "#555",
  },
  list: {
    marginLeft: "20px",
    fontSize: "15px",
    color: "#444",
  },
  section: {
    marginBottom: "30px",
  },
  featureSection: {
    marginTop: "40px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  card: {
    flex: "1 1 300px",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardTitle: {
    fontSize: "20px",
    marginBottom: "12px",
    color: "#004aad",
    textAlign: "center",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "40px",
  },
  button: {
    padding: "12px 24px",
    background: "#004aad",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

// Add hover effect with JS
document.addEventListener("mouseover", (e) => {
  if (e.target.closest("[style*='card']")) {
    e.target.closest("[style*='card']").style.transform = "translateY(-8px)";
    e.target.closest("[style*='card']").style.boxShadow =
      "0 12px 20px rgba(0,0,0,0.15)";
  }
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest("[style*='card']")) {
    e.target.closest("[style*='card']").style.transform = "translateY(0)";
    e.target.closest("[style*='card']").style.boxShadow =
      "0 6px 15px rgba(0,0,0,0.1)";
  }
});
