import React from "react";
import { useTheme } from "../../../../ThemeContext";

const IntroSection = ({ copyCode, copiedCode }) => {
  const {theme} = useTheme();
  const nextjsIntro = `// What is Next.js?
// Next.js is a React framework that provides additional features
// for building production-ready applications

// Key Features:
// 1. File-based routing
// 2. API routes
// 3. Server-side rendering (SSR)
// 4. Static site generation (SSG)
// 5. Image optimization
// 6. Built-in CSS support
// 7. TypeScript support

// Installation
npx create-next-app@latest my-app
cd my-app
npm run dev

// Basic Next.js App Structure
pages/
├── _app.js          # Custom App component
├── _document.js     # Custom Document component
├── index.js         # Home page (/)
├── about.js         # About page (/about)
└── api/
    └── hello.js     # API route (/api/hello)

// pages/index.js - Home page
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is the home page</p>
    </div>
  );
}`;

  const advantages = `// Next.js vs React - Key Advantages

// 1. File-based Routing
// No need to install React Router
// pages/about.js automatically becomes /about route

// 2. Server-Side Rendering (SSR)
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data');
  const posts = await data.json();
  
  return {
    props: { posts }
  };
}

// 3. Static Site Generation (SSG)
export async function getStaticProps() {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();
  
  return {
    props: { posts },
    revalidate: 60 // Revalidate every 60 seconds
  };
}

// 4. API Routes
// pages/api/users.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API!' });
}

// 5. Image Optimization
import Image from 'next/image';

function MyImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={500}
      height={300}
      priority
    />
  );
}`;

  const setupExample = `// Next.js Project Setup

// 1. Create new project
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app

// 2. Project structure
my-nextjs-app/
├── pages/              # File-based routing
│   ├── _app.js        # App wrapper
│   ├── index.js       # Home page
│   └── api/           # API routes
├── public/            # Static files
├── styles/            # CSS files
├── components/        # React components
├── next.config.js     # Next.js config
└── package.json

// 3. Development server
npm run dev
# Runs on http://localhost:3000

// 4. Production build
npm run build
npm start

// 5. Basic page example
// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page</p>
    </div>
  );
}`;

  return (
    <div>
      <h2 className={`${theme === 'dark' ? '!text-gray-50' : '!text-gray-900'}`} style={{marginBottom: "1.5rem" }}>
        Introduction to Next.js
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem",color:'var(--text-primary)' }}>
          Next.js is a React framework that provides additional features for building production-ready applications. 
          It extends React with powerful capabilities like server-side rendering, static site generation, and file-based routing.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>What is Next.js?</h3>
        <div style={{ position: "relative" }}>
          <pre
            style={{
              background: "#1e293b",
              color: "#e2e8f0",
              padding: "1.5rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <code>{nextjsIntro}</code>
          </pre>
          <button
            onClick={() => copyCode(nextjsIntro, "nextjs-intro")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem", 
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "nextjs-intro" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Next.js vs React</h3>
        <div style={{ position: "relative" }}>
          <pre
            style={{
              background: "#1e293b",
              color: "#e2e8f0",
              padding: "1.5rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <code>{advantages}</code>
          </pre>
          <button
            onClick={() => copyCode(advantages, "nextjs-advantages")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem", 
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "nextjs-advantages" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Project Setup</h3>
        <div style={{ position: "relative" }}>
          <pre
            style={{
              background: "#1e293b",
              color: "#e2e8f0",
              padding: "1.5rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <code>{setupExample}</code>
          </pre>
          <button
            onClick={() => copyCode(setupExample, "nextjs-setup")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem", 
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "nextjs-setup" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Key Benefits</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>Zero configuration required</li>
          <li>Automatic code splitting</li>
          <li>Built-in performance optimizations</li>
          <li>SEO-friendly with SSR/SSG</li>
          <li>Great developer experience</li>
        </ul>
      </div>
    </div>
  );
};

export default IntroSection;
