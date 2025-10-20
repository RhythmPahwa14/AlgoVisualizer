import React from "react";
import { useTheme } from "../../../../ThemeContext";

const MiddlewareSection = ({ copyCode, copiedCode }) => {
  const {theme} = useTheme();
  const basicMiddleware = `// Next.js Middleware
// middleware.js (in root directory)

import { NextResponse } from 'next/server';

export function middleware(request) {
  // This function runs before the request is completed
  console.log('Middleware running for:', request.nextUrl.pathname);
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*'
  ]
}`;

  const authMiddleware = `// Authentication Middleware
// middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth-token');
  
  // Check if user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Check if user is trying to access login while already authenticated
  if (request.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}`;

  const geoMiddleware = `// Geolocation Middleware
// middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  const country = request.geo?.country || 'US';
  const city = request.geo?.city || 'Unknown';
  
  // Add geolocation headers to the request
  const response = NextResponse.next();
  response.headers.set('x-country', country);
  response.headers.set('x-city', city);
  
  // Redirect based on country
  if (country === 'GB') {
    return NextResponse.redirect(new URL('/uk', request.url));
  }
  
  return response;
}

export const config = {
  matcher: ['/']
}`;

  const rateLimitMiddleware = `// Rate Limiting Middleware
// middleware.js

import { NextResponse } from 'next/server';

const rateLimitMap = new Map();

export function middleware(request) {
  const ip = request.ip || '127.0.0.1';
  const limit = 10; // requests per minute
  const windowMs = 60 * 1000; // 1 minute
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: Date.now() + windowMs
    });
  } else {
    const userLimit = rateLimitMap.get(ip);
    
    if (Date.now() > userLimit.resetTime) {
      // Reset the limit
      rateLimitMap.set(ip, {
        count: 1,
        resetTime: Date.now() + windowMs
      });
    } else if (userLimit.count >= limit) {
      // Rate limit exceeded
      return new NextResponse('Too Many Requests', { status: 429 });
    } else {
      userLimit.count++;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*']
}`;

  const headerMiddleware = `// Header Modification Middleware
// middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Add custom headers
  response.headers.set('X-Custom-Header', 'MyApp');
  
  // Remove server header
  response.headers.delete('X-Powered-By');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}`;

  return (
    <div>
      <h2 className={`${theme === 'dark' ? '!text-gray-50' : '!text-gray-900'}`} style={{ marginBottom: "1.5rem" }}>
        Middleware
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Next.js middleware allows you to run code before a request is completed. 
          It can modify the request/response, redirect users, or add headers.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Basic Middleware</h3>
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
            <code>{basicMiddleware}</code>
          </pre>
          <button
            onClick={() => copyCode(basicMiddleware, "basic-middleware")}
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
            {copiedCode === "basic-middleware" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{   marginBottom: "1rem" }}>Authentication Middleware</h3>
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
            <code>{authMiddleware}</code>
          </pre>
          <button
            onClick={() => copyCode(authMiddleware, "auth-middleware")}
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
            {copiedCode === "auth-middleware" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{  marginBottom: "1rem" }}>Geolocation Middleware</h3>
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
            <code>{geoMiddleware}</code>
          </pre>
          <button
            onClick={() => copyCode(geoMiddleware, "geo-middleware")}
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
            {copiedCode === "geo-middleware" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#000000", marginBottom: "1rem" }}>Rate Limiting</h3>
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
            <code>{rateLimitMiddleware}</code>
          </pre>
          <button
            onClick={() => copyCode(rateLimitMiddleware, "rate-limit")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "#374151",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "rate-limit" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#000000", marginBottom: "1rem" }}>Header Modification</h3>
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
            <code>{headerMiddleware}</code>
          </pre>
          <button
            onClick={() => copyCode(headerMiddleware, "header-middleware")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "#374151",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "header-middleware" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Middleware Tips</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>Middleware runs before the request is completed</li>
          <li>Use config.matcher to specify which paths to run on</li>
          <li>Always return NextResponse.next() or a response</li>
          <li>Middleware has access to request.geo for geolocation</li>
          <li>Can be used for authentication, rate limiting, and more</li>
        </ul>
      </div>
    </div>
  );
};

export default MiddlewareSection;
