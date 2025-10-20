import React from "react";
import { useTheme } from "../../../../ThemeContext";
const RoutingSection = ({ copyCode, copiedCode }) => {
  const {theme} = useTheme();
  const fileBasedRouting = `// File-based Routing in Next.js
// No need to install React Router - routing is automatic

// Basic Pages
pages/
├── index.js          # / (home page)
├── about.js          # /about
├── contact.js        # /contact
└── blog/
    ├── index.js      # /blog
    └── post.js       # /blog/post

// pages/index.js
export default function Home() {
  return <h1>Home Page</h1>;
}

// pages/about.js
export default function About() {
  return <h1>About Page</h1>;
}

// pages/blog/index.js
export default function Blog() {
  return <h1>Blog Page</h1>;
}`;

  const dynamicRoutes = `// Dynamic Routes
// Use square brackets for dynamic segments

// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Post ID: {id}</h1>;
}

// pages/users/[id].js
export default function User() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>User ID: {id}</h1>;
}

// Catch-all routes
// pages/posts/[...slug].js
export default function Post() {
  const router = useRouter();
  const { slug } = router.query;

  return <h1>Post: {slug?.join('/')}</h1>;
}`;

  const navigation = `// Navigation in Next.js
import Link from 'next/link';
import { useRouter } from 'next/router';

// Using Link component
function Navigation() {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
    </nav>
  );
}

// Programmatic navigation
function MyComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/about');
  };

  return (
    <button onClick={handleClick}>
      Go to About
    </button>
  );
}

// External links
<Link href="https://nextjs.org">
  <a target="_blank" rel="noopener noreferrer">
    Next.js Docs
  </a>
</Link>`;

  const nestedRoutes = `// Nested Routes
// pages/dashboard/index.js
export default function Dashboard() {
  return <h1>Dashboard Home</h1>;
}

// pages/dashboard/settings.js
export default function Settings() {
  return <h1>Dashboard Settings</h1>;
}

// pages/dashboard/users.js
export default function Users() {
  return <h1>Dashboard Users</h1>;
}

// URLs:
// /dashboard -> Dashboard Home
// /dashboard/settings -> Dashboard Settings
// /dashboard/users -> Dashboard Users`;

  return (
    <div>
      <h2 className={`${theme === 'dark' ? '!text-gray-50' : '!text-gray-900'}`} style={{ marginBottom: "1.5rem" }}>
        File-based Routing
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Next.js uses file-based routing where the file structure in the pages directory 
          automatically becomes the routes of your application.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Basic File-based Routing</h3>
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
            <code>{fileBasedRouting}</code>
          </pre>
          <button
            onClick={() => copyCode(fileBasedRouting, "file-routing")}
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
            {copiedCode === "file-routing" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{   marginBottom: "1rem" }}>Dynamic Routes</h3>
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
            <code>{dynamicRoutes}</code>
          </pre>
          <button
            onClick={() => copyCode(dynamicRoutes, "dynamic-routes")}
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
            {copiedCode === "dynamic-routes" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{   marginBottom: "1rem" }}>Navigation</h3>
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
            <code>{navigation}</code>
          </pre>
          <button
            onClick={() => copyCode(navigation, "navigation")}
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
            {copiedCode === "navigation" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{   marginBottom: "1rem" }}>Nested Routes</h3>
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
            <code>{nestedRoutes}</code>
          </pre>
          <button
            onClick={() => copyCode(nestedRoutes, "nested-routes")}
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
            {copiedCode === "nested-routes" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Routing Tips</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>File names automatically become routes</li>
          <li>Use [id].js for dynamic segments</li>
          <li>Use [...slug].js for catch-all routes</li>
          <li>Always use Link component for internal navigation</li>
          <li>Use useRouter hook for programmatic navigation</li>
        </ul>
      </div>
    </div>
  );
};

export default RoutingSection;
