import React from "react";

const Feature = () => {
  const features = [
    {
      title: "Simple",
      desc: "Java is easy to learn and use. Its syntax is clean and eliminates many complex features of C/C++.",
      summary: "Easy syntax, readable, minimal complexities",
    },
    {
      title: "Object-Oriented",
      desc: "Java uses OOP principles like classes, inheritance, polymorphism, and encapsulation for modular design.",
      summary : "Based on real-world modeling"
    },
    {
      title: "Platform-Independent",
      desc: "Java bytecode can run on any system that has a JVM — Write Once, Run Anywhere.",
      summary:"“Write Once, Run Anywhere”"
    },
    {
      title: "Secure",
      desc: "No explicit pointers, strong memory management, and bytecode verification make Java safe to use.",
      summary :"Safe from memory and access issues"
    },
    {
      title: "Robust",
      desc: "Java provides strong type-checking and exception handling to make applications more reliable.",
      summary:"Strong error handling and memory management"
    },
    {
      title: "Multithreaded",
      desc: "Supports concurrent execution of two or more threads, great for multitasking applications.",
      summary:"Supports concurrent execution"
    },
    {
      title: "Portable",
      desc: "Code behaves consistently across platforms because of Java’s standard libraries and JVM.",
      summary:"Same behavior across systems"
    },
    {
      title: "High Performance",
      desc: "JIT compiler converts bytecode into machine code at runtime, improving performance.",
      summary:"Uses JIT compiler"
    },
    {
      title: "Distributed",
      desc: "Java has built-in support for networking and distributed computing using APIs like RMI.",
      summary:"Supports networking and remote objects"
    },
    {
      title: "Dynamic",
      desc: "Java can dynamically load classes during runtime, supporting adaptive and flexible applications.",
      summary:"Loads classes at runtime"
    },
  ];


  return (
    <div>
      <div className="card">
        <h2 style={{ textAlign: "center", fontSize: "2.3rem" }}>
          🌟 Features of Java
        </h2>
        <p>
          Java is one of the most popular programming languages because it
          provides a balance of simplicity, performance, and portability. Here
          are the key features that make Java stand out:
        </p>
        {/* features */}
        <div
          style={{
            margin: "2rem 0 ",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit ,minmax(260px , 1fr))",
            gap: "1rem",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: "#121221",
                border: "1px solid #fff",
                padding: "1.5rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 10px rgba(0 , 0 , 0, 0.3",
              }}
            >
              <h1 style={{ fontSize: "1.9rem", color: "#fff" }}>{f.title}</h1>
              <p style={{ fontSize: "1rem", color: "#d1d5db" , lineHeight:'1.5' }}>{f.desc}</p>
            </div>
          ))}
        </div>
        {/* summary table */}
        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center', flexDirection:'column'}}>
            <h2 style={{ textAlign: "center", fontSize: "2rem" }}>🧠 Summary Table</h2>
            <div style={{display:'flex' , justifyContent:'center' , gap:'.7rem' , flexDirection:"column" , width:"70%" , border:"2px solid #fff"}}>
                {features.map((s , i) => (
                    <div key={i} style={{borderBottom:"2px solid #fff" ,display:"flex" , justifyContent:"space-between" , alignItems:'center' , flexDirection:"column" ,  color:"#fff" , padding:"1rem 3rem"}}>
                        <h1>{s.title}</h1>
                        <h1>{s.summary}</h1>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
