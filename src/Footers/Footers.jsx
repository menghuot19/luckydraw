const Footers = () => {
    return (
      <footer style={footerStyles.container}>
        <p style={footerStyles.text}>Menghuot</p>
        <p style={footerStyles.text}>© 2025 All Rights Reserved.</p>
      </footer>
    );
  };
  
  const footerStyles = {
    container: {
      width: "100%",
      padding: "15px",
      // position: "fixed",
      position: "absolute",
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
export default  Footers;
  