import React from "react";
import cornerDecor from "./assets/dragonart.svg"; // Adjust the path as per your file location
import { useAccordionButton } from "react-bootstrap";

const FrameWithDecorations =  ({ title="", content="",cornerWidth = 100, children  }) => {
  return (
    <div style={styles.container}>
      {/* Top-left decoration */}
      <img src={cornerDecor} alt="Top-left corner decoration" style={{ ...styles.corner, ...styles.topLeft, width: `${cornerWidth}px`  }} />
      {/* Top-right decoration */}
      <img src={cornerDecor} alt="Top-right corner decoration" style={{ ...styles.corner, ...styles.topRight, width: `${cornerWidth}px`  }} />
      {/* Bottom-left decoration */}
      <img src={cornerDecor} alt="Bottom-left corner decoration" style={{ ...styles.corner, ...styles.bottomLeft, width: `${cornerWidth}px`  }} />
      {/* Bottom-right decoration */}
      <img src={cornerDecor} alt="Bottom-right corner decoration" style={{ ...styles.corner, ...styles.bottomRight, width: `${cornerWidth}px`  }} />
      {/* Main content */}
      <div style={styles.content}>
        {/* <h1>{title}</h1>
        <p>{content}</p> */}
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "max-content",
    height: "156px",
    // backgroundColor: "white",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  corner: {
    position: "absolute",
    padding: "5px",
    // width: "100px", // Adjust size as needed
    height: "auto",
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    transform: "rotate(90deg)", // Rotate for top-right corner
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    transform: "rotate(-90deg)", // Rotate for bottom-left corner
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    transform: "rotate(180deg)", // Rotate for bottom-right corner
  },
  content: {
    zIndex: 1,
    textAlign: "center",
  },
};

export default FrameWithDecorations;
