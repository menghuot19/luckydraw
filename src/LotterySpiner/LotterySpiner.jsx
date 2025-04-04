
import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import Confetti from "react-confetti";
import "./LotterySpin.css";
import { Button, Form, Modal, Card, ListGroup, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AngPao from "../AngPao/AngPao";
import WaterBottle from "../Water/WaterBottle";


const UserManual = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "black", borderRadius: "8px",color:"white", maxWidth: "800px", margin: "20px auto" }}>
      <h2 className="text-center mb-4">📘 User Manual</h2>
      <h4>1. Enter Items to Spin</h4>
      <p>To get started, input the name or item you want to add to the spinner in the "Enter item..." text box and click **Add**.</p>
      <p>You can add as many items as needed. You must add at least two items to start spinning.</p>

      <h4>2. Ensure Unique Results (Optional)</h4>
      <p>If you want to ensure that each item is selected only once, check the box for **"Ensure unique results"**. After all items have been selected, you'll need to reset the game to spin again.</p>

      <h4>3. Start the Spin</h4>
      <p>Once you're ready, click **Spin & Pick Winner** to start the spin. If you've enabled unique results and all items have been selected, you'll be prompted to reset the game first.</p>

      <h4>4. Stop Spinning & View the Winner</h4>
      <p>When the spin stops, the winner will be displayed in a modal along with a **confetti animation** to celebrate the victory.</p>
      <h4>5. Winner History</h4>
      <p>All winners are recorded with their name and the time they were selected. You can view the winner history and download it as a **text file** by clicking the **"Download Result"** button.</p>
      <h4>6. Reset Game</h4>
      <p>Click **Restart Game** to clear all items, reset the spin count, and start fresh. If you're using **unique results**, you'll need to reset the game after all items have been selected.</p>
    </div>
  );
};



const LotteryWheel = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winners, setWinners] = useState([]);
  const [uniqueResults, setUniqueResults] = useState(false);
  const [availableItems, setAvailableItems] = useState([]);
  const [spinCount, setSpinCount] = useState(0); // Count how many times user spins
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    // if (spinning) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "auto";
    };


  }, [spinning, showModal]);

  const addItem = () => {
    if (input.trim() !== "") {
      const newItem = { option: input };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setAvailableItems(updatedItems); // Reset available items list
      setSpinCount(0); // Reset spin count
      setWinners([]); // Clear winner history
      setInput("");
    }
  };


  const resetGameAgain = () => {
    setItems([]); // Clear all input items
    setAvailableItems([]); // Reset available items
    setSpinCount(0); // Reset spin count
    setWinners([]); // Clear winner history
    setPrizeNumber(null); // Reset prize number
    setSpinning(false); // Ensure spinning is stopped
    setShowModal(false); // Close the modal
    setShowConfetti(false); // Hide confetti
  };
  const closeModal = () => {
    setShowModal(false);
    setShowConfetti(false);
  };

  const startSpin = () => {
    if (items.length < 2) {
      alert("Enter at least two items to spin!");
      return;
    }

    if (uniqueResults && spinCount >= items.length) {
      alert("All items have been selected! Reset to spin again.");
      return;
    }


    let selectedIndex;
    if (uniqueResults && availableItems.length > 0) {
      // Get a random item from available items
      const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];

      // Find its index in the full items array
      selectedIndex = items.findIndex((item) => item.option === randomItem.option);

      // Remove selected item from availableItems
      setAvailableItems((prev) => prev.filter((item) => item.option !== randomItem.option));

      // Increment spin count
      setSpinCount((prevCount) => prevCount + 1);
    } else {
      selectedIndex = Math.floor(Math.random() * items.length);
    }

    setPrizeNumber(selectedIndex);
    setSpinning(true);
    setShowModal(false);
  };
  const handleStopSpinning = () => {
    setSpinning(false);
    setShowConfetti(true);
    setShowModal(true);
    if (prizeNumber !== null) {
      setWinners((prevWinners) => [
        { name: items[prizeNumber].option, time: new Date().toLocaleTimeString() },
        ...prevWinners,
      ]);
    }
  };

  const resetGame = () => {
    setAvailableItems(items); // Reset available items
    setSpinCount(0); // Reset spin count
    setWinners([]); // Clear winner history
  };

  const handleDownload = () => {
    if (winners.length === 0) {
      alert("No winner history to download!");
      return;
    }

    // Format the winners list with timestamps
    const formattedWinners = winners
      .map((winner, index) => {
        const winnerName = typeof winner === "object" && winner?.name ? winner.name : "Unknown";
        const timestamp = winner.time;
        return `${index + 1}. ${winnerName}     ${timestamp}`;
      })
      .join("\n");

    const fileContent = `Winner History\n${formattedWinners}`;

    // Create a Blob and trigger download
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "result.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(winners);
  };

  return (
    <Container fluid style={{ backgroundColor: "black" }} className="d-flex flex-column vh-100 pb-5">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          particleCount={150}
          colors={["#ff577f", "#ff884b", "#ffcc00", "#00cc99", "#3399ff", "#9966ff", "#ff66cc"]}
        />
      )}
      <h1 className="text-center mt-4 mb-4" style={{ color: "white" }}>🎡 Student Spinner</h1>

      <div className="d-flex gap-2 mb-4 w-50 mx-auto w-md-50">
        <Form.Control
          type="text"
          placeholder="Enter item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="primary" onClick={addItem}>Add</Button>
      </div>

      <div className="text-center">
        <Form.Check
          type="checkbox"
          id="uniqueResults"
          checked={uniqueResults}
          onChange={(e) => {
            setUniqueResults(e.target.checked);
            resetGame(); // Reset game when changing unique mode
          }}
          className="text-white d-flex align-items-center justify-content-center"
          label={<span className="ms-2">Ensure unique results</span>} // Add spacing with ms-2
        />
      </div>

      {items.length > 1 && (
        <div className="d-flex flex-column align-items-center">
          <Wheel
            mustStartSpinning={spinning}
            prizeNumber={prizeNumber}
            data={items}
            onStopSpinning={handleStopSpinning}
            backgroundColors={[
              "#f9c74f", "#f9844a", "#90be6d", "#577590",
              "#ff595e", "#ffca3a", "#4B0082", "#8ac926", "#1982c4",
              "#6a4c93", "#00afb9"// Indigo
            ]}
            textColors={["#ffffff"]}
          />
          <Button
            variant="success"
            className="mt-4"
            onClick={startSpin}
            disabled={spinning || (uniqueResults && spinCount >= items.length)}
          >
            {spinning ? "Spinning..." : "Spin & Pick Winner"}
          </Button>

          {uniqueResults && spinCount >= items.length && (
            <div className="text-warning mt-2 text-center">
              <p>All items have been selected! <strong>Reset to spin again.</strong></p>
              <Button variant="danger" onClick={resetGame} className="mt-2">
                Reset to Spin Again
              </Button>
            </div>
          )}


        </div>
      )}

      {/* Winner Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Body className="text-center bg-dark text-white">
          <h3>🎉 Winner: {items[prizeNumber]?.option} 🎉</h3>
          <Button variant="danger" onClick={closeModal} className="mt-3">Close</Button>
        </Modal.Body>
      </Modal>

      {/* Winner History */}
      {winners.length > 0 && (

        <div className="d-flex justify-content-center mt-4">

          <Card style={{ maxWidth: "400px", width: "100%" }}>
            <Card.Body>
              <Card.Title className="text-center">🏆 Winner History</Card.Title>
              <ListGroup>
                {winners.map((winner, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between">
                    <span>{winner.name}</span>
                    <span className="text-muted">{winner.time}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <br />
              <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={handleDownload}>
                  📥 Download Result
                </Button>
              </div>
            </Card.Body>
          </Card>

        </div>
      )}
      <br />
      <div className="d-flex justify-content-center" >
        <Button variant="danger" onClick={resetGameAgain} className="mt-2" size="sm">
          Restart Game
        </Button>
      </div>
      <UserManual/>
  
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

export default LotteryWheel;
