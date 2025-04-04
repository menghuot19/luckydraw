import React, { useState, useEffect } from "react";

const Footers = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768; // Detect mobile devices
      setIsKeyboardVisible(isMobile && window.innerHeight < 500); // Adjust height threshold as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        ...footerStyles.container,
        position: isKeyboardVisible ? "relative" : "absolute", // Move up when keyboard is open
      }}
    >
      <p style={footerStyles.text}>Menghuot</p>
      <p style={footerStyles.text}>© 2025 All Rights Reserved.</p>
    </footer>
  );
};

const footerStyles = {
  container: {
    width: "100%",
    padding: "15px",
    bottom: "0",
    left: "0",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.1)",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    fontSize: "14px",
  },
  text: {
    margin: "5px 0",
  },
};

export default Footers;