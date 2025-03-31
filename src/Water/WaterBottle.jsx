import { useState } from "react";
import { motion } from "framer-motion";
import "./WaterBottle.css";

const WaterBottle = ({ message }) => {
  const [isPouring, setIsPouring] = useState(false);

  return (
    <div className="water-container">
      {/* Water Bottle */}
      <motion.div
        className="bottle"
        whileTap={{ rotate: [-5, 5, -5], transition: { duration: 0.3 } }}
        onClick={() => setIsPouring(true)}
      >
        🍼
      </motion.div>
      
      {/* Water Flow Animation */}
      {isPouring && (
        <motion.div
          className="water-flow"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 100, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          onAnimationComplete={() => setIsPouring(false)}
        ></motion.div>
      )}

      {/* Message Appears */}
      {isPouring && (
        <motion.div
          className="water-message"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
};

export default WaterBottle;