import React, { useState, useEffect } from "react";

const Footers = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsKeyboardVisible(isMobile && window.innerHeight < 500);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        ...footerStyles.container,
        position: isKeyboardVisible ? "relative" : "absolute",
      }}
    >
      <p style={footerStyles.text}>Menghuot</p>
      <p style={footerStyles.text}>© 2025 All Rights Reserved.</p>
      <p style={footerStyles.text}>
        Visit us at:{" "}
        <a
          href="https://scilabforyou.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={footerStyles.link}
        >
          SciLabForYou
        </a>
      </p>
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
  link: {
    color: "#FFD700", // Gold color for visibility
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Footers;
