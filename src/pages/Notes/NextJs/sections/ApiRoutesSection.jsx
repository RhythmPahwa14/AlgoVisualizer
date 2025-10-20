import React from "react";
import { useTheme } from "../../../../ThemeContext";

const ApiRoutesSection = ({ copyCode, copiedCode }) => {
  const {theme} = useTheme();
  const basicApiRoute = `// API Routes in Next.js
// Create API endpoints in pages/api/ directory

// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API!' });
}

// pages/api/users.js
export default function handler(req, res) {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  
  res.status(200).json(users);
}

// Access via:
// GET /api/hello
// GET /api/users`;

  const httpMethods = `// Handling Different HTTP Methods
// pages/api/posts.js
export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Handle GET request
      res.status(200).json({ message: 'Get posts' });
      break;
    
    case 'POST':
      // Handle POST request
      const { title, content } = req.body;
      res.status(201).json({ 
        message: 'Post created',
        post: { title, content }
      });
      break;
    
    case 'PUT':
      // Handle PUT request
      res.status(200).json({ message: 'Post updated' });
      break;
    
    case 'DELETE':
      // Handle DELETE request
      res.status(200).json({ message: 'Post deleted' });
      break;
    
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(\`Method \${method} Not Allowed\`);
  }
}`;

  const dynamicApiRoutes = `// Dynamic API Routes
// pages/api/posts/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  if (method === 'GET') {
    // Get specific post
    res.status(200).json({ 
      id, 
      title: 'Post Title',
      content: 'Post content...'
    });
  } else if (method === 'PUT') {
    // Update post
    res.status(200).json({ 
      message: 'Post updated',
      id 
    });
  } else if (method === 'DELETE') {
    // Delete post
    res.status(200).json({ 
      message: 'Post deleted',
      id 
    });
  }
}

// Access via:
// GET /api/posts/123
// PUT /api/posts/123
// DELETE /api/posts/123`;

  const apiWithDatabase = `// API Route with Database
// pages/api/users.js
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;

  try {
    const { db } = await connectToDatabase();

    switch (method) {
      case 'GET':
        const users = await db.collection('users').find({}).toArray();
        res.status(200).json(users);
        break;

      case 'POST':
        const { name, email } = req.body;
        const result = await db.collection('users').insertOne({
          name,
          email,
          createdAt: new Date()
        });
        res.status(201).json(result);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(\`Method \${method} Not Allowed\`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
}`;

  const middlewareApi = `// API Route with Middleware
// pages/api/protected.js
import { withAuth } from '../../middleware/auth';

export default withAuth(async function handler(req, res) {
  // This route is protected by auth middleware
  res.status(200).json({ 
    message: 'Protected data',
    user: req.user 
  });
});

// middleware/auth.js
export function withAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify token logic here
    req.user = { id: 1, name: 'John Doe' };
    
    return handler(req, res);
  };
}`;

  return (
    <div>
      <h2 className={`${theme === 'dark' ? '!text-gray-50' : '!text-gray-900'}`} style={{ marginBottom: "1.5rem" }}>
        API Routes
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Next.js API routes allow you to create backend API endpoints within your Next.js application. 
          They are serverless functions that can handle HTTP requests.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Basic API Routes</h3>
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
            <code>{basicApiRoute}</code>
          </pre>
          <button
            onClick={() => copyCode(basicApiRoute, "basic-api")}
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
            {copiedCode === "basic-api" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>HTTP Methods</h3>
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
            <code>{httpMethods}</code>
          </pre>
          <button
            onClick={() => copyCode(httpMethods, "http-methods")}
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
            {copiedCode === "http-methods" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Dynamic API Routes</h3>
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
            <code>{dynamicApiRoutes}</code>
          </pre>
          <button
            onClick={() => copyCode(dynamicApiRoutes, "dynamic-api")}
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
            {copiedCode === "dynamic-api" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>API with Database</h3>
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
            <code>{apiWithDatabase}</code>
          </pre>
          <button
            onClick={() => copyCode(apiWithDatabase, "api-database")}
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
            {copiedCode === "api-database" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>API with Middleware</h3>
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
            <code>{middlewareApi}</code>
          </pre>
          <button
            onClick={() => copyCode(middlewareApi, "api-middleware")}
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
            {copiedCode === "api-middleware" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 API Routes Tips</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>API routes are serverless functions</li>
          <li>Use req.method to handle different HTTP methods</li>
          <li>Always set appropriate status codes</li>
          <li>Use try-catch for error handling</li>
          <li>API routes can be deployed independently</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiRoutesSection;
