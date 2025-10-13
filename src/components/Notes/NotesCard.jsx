// src/components/Notes/NotesCard.jsx
import React from "react";

const NotesCard = ({ title, description, link }) => {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        {link && (
          <a href={link} className="btn btn-primary" target="_blank" rel="noreferrer">
            Read More
          </a>
        )}
      </div>
    </div>
  );
};

export default NotesCard;
