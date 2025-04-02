import { useState } from "react";
import { Form, Button, Container, ListGroup } from "react-bootstrap";
import AngPao from "../AngPao/AngPao";


const PrizeGenerator = () => {
  const [prizes, setPrizes] = useState("");
  const [generatedPrizes, setGeneratedPrizes] = useState([]);

  const handleGenerate = () => {
    let prizeList = prizes.split(",").map((p) => p.trim()).filter(p => p);
    if (prizeList.length === 0) return;
  
    // Shuffle the list to ensure randomness
    prizeList = prizeList.sort(() => Math.random() - 0.5);
  
    // Clear old AngPao before setting new ones
    setGeneratedPrizes([]);
  
    // Generate new AngPao with fresh prizes
    setTimeout(() => {
      setGeneratedPrizes([...prizeList]);
    }, 0); // Slight delay ensures state updates properly
  };
  
  return (
    <Container className="p-4 text-center"
    style={{
      maxHeight: "100vh", // Make sure it does not exceed full screen
      overflowY: "auto", // Enable scrolling if needed
      paddingBottom: "280px", 
    }}
    >
         <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter prizes separated by commas"
          value={prizes}
          onChange={(e) => setPrizes(e.target.value)}
          className="w-75 mx-auto"
        />
      </Form.Group>
      <Button variant="danger" size="sm" onClick={handleGenerate}>
        Generate Prize
      </Button>


      {/* Grid Layout for AngPao Components */}
      <div 
        className="mt-4"
        style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",  // Equal space between rows & columns
          justifyContent: "center",
        }}
      >
        {generatedPrizes.map((prize, index) => (
          <AngPao key={index} message={`${prize}`} size="large" fontSize="48px" />
        ))}
      </div>
     
      <div style={{ height: "80px" }}></div>
    </Container>
  );
};

export default PrizeGenerator;

