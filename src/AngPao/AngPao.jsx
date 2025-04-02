import { useState } from "react";
import { motion } from "framer-motion";
import "./AngPao.css";



const AngPao = ({ message, size = "medium", fontSize = "14px" }) => {
  const [opened, setOpened] = useState(false);

  // Define size options
  const sizeStyles = {
    small: { width: "100px", height: "140px" },
    medium: { width: "120px", height: "160px" },
    large: { width: "150px", height: "200px" },
  };

  // Handle font size increase effect when opened
  const textVariants = {
    initial: { fontSize },
    animate: { fontSize: `${parseInt(fontSize) * 2}px`, transition: { duration: 0.5 } },
  };

  return (
    <div className="angpao-container" style={{ ...sizeStyles[size] }}>
      <motion.div
        className="angpao-envelope"
        whileHover={{ rotate: [-2, 2, -2], transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" } }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpened(true)}
      >
        {/* Flap that opens on click */}
        <motion.div
          className="angpao-flap"
          animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        ></motion.div>

        {/* Gold Pattern for Realistic Look */}
        <div className="gold-pattern"></div>

        {/* Envelope Body */}
        <div className="angpao-body">
          {!opened ? (
            <p className="click-text">🧧 Tap to Open</p>
          ) : (
            <motion.div
              className="angpao-message"
              initial="initial"
              animate="animate"
              variants={textVariants}
            >
              {message}
            </motion.div>
          )}
        </div>

        {/* Gold Coin Drop Effect */}
        {opened && (
          <motion.div
            className="gold-coin"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 50, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            🪙
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AngPao;
