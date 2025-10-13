import React from "react";
import { useParams } from "react-router-dom";

const notesData = {
  c: "/pdfs/c.pdf",
  cpp: "/pdfs/cpp.pdf",
  python: "/pdfs/python.pdf",
  java: "/pdfs/java.pdf",
};

const NotesPage = () => {
  const { language } = useParams();
  const pdfPath = notesData[language.toLowerCase()];

  if (!pdfPath) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>
      No notes found for "{language}"
    </p>;
  }

  const displayName = language.toUpperCase() === "CPP" ? "C++" : language.toUpperCase();

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        {displayName} Notes
      </h1>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <a
          href={pdfPath}
          download
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "0.5rem 1rem",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Download PDF
        </a>
      </div>

      <div style={{ height: "80vh", width: "100%" }}>
        <embed
          src={pdfPath}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default NotesPage;
