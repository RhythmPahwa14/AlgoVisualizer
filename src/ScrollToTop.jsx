import React, { useState, useEffect } from "react";

function ScrollToTop() {
  // This creates a variable that remembers if button should show or hide
  const [showButton, setShowButton] = useState(false);

  // This function checks how far down the page you've scrolled
  const checkScrollPosition = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true); // Show button if scrolled down 300px
    } else {
      setShowButton(false); // Hide button if near top
    }
  };

  // This function scrolls back to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

   

  // This runs when the component loads - it listens for scrolling
  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);

    // Cleanup when component is removed
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // This is what gets displayed on the page
  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "2px",
            right: "25px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            minWidth: "60px",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0, // Ensures no extra spacing inside
            transition: "opacity 0.4s ease, transform 0.4s ease", // Smooth fade & scale
            opacity: showButton ? 1 : 0,
            transform: showButton ? "scale(1)" : "scale(0.8)", // Scales up smoothly
            animation: showButton ? "float 2s ease-in-out infinite" : "none", // Float only when visible
            pointerEvents: showButton ? "auto" : "none", // Prevent clicks when hidden
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0056b3";
            e.target.style.boxShadow = "0 6px 15px #007bff";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#007bff";
            e.target.style.boxShadow = "0 4px 10px #0056b3";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <i
            className="fa-solid fa-arrow-up"
            style={{
              fontSize: "30px",
              Color: "white !imprtant",
            }}
          ></i>
        </button>
      )}
      {/* floating animation styles */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }
            
        `}
      </style>
    </>
  );
}

export default ScrollToTop;
