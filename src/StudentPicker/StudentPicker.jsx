
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container } from "react-bootstrap"; // Import necessary components from React Bootstrap
import React, { useState } from "react";
import "./../StudentPicker/StudentPicker.css";
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
  const handleFile = (file) => {
    if (!file) {
      alert("No file selected. Please upload a valid text file.");
      return;
    }
  
    // Check if the file is a text file
    if (!file.type.startsWith("text/")) {
      alert("Invalid file format! Please upload a plain text (.txt) file.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        
        if (!text.trim()) {
          alert("File is empty or contains invalid content!");
          return;
        }
  
        setStudentText(text);
  
        const names = text
          .split("\n")
          .map((name) => name.trim())
          .filter((name) => name !== "");
  
        if (names.length === 0) {
          alert("No valid names found in the file!");
          return;
        }
  
        setStudents(names);
        setDuplicates(findDuplicates(names)); // Detect duplicates
      } catch (error) {
        alert("An error occurred while reading the file. Please check the format.");
        console.error("File reading error:", error);
      }
    };
  
    reader.onerror = () => {
      alert("Failed to read the file. Please try again.");
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

    <Container fluid className="d-flex flex-column vh-100 pb-5"
    
    onDrop={handleDrop}
    onDragOver={(e) => e.preventDefault()}    >
      {showConfetti && <Confetti particleCount={150} colors={["#ff577f", "#ff884b"]} />}
      <h1 className="text-center mt-4 mb-4" style={{ color: "white" }}>🎓 Picker</h1>
    
      <div className="d-flex gap-2 mb-4 mx-auto w-50 w-md-50 w-100-mobile"
        
      >
        <Form.Control
          as="textarea"
          rows="10"
          placeholder={`Enter one participant name per line
Or Drag & Drop list file
Or Choose file`}
          value={studentText}
          onChange={handleTextChange}
          className="custom-textarea"
        />
      </div>
      <div className="d-flex gap-2 mb-4 w-50 mx-auto w-md-50 text-white"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          padding: "10px",
          border: "2px dashed #ccc",
          borderRadius: "5px",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        Drag & Drop a .txt file here
      </div>

      <div className="d-flex gap-2 mb-4 w-50 mx-auto w-md-50 text-white">
        <Form.Control
          type="file"
          label="Upload .txt file"
          accept=".txt"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "10px", textAlign: "center", color: "white" }}>
        <strong>Total Participates : {students.length}</strong>
      </div>

      {/* Show duplicate names if any */}
      {duplicates.length > 0 && (
        <div style={{ color: "red", marginBottom: "10px" }} className="d-flex justify-content-center">
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



      <div className="d-flex justify-content-center">
        <label style={{ color: "white" }}>Number of participate to pick: </label>
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
      <div className="d-flex justify-content-center" >
        <Button
          variant="success"
          onClick={handlePickStudents}
          // style={{
          //   padding: "10px 20px",
          // }}
          size="sm"
        >
          Pick Participate
        </Button>
      </div>



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
                    fontSize: "32px",
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
              <Button variant="primary" onClick={handleDownload} style={modalStyles.downloadButton} size="sm">
                📥 Download Result
              </Button>
              <Button variant="danger" onClick={closeModal} style={modalStyles.closeButton} size="sm">
                ❌ Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
        <br />
      <br />
      <br />
      <br />
      <br />
      <br />
   
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>

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
    maxHeight: "80vh",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
    overflowX: "hidden",
    overflowY: "auto",
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
  },
  downloadButton: {
    flex: 1,
    padding: "10px 20px",
  },
};





export default StudentPicker;

