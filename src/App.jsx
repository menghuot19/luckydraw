import React, { useState } from "react";
import Confetti from "react-confetti";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { Row, Col } from "react-bootstrap"; // Import Row and Col
import './WinnerHistory.css';
import myIcon from './assets/dragonart.svg';


import './FrameWithDecorations.jsx';
import FrameWithDecorations from "./FrameWithDecorations.jsx";
const App = () => {

  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [winnerHistory, setWinnerHistory] = useState([]);
  const [preventRepeat, setPreventRepeat] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const parseParticipants = (input) => {
    const trimmedInput = input.trim();
    const newParticipants = trimmedInput.includes(",")
      ? trimmedInput.split(",").map((name) => name.trim())
      : trimmedInput.split("\n").map((name) => name.trim());
    return newParticipants.filter((name) => name);
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const newParticipants = parseParticipants(content);
      setParticipants((prev) => [...new Set([...prev, ...newParticipants])]);
    };
    reader.readAsText(file);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleTextChange = (e) => {
    const input = e.target.value;
    const newParticipants = parseParticipants(input);
    setParticipants(newParticipants);
  };

  const startDraw = () => {
    if (participants.length < 2) {
      alert("Please add at least 2 participants!");
      return;
    }

    setIsDrawing(true);
    let index = 0;

    const interval = setInterval(() => {
      setCurrentName(participants[index]);
      index = (index + 1) % participants.length;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * participants.length);
      const selectedWinner = participants[randomIndex];

      setWinner(selectedWinner);
      setWinnerHistory((prev) => [...prev, selectedWinner]);

      // If preventRepeat is checked, remove the winner from the participant list
      if (preventRepeat) {
        setParticipants((prev) => prev.filter((name) => name !== selectedWinner));
      }

      setCurrentName(selectedWinner);
      setIsDrawing(false);
      setIsModalOpen(true); // Open modal when the winner is selected
    }, 5000);
  };

  const resetAll = () => {
    setParticipants([]);
    setWinner("");
    setWinnerHistory([]);
    setCurrentName("");
    setIsDrawing(false);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal when user clicks "Close"
  };

  return (
    <div className="main-container">
      {/* Add HOL pattern background */}
      <div className="hol-pattern"></div>
      <div
        style={{
          textAlign: "center",
          width: "100vw",
          height: "100vh",
          position: "relative"
        }}
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div
          style={{ textAlign: "center", width: "100vw", height: "100vh" }}
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <Row>

            <h2 style={{textDecorationLine:"underline"}}>
              Samnang Draw
            </h2>
            <h4 style={{textDecorationLine:"underline"}}>Group Draw</h4>
            {/* <FrameWithDecorations title="Content" content="hi" cornerWidth={56} > */}
            {isDrawing && (
              <div
                style={{
                  margin: "0",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generates a random hex color
                }}
              >
                {currentName}
              </div>
            )}
            {/* </FrameWithDecorations> */}

            {winner && (
              <div style={{ marginTop: "0px" }}>
                <h2
                // style={{
                //   color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generates a random hex color
                // }}
                >
                  🎉 Winner: {winner} 🎉
                </h2>
                <Confetti />
              </div>
            )}

          </Row>
          <Row>
            <Col lg={6} md={6} xs={12} className="text-center mb-4">
              <button
                onClick={startDraw}
                disabled={isDrawing}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderColor: "greenyellow",
                  cursor: isDrawing ? "not-allowed" : "pointer",
                }}
              >
                {isDrawing ? "Drawing..." : "Start Draw"}
              </button>


              {/* Prevent Repeat Winner Checkbox */}
              <br />
              <label style={{ marginBottom: "5px", display: "inline-block" }}>
                <input
                  type="checkbox"
                  checked={preventRepeat}
                  onChange={(e) => setPreventRepeat(e.target.checked)}
                />
                Prevent repeat winners
              </label>



              <div className="winner-history-container">
                {winnerHistory.length > 0 && (
                  <div>
                    <h3>Winner History:</h3>
                    <ul className="winner-history-list">
                      {winnerHistory.map((name, index) => (
                        <li key={index} className="winner-history-item">
                          {index + 1}. {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* <div>
            <img src={myIcon} alt="My Icon"  width="64px" 
              style={{
                transform: `rotate(90deg)`, // Apply the rotation
                transition: "transform 0.3s ease", // Optional: smooth transition when rotating
              }}
            />
          </div> */}

            </Col>
            <Col lg={6} md={6} xs={12} className="text-center mb-4">
              {/* Column  */}
              <div style={{ marginTop: "0px" }}>
                <textarea
                  placeholder="Enter participants (CSV or newline separated). You can also paste or drop a file here."
                  rows={6}
                  cols={40}
                  style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
                  onChange={handleTextChange}
                ></textarea>
                <br />
                or &nbsp;
                {/* File Upload Button */}
                <input
                  type="file"
                  accept=".txt,.csv"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  style={{ marginBottom: "0px" }}
                />
                <button
                  onClick={resetAll}
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",

                    backgroundColor: "Grey",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Reset All
                </button>

                <p>
                  {participants.length} Participants:

                </p>

              </div>
            </Col>
          </Row>

          {/* Modal for Winner */}
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundColor: "rgba(11, 25, 44, 0.4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1000",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(11, 25, 44, 0.4)",
                  padding: "20px",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "300px",
                  boxShadow: "8px 8px 15px rgba(0, 0, 0, 0.6)", // Drop shadow with right-bottom emphasis
                }}
              >
                <h3 style={{ color: "white" }}>🎉 Congratulations! 🎉</h3>
                {/* Displaying Winner's Name */}
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#4CAF50" }}>
                  <strong>{winner}</strong>
                </p>
                <button
                  onClick={closeModal}
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
