const Feature = () => {
  const features = [
    {
      title: "Memory Safety",
      desc: "Rust prevents common bugs like null pointer dereferences, buffer overflows, and memory leaks without garbage collection.",
      summary: "Safe memory management without GC",
      icon: "🛡️"
    },
    {
      title: "Zero-Cost Abstractions",
      desc: "High-level features compile down to efficient low-level code with no runtime overhead.",
      summary: "High-level code, low-level performance",
      icon: "⚡"
    },
    {
      title: "Ownership System",
      desc: "Unique ownership model with borrowing and lifetimes ensures memory safety at compile time.",
      summary: "Compile-time memory management",
      icon: "🔐"
    },
    {
      title: "Concurrency",
      desc: "Built-in support for safe concurrent programming with threads, async/await, and channels.",
      summary: "Safe concurrent programming",
      icon: "🔄"
    },
    {
      title: "Cross-Platform",
      desc: "Compile to multiple targets including WebAssembly, embedded systems, and all major platforms.",
      summary: "Runs everywhere from web to embedded",
      icon: "🌐"
    },
    {
      title: "Pattern Matching",
      desc: "Powerful match expressions and destructuring for handling complex data structures elegantly.",
      summary: "Expressive control flow",
      icon: "🎯"
    },
    {
      title: "Trait System",
      desc: "Flexible type system with traits for shared behavior without inheritance complexity.",
      summary: "Composition over inheritance",
      icon: "🧩"
    },
    {
      title: "Cargo",
      desc: "Built-in package manager and build system that handles dependencies, testing, and documentation.",
      summary: "All-in-one toolchain",
      icon: "📦"
    },
    {
      title: "Performance",
      desc: "Comparable to C and C++ performance with modern language features and optimizations.",
      summary: "Fast as C, safe as modern languages",
      icon: "🚀"
    },
    {
      title: "Growing Ecosystem",
      desc: "Active community with crates for web development, game engines, blockchain, and system programming.",
      summary: "Thriving package ecosystem",
      icon: "🌱"
    },
  ];

  return (
    <div>
      <div className="card">
        <h2 style={{ textAlign: "center", fontSize: "2.3rem", marginBottom: "1rem" }}>
          🦀 Features of Rust
        </h2>
        <p style={{ 
          textAlign: "center", 
          fontSize: "1.1rem", 
          color: "var(--text-secondary, #6b7280)", 
          marginBottom: "3rem",
          maxWidth: "800px",
          margin: "0 auto 3rem auto"
        }}>
          Rust is a systems programming language that focuses on safety, speed, and concurrency. 
          It achieves memory safety without garbage collection and provides zero-cost abstractions. 
          Here are the key features that make Rust exceptional:
        </p>
        
        {/* Modern Feature Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            margin: "2rem 0 4rem 0",
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                border: "1px solid #374151",
                borderRadius: "12px",
                padding: "2rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-4px)";
                e.target.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                e.target.style.borderColor = "#f97316";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                e.target.style.borderColor = "#374151";
              }}
            >
              {/* Icon */}
              <div style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(249, 115, 22, 0.3)"
              }}>
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 style={{ 
                fontSize: "1.5rem", 
                color: "#f9fafb",
                marginBottom: "0.75rem",
                fontWeight: "600"
              }}>
                {feature.title}
              </h3>
              
              {/* Description */}
              <p style={{ 
                fontSize: "0.95rem", 
                color: "#d1d5db", 
                lineHeight: "1.6",
                margin: "0"
              }}>
                {feature.desc}
              </p>
              
              {/* Decorative gradient overlay */}
              <div style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, rgba(249, 115, 22, 0.1), transparent)",
                borderRadius: "0 12px 0 100px",
                pointerEvents: "none"
              }} />
            </div>
          ))}
        </div>
        
        {/* Modern Summary Table */}
        <div style={{
          marginTop: "4rem",
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center"
        }}>
          <h2 style={{ 
            textAlign: "center", 
            fontSize: "2rem", 
            marginBottom: "2rem",
            color: "var(--text-primary, #1f2937)"
          }}>
            🧠 Summary Table
          </h2>
          
          <div style={{
            width: "100%",
            maxWidth: "900px",
            background: "var(--card-bg, #ffffff)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid var(--border-color, #e5e7eb)"
          }}>
            {/* Table Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white",
              padding: "1rem 2rem",
              fontWeight: "600",
              fontSize: "1.1rem"
            }}>
              <div>Feature</div>
              <div>Summary</div>
            </div>
            
            {/* Table Rows */}
            {features.map((feature, i) => (
              <div 
                key={i} 
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  padding: "1.25rem 2rem",
                  borderBottom: i < features.length - 1 ? "1px solid var(--border-color, #e5e7eb)" : "none",
                  background: i % 2 === 0 ? "var(--card-bg, #ffffff)" : "var(--bg-secondary, #f9fafb)",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--bg-hover, #f3f4f6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = i % 2 === 0 ? "var(--card-bg, #ffffff)" : "var(--bg-secondary, #f9fafb)";
                }}
              >
                <div style={{
                  fontWeight: "600",
                  color: "var(--text-primary, #1f2937)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <span style={{ fontSize: "1.2rem" }}>{feature.icon}</span>
                  {feature.title}
                </div>
                <div style={{
                  color: "var(--text-secondary, #6b7280)",
                  lineHeight: "1.5"
                }}>
                  {feature.summary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;