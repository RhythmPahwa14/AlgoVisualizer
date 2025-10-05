import React from "react";

const FileHandlingSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-file-alt"></i> 22. File Handling
      </h2>
      <p>
        Java provides <strong>java.io</strong> and <strong>java.nio.file</strong> packages for file handling. 
        Use these to read, write, and manage files efficiently. Key points:
        <ul>
          <li><code>Files.writeString</code> and <code>Files.readString</code> simplify file I/O.</li>
          <li>Always handle <code>IOException</code> for robust code.</li>
          <li>For large files, consider buffering using <code>BufferedReader</code> or <code>BufferedWriter</code>.</li>
        </ul>
      </p>

      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "filehandling_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`import java.nio.file.*;
import java.io.IOException;

public class FileExample {
    public static void main(String[] args) throws IOException {
        // Define file path
        Path path = Paths.get("example.txt");
        
        // Write content to file
        Files.writeString(path, "Hello file");

        // Read content from file
        String content = Files.readString(path);
        System.out.println(content); // Hello file

        // Bonus: Append new line
        Files.writeString(path, "\\nAppending text", StandardOpenOption.APPEND);
        System.out.println(Files.readString(path));
    }
}`,
              "filehandling_code"
            )
          }
        >
          {copiedCode === "filehandling_code" ? "Copied!" : "Copy"}
        </button>
        <pre>{`import java.nio.file.*;
import java.io.IOException;

public class FileExample {
    public static void main(String[] args) throws IOException {
        // Define file path
        Path path = Paths.get("example.txt");
        
        // Write content to file
        Files.writeString(path, "Hello file");

        // Read content from file
        String content = Files.readString(path);
        System.out.println(content); // Hello file

        // Bonus: Append new line
        Files.writeString(path, "\\nAppending text", StandardOpenOption.APPEND);
        System.out.println(Files.readString(path));
    }
}`}</pre>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
        💡 Tip: Always close resources or use try-with-resources for streams. 
        <strong>Files utility methods</strong> are preferred for simple read/write tasks.
      </p>
    </div>
  </section>
);

export default FileHandlingSection;
