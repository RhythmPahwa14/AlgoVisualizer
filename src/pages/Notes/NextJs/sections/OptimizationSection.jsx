import React from "react";
import { useTheme } from "../../../../ThemeContext";

const OptimizationSection = ({ copyCode, copiedCode }) => {
  const {theme} = useTheme();
  const imageOptimization = `// Image Optimization in Next.js
import Image from 'next/image';

// Basic image optimization
function MyImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority // Load immediately
    />
  );
}

// Responsive images
function ResponsiveImage() {
  return (
    <Image
      src="/landscape.jpg"
      alt="Landscape"
      width={1200}
      height={800}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
}

// External images
function ExternalImage() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="External image"
      width={400}
      height={300}
      loader={({ src, width, quality }) => {
        return \`https://example.com/\${src}?w=\${width}&q=\${quality || 75}\`;
      }}
    />
  );
}`;

  const fontOptimization = `// Font Optimization in Next.js
// pages/_app.js
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={\`\${inter.variable} font-sans\`}>
      <Component {...pageProps} />
    </div>
  );
}

// Using custom fonts
import localFont from 'next/font/local';

const myFont = localFont({
  src: './fonts/MyFont.woff2',
  variable: '--font-myfont',
});

// CSS-in-JS with fonts
function MyComponent() {
  return (
    <div style={{ fontFamily: 'var(--font-inter)' }}>
      <h1>Optimized Font</h1>
    </div>
  );
}`;

  const performanceOptimization = `// Performance Optimization Techniques

// 1. Dynamic Imports
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR for this component
});

// 2. Code Splitting
const LazyComponent = dynamic(() => import('./LazyComponent'));

// 3. Preloading
import Link from 'next/link';

function Navigation() {
  return (
    <Link href="/about" prefetch={true}>
      <a>About</a>
    </Link>
  );
}

// 4. Bundle Analyzer
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}`;

  const seoOptimization = `// SEO Optimization

// pages/_app.js
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="My Next.js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

// pages/about.js
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About - My App</title>
        <meta name="description" content="Learn more about our company" />
        <meta property="og:title" content="About - My App" />
        <meta property="og:description" content="Learn more about our company" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <h1>About Us</h1>
    </>
  );
}`;

  const cachingStrategies = `// Caching Strategies

// 1. Static Generation with ISR
export async function getStaticProps() {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();

  return {
    props: { posts },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

// 2. API Route Caching
// pages/api/posts.js
export default async function handler(req, res) {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();

  // Set cache headers
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).json(posts);
}

// 3. Client-side Caching
import { useSWR } from 'swr';

function Posts() {
  const { data, error } = useSWR('/api/posts', fetcher);
  
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  
  return <div>{data.map(post => <div key={post.id}>{post.title}</div>)}</div>;
}`;

  return (
    <div >
      <h2 className={`${theme === 'dark' ? '!text-gray-50' : '!text-gray-900'}`} style={{  marginBottom: "1.5rem" }}>
        Optimization
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Next.js provides built-in optimizations for images, fonts, and performance. 
          These features help improve your app's loading speed and user experience.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Image Optimization</h3>
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
            <code>{imageOptimization}</code>
          </pre>
          <button
            onClick={() => copyCode(imageOptimization, "image-optimization")}
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
            {copiedCode === "image-optimization" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Font Optimization</h3>
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
            <code>{fontOptimization}</code>
          </pre>
          <button
            onClick={() => copyCode(fontOptimization, "font-optimization")}
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
            {copiedCode === "font-optimization" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Performance Optimization</h3>
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
            <code>{performanceOptimization}</code>
          </pre>
          <button
            onClick={() => copyCode(performanceOptimization, "performance-optimization")}
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
            {copiedCode === "performance-optimization" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{   marginBottom: "1rem" }}>SEO Optimization</h3>
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
            <code>{seoOptimization}</code>
          </pre>
          <button
            onClick={() => copyCode(seoOptimization, "seo-optimization")}
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
            {copiedCode === "seo-optimization" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Caching Strategies</h3>
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
            <code>{cachingStrategies}</code>
          </pre>
          <button
            onClick={() => copyCode(cachingStrategies, "caching-strategies")}
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
            {copiedCode === "caching-strategies" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Optimization Tips</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>Always use Next.js Image component for automatic optimization</li>
          <li>Use Google Fonts with next/font for better performance</li>
          <li>Implement proper caching strategies for better UX</li>
          <li>Use dynamic imports for code splitting</li>
          <li>Add proper meta tags for SEO</li>
        </ul>
      </div>
    </div>
  );
};

export default OptimizationSection;
