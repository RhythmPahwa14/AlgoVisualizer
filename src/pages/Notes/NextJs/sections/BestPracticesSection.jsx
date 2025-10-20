import React from "react";{useTheme}
import { useTheme } from "../../../../ThemeContext";

const BestPracticesSection = ({ copyCode, copiedCode }) => {
  const {theme} = useTheme();
  const projectStructure = `// Next.js Project Structure Best Practices

my-nextjs-app/
├── pages/                    # File-based routing
│   ├── _app.js              # App wrapper
│   ├── _document.js         # Custom document
│   ├── index.js             # Home page
│   ├── about.js             # About page
│   └── api/                 # API routes
│       ├── users.js
│       └── posts.js
├── components/              # Reusable components
│   ├── common/             # Common UI components
│   ├── layout/             # Layout components
│   └── forms/              # Form components
├── lib/                    # Utility functions
│   ├── auth.js
│   ├── db.js
│   └── utils.js
├── styles/                 # Global styles
│   ├── globals.css
│   └── components.css
├── public/                 # Static assets
│   ├── images/
│   └── icons/
├── middleware.js           # Next.js middleware
├── next.config.js          # Next.js configuration
└── package.json`;

  const codeOrganization = `// Code Organization Best Practices

// 1. Component Structure
// components/Button/Button.jsx
import styles from './Button.module.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick 
}) {
  return (
    <button 
      className={\`\${styles.button} \${styles[variant]} \${styles[size]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// components/Button/Button.module.css
.button {
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background: #0070f3;
  color: white;
}

// 2. Custom Hooks
// hooks/useAuth.js
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth logic here
    setLoading(false);
  }, []);

  return { user, loading };
}

// 3. API Utilities
// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPosts() {
  const response = await fetch(\`\${API_BASE_URL}/posts\`);
  return response.json();
}`;

  const performanceBestPractices = `// Performance Best Practices

// 1. Use Static Generation when possible
export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 3600 // Revalidate every hour
  };
}

// 2. Optimize Images
import Image from 'next/image';

function OptimizedImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={800}
      height={600}
      priority // For above-the-fold images
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}

// 3. Lazy Load Components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
});

// 4. Use SWR for Data Fetching
import useSWR from 'swr';

function Posts() {
  const { data, error } = useSWR('/api/posts', fetcher);
  
  if (error) return <div>Error loading posts</div>;
  if (!data) return <div>Loading...</div>;
  
  return <div>{data.map(post => <div key={post.id}>{post.title}</div>)}</div>;
}`;

  const securityBestPractices = `// Security Best Practices

// 1. Environment Variables
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key

// 2. API Route Security
// pages/api/users.js
import { withAuth } from '../../middleware/auth';

export default withAuth(async function handler(req, res) {
  // Protected API route
  const users = await getUsers();
  res.status(200).json(users);
});

// 3. Input Validation
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(0)
});

export default function handler(req, res) {
  try {
    const validData = userSchema.parse(req.body);
    // Process valid data
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
}

// 4. CORS Configuration
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://example.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE' },
        ],
      },
    ];
  },
};`;

  const deploymentBestPractices = `// Deployment Best Practices

// 1. Environment Configuration
// next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  images: {
    domains: ['example.com'],
  },
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
};

// 2. Build Optimization
// package.json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "analyze": "ANALYZE=true next build"
  }
}

// 3. Vercel Deployment
// vercel.json
{
  "functions": {
    "pages/api/*.js": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}

// 4. Monitoring and Analytics
// pages/_app.js
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}`;

  return (
    <div>
      <h2 className={`${theme === 'dark' ? '!text-gray-50' : '!text-gray-900'}`} style={{ marginBottom: "1.5rem" }}>
        Best Practices
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Following Next.js best practices ensures your application is maintainable, 
          performant, and secure. Here are the key practices to follow.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{marginBottom: "1rem" }}>Project Structure</h3>
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
            <code>{projectStructure}</code>
          </pre>
          <button
            onClick={() => copyCode(projectStructure, "project-structure")}
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
            {copiedCode === "project-structure" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Code Organization</h3>
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
            <code>{codeOrganization}</code>
          </pre>
          <button
            onClick={() => copyCode(codeOrganization, "code-organization")}
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
            {copiedCode === "code-organization" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Performance</h3>
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
            <code>{performanceBestPractices}</code>
          </pre>
          <button
            onClick={() => copyCode(performanceBestPractices, "performance-best-practices")}
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
            {copiedCode === "performance-best-practices" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Security</h3>
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
            <code>{securityBestPractices}</code>
          </pre>
          <button
            onClick={() => copyCode(securityBestPractices, "security-best-practices")}
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
            {copiedCode === "security-best-practices" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Deployment</h3>
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
            <code>{deploymentBestPractices}</code>
          </pre>
          <button
            onClick={() => copyCode(deploymentBestPractices, "deployment-best-practices")}
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
            {copiedCode === "deployment-best-practices" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Key Principles</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>Keep components small and focused</li>
          <li>Use TypeScript for better type safety</li>
          <li>Implement proper error handling</li>
          <li>Optimize for performance from the start</li>
          <li>Follow security best practices</li>
          <li>Use proper environment variable management</li>
        </ul>
      </div>
    </div>
  );
};

export default BestPracticesSection;
