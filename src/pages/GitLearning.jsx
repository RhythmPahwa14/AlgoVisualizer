import React from "react";

const GitLearning = () => {
  return (
    <div className="learner-section">
      <h1>Learn Git & GitHub</h1>
      <section>
        <h2>Git Basics</h2>
        <ul>
          <li>git init</li>
          <li>git clone</li>
          <li>git add, git commit</li>
          <li>git log, git status</li>
        </ul>
      </section>
      <section>
        <h2>GitHub Basics</h2>
        <ul>
          <li>Create repository</li>
          <li>Push local repo to GitHub</li>
          <li>Pull requests & collaboration</li>
        </ul>
      </section>
    </div>
  );
};

export default GitLearning;
