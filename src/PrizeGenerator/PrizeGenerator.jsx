import { useState } from "react";
import { Form, Button, Card,Container, ListGroup, Row, Col } from "react-bootstrap";
import AngPao from "../AngPao/AngPao";

const UserManual = () => {
  return (
    <Container>
      <Card className="p-3">
        <h2 className="text-center">📘 User Manual</h2>
        <hr />
        <ul className="text-start">
          <li><strong>Entering Prizes:</strong> Type multiple prizes in the input box, separated by commas. Example: <i>Car, Phone, Laptop</i>.</li>
          <li><strong>Generating Prizes:</strong> Click the <b>"Generate Prize"</b> button to randomly shuffle and display prizes in red packets.</li>
          <li><strong>Restarting Game:</strong> Use the <b>"Restart Game"</b> button to reset the prize list and start fresh.</li>
          <li><strong>Prize Display:</strong> The prizes will appear in red AngPao packets after generation.</li>
        </ul>
      </Card>
    </Container>
  );
};


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
  const handleRestart = () => {
    setPrizes(""); // Clear input
    setGeneratedPrizes([]); // Clear generated prizes
  };

  return (
    <Container className="p-4 text-center "
      style={{
        maxHeight: "100vh", // Make sure it does not exceed full screen
        paddingBottom: "280px",

      }}
    >
      <h1 className="text-center mb-3" style={{ color: "white" }}>🧧 AngPao Prize</h1>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          placeholder={"Enter prizes separated by commas\nExample: Car, Phone, Laptop"}
          value={prizes}
          rows={2} // Controls height
          onChange={(e) => setPrizes(e.target.value)}
          className="w-75 mx-auto"
        />
      </Form.Group>
   <div className="d-flex justify-content-center gap-3">
        <Button variant="danger" size="sm" onClick={handleGenerate}>
          Generate Prize
        </Button>
        <Button variant="secondary" size="sm" onClick={handleRestart}>
          Restart Game
        </Button>
      </div>
      


      {/* Grid Layout for AngPao Components */}
      <Row className="mt-4 g-4">
        {generatedPrizes.map((prize, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex justify-content-center">
            <div style={{ margin: "10px" }}>  {/* Add margin around each AngPao */}
              <AngPao message={`${prize}`} size="large" fontSize="48px" />
            </div>
          </Col>
        ))}
      </Row>
      <UserManual/>
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

export default PrizeGenerator;

