import React from "react";

const SetupSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-cogs"></i> 2. Setting Up Java Development Environment
      </h2>
      
      <p>
        To start programming in Java, you need the Java Development Kit (JDK) and an 
        Integrated Development Environment (IDE) or text editor. Follow these steps:
      </p>

      <h3>Step 1: Install Java Development Kit (JDK)</h3>
      
      <div style={{background: '#f0f9ff', border: '1px solid #bae6fd', padding: '1rem', margin: '1rem 0', borderRadius: '8px'}}>
        <h4 style={{marginTop: 0}}><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Choose Your JDK Distribution</h4>
        <ul style={{marginBottom: 0}}>
          <li><strong>Oracle JDK:</strong> Official JDK from Oracle (Commercial license for production)</li>
          <li><strong>OpenJDK:</strong> Free and open-source implementation (Recommended for learning)</li>
          <li><strong>Amazon Corretto:</strong> Free, production-ready distribution by AWS</li>
          <li><strong>Eclipse Temurin:</strong> Open-source builds by the Adoptium project</li>
        </ul>
      </div>

      <h4>Download Links:</h4>
      <ul>
        <li><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> <strong>Oracle JDK:</strong> <a href="https://www.oracle.com/java/technologies/downloads/" target="_blank" rel="noopener noreferrer">oracle.com/java</a></li>
        <li><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> <strong>OpenJDK:</strong> <a href="https://jdk.java.net/" target="_blank" rel="noopener noreferrer">jdk.java.net</a></li>
        <li><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> <strong>Adoptium (Recommended):</strong> <a href="https://adoptium.net/" target="_blank" rel="noopener noreferrer">adoptium.net</a></li>
      </ul>

      <h4><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Installation Steps</h4>
      <div style={{background: '#fef3c7', border: '1px solid #fde68a', padding: '1rem', margin: '1rem 0', borderRadius: '8px'}}>
        <strong>Windows:</strong>
        <ol style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li>Download the JDK installer (.exe file)</li>
          <li>Run the installer and follow instructions</li>
          <li>Set JAVA_HOME environment variable (installer usually does this)</li>
          <li>Add <code>%JAVA_HOME%\\bin</code> to PATH</li>
        </ol>
      </div>

      <div style={{background: '#f3e8ff', border: '1px solid #e9d5ff', padding: '1rem', margin: '1rem 0', borderRadius: '8px'}}>
        <strong>macOS:</strong>
        <ol style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li>Download the .dmg file or use Homebrew: <code>brew install openjdk</code></li>
          <li>If using Homebrew, link it: <code>sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk</code></li>
          <li>JDK will be automatically added to PATH</li>
        </ol>
      </div>

      <div style={{background: '#dcfce7', border: '1px solid #bbf7d0', padding: '1rem', margin: '1rem 0', borderRadius: '8px'}}>
        <strong>Linux (Ubuntu/Debian):</strong>
        <ol style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li>Open Terminal</li>
          <li>Run: <code>sudo apt update</code></li>
          <li>Run: <code>sudo apt install openjdk-17-jdk</code> (or desired version)</li>
          <li>Verify: <code>java -version</code></li>
        </ol>
      </div>

      <h4>Verify Installation</h4>
      <p>Open terminal/command prompt and run:</p>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "verify_install" ? "copied" : ""}`}
          onClick={() => copyCode("java -version\njavac -version", "verify_install")}
        >
          {copiedCode === "verify_install" ? "Copied!" : "Copy"}
        </button>
        <pre>{`java -version
javac -version`}</pre>
      </div>
      <p>You should see output showing the Java version installed.</p>

      <h3>Step 2: Choose an IDE or Text Editor</h3>
      
      <div style={{overflowX: 'auto', margin: '1rem 0'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb'}}>
          <thead>
            <tr style={{backgroundColor: '#eef2ff'}}>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>IDE/Editor</th>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Best For</th>
              <th style={{padding: '10px', border: '1px solid #e5e7eb', textAlign: 'left'}}>Features</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><strong>IntelliJ IDEA</strong></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Professional Java development</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Smart code completion, refactoring, debugging</td>
            </tr>
            <tr style={{backgroundColor: '#f9fafb'}}>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><strong>Eclipse</strong></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Enterprise applications</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Extensible, free, large plugin ecosystem</td>
            </tr>
            <tr>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><strong>VS Code</strong></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Lightweight development</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Fast, customizable, Java Extension Pack</td>
            </tr>
            <tr style={{backgroundColor: '#f9fafb'}}>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}><strong>NetBeans</strong></td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Beginners, GUI development</td>
              <td style={{padding: '8px', border: '1px solid #e5e7eb'}}>Built-in GUI designer, easy to use</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Step 3: Write Your First Java Program</h3>
      <p>Create a file named <code>HelloWorld.java</code> and add the following code:</p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "setup_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("Welcome to Java Programming!");
        
        // Display system information
        System.out.println("\\nSystem Information:");
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));
        System.out.println("Operating System: " + System.getProperty("os.name"));
        System.out.println("User Home: " + System.getProperty("user.home"));
    }
}`,
              "setup_code"
            )
          }
        >
          {copiedCode === "setup_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("Welcome to Java Programming!");
        
        // Display system information
        System.out.println("\\nSystem Information:");
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));
        System.out.println("Operating System: " + System.getProperty("os.name"));
        System.out.println("User Home: " + System.getProperty("user.home"));
    }
}`}</pre>
      </div>

      <h3>Step 4: Compile and Run</h3>
      
      <h4>Using Command Line:</h4>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "compile_run" ? "copied" : ""}`}
          onClick={() => copyCode(`# Compile the Java file
javac HelloWorld.java

# Run the compiled program
java HelloWorld`, "compile_run")}
        >
          {copiedCode === "compile_run" ? "Copied!" : "Copy"}
        </button>
        <pre>{`# Compile the Java file
javac HelloWorld.java

# Run the compiled program
java HelloWorld`}</pre>
      </div>

      <h4>Using IDE:</h4>
      <ul>
        <li><strong>IntelliJ IDEA:</strong> Right-click file → Run 'HelloWorld.main()' or press <code>Ctrl+Shift+F10</code></li>
        <li><strong>Eclipse:</strong> Right-click file → Run As → Java Application</li>
        <li><strong>VS Code:</strong> Click "Run" button above main method or press <code>F5</code></li>
      </ul>

      <div style={{background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: '1rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 12px 12px 0'}}>
        <strong><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Pro Tips:</strong>
        <ul style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li>Always use LTS (Long-Term Support) versions for production: Java 8, 11, 17, or 21</li>
          <li>For learning, Java 17 or 21 is recommended (modern features + stable)</li>
          <li>File name must match the public class name exactly (case-sensitive)</li>
          <li>Use an IDE for better productivity - IntelliJ IDEA Community Edition is free and excellent</li>
        </ul>
      </div>

      <div style={{background: '#fff7ed', borderLeft: '4px solid #f59e0b', padding: '1rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 12px 12px 0', color: '#374151'}}>
        <strong><span className="note-inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-4 12.75c.75.54 1.25 1.33 1.35 2.23l.03.27h5.24l.03-.27c.1-.9.6-1.69 1.35-2.23A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 19.5h5M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></span> Common Setup Issues:</strong>
        <ul style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li><strong>"java is not recognized":</strong> JAVA_HOME not set or not in PATH</li>
          <li><strong>"class not found":</strong> Ensure filename matches class name exactly</li>
          <li><strong>"UnsupportedClassVersionError":</strong> Code compiled with newer Java than runtime</li>
        </ul>
      </div>
    </div>
  </section>
);

export default SetupSection;
