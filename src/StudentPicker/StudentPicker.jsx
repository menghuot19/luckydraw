import React, { useState, useEffect  } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { Row, Col } from "react-bootstrap"; // Import Row and Col
import './../WinnerHistory.css';
import myIcon from './../assets/dragonart.svg';
import ConfettiBoom from "react-confetti-boom";


const Footers = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date();
      const utcPlus7 = new Date(currentTime.getTime() + 7 * 60 * 60 * 1000); // Convert to UTC +7
      const formattedTime = utcPlus7.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update time every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <footer style={footerStyles.container}>
      <p style={footerStyles.text}>Menghuot</p>
      <p style={footerStyles.text}>© 2025 All Rights Reserved.</p>
      <p style={footerStyles.text}>Current Time (UTC+7): {time}</p>
    </footer>
  );
};

const footerStyles = {
  container: {
    width: "100%",
    padding: "15px",
    position: "fixed",
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



const StudentPicker = () => {
  const [studentText, setStudentText] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [n, setN] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // Confetti state
  const [duplicates, setDuplicates] = useState([]); // Store duplicate names
  // Function to find duplicate names
  const findDuplicates = (names) => {
    const nameCounts = {};
    names.forEach((name) => {
      nameCounts[name] = (nameCounts[name] || 0) + 1;
    });
    return Object.keys(nameCounts).filter((name) => nameCounts[name] > 1);
  };

  // Handle text input change
  const handleTextChange = (e) => {
    setStudentText(e.target.value);
    const names = e.target.value
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name !== "");

    setStudents(names);
    setDuplicates(findDuplicates(names)); // Detect duplicates
  };



  // Handle file upload
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setStudentText(text);
      const names = text
        .split("\n")
        .map((name) => name.trim())
        .filter((name) => name !== "");

      setStudents(names);
      setDuplicates(findDuplicates(names)); // Detect duplicates
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handlePickStudents = () => {
    if (n > students.length) {
      alert("You can't pick more students than are available!");
      return;
    }
    const shuffled = [...students].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, n);
    setSelectedStudents(picked);
    setShowModal(true);
    setShowConfetti(true); // Start confetti
  };

  const closeModal = () => {
    setShowModal(false);
    setShowConfetti(false); // Stop confetti
  };

  // Download selected students as result.txt
  const handleDownload = () => {
    const element = document.createElement("a");
    const fileContent = selectedStudents.join("\n");
    const file = new Blob([fileContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "result.txt";
    document.body.appendChild(element); // Append to body to work in FireFox
    element.click();
    document.body.removeChild(element); // Clean up
  };

  return (
    <div className="main-container">
      {/* Add HOL pattern background */}
      <div className="hol-pattern"></div>
      {showConfetti && <Confetti />} {/* Confetti effect */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >

      <h2>🎓 Student Picker</h2>

      <textarea
        rows="10"
        placeholder="Enter one student name per line"
        value={studentText}
        onChange={handleTextChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "5px",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Drag & Drop a .txt file here
      </div>

      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <strong>Total Students: {students.length}</strong>
      </div>


      {/* Show duplicate names if any */}
      {duplicates.length > 0 && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          ⚠️ Duplicate Names Found:
          <ul>
            {duplicates.map((name, index) => (
              <li key={index} style={{ fontWeight: "bold" }}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}


      <div style={{ marginBottom: "10px" }}>
        <label>Number of students to pick: </label>
        <input
          type="number"
          min="1"
          max={students.length}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{
            width: "60px",
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      
      <button
        onClick={handlePickStudents}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Pick Students
      </button>
      
      <AnimatePresence>
        {showModal && (
          <motion.div
            style={modalStyles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={modalStyles.modal}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              {showConfetti && <Confetti mode="boom" particleCount={50} colors={['#ff577f', '#ff884b']} />}
              <h3>🎉 Selected Students 🎉</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {selectedStudents.map((student, index) => (
                  <li
                    key={index}
                    style={{
                      margin: "8px 0",
                      fontSize: "32px",  // Added text size
                      backgroundColor: "#f0f0f0",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    {student}
                  </li>
                ))}
              </ul>
              <div style={modalStyles.buttonRow}>
                <button onClick={handleDownload} style={modalStyles.downloadButton}>
                  📥 Download Result
                </button>
                <button onClick={closeModal} style={modalStyles.closeButton}>
                  ❌ Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footers />

      </div>
    </div>
   
  );
};
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    color: "black",
    width: "90%",
    // maxWidth: "400px",
    maxHeight: "80vh", // Set a maximum height for the modal
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
    overflowX: "hidden",
    overflowY: "auto", // Allow scrolling if content exceeds the height
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "10px",
  },
  closeButton: {
    flex: 1,
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  downloadButton: {
    flex: 1,
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
export default StudentPicker;
