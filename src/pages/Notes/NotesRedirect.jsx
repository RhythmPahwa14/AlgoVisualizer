// src/pages/Notes/NotesRedirect.jsx
import React from "react";
import { useParams, Navigate } from "react-router-dom";

const NotesRedirect = () => {
  const { language } = useParams();
  return <Navigate to={`/notes/${language}/fundamentals`} replace />;
};

export default NotesRedirect;
