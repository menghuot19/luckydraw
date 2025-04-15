import { useState, useEffect, useRef } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Modal,
} from "react-bootstrap";

export default function CountdownTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [target, setTarget] = useState(0);
  const [direction, setDirection] = useState(null); // "up" or "down"
  const [showCard, setShowCard] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);
  const originalTimeRef = useRef(0);
  const soundRef = useRef(null);

  const startTimer = (dir) => {
    clearInterval(intervalRef.current);
    setDirection(dir);
    setShowCard(false);

    const totalSeconds = minutes * 60;
    originalTimeRef.current = totalSeconds;

    if (dir === "down") {
      setSeconds(totalSeconds);
      setTarget(0);
    } else {
      setSeconds(0);
      setTarget(totalSeconds);
    }
  };

  useEffect(() => {
    if (!direction) return;

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        const newTime = direction === "down" ? prev - 1 : prev + 1;

        const fiveMinutesLeft =
          direction === "down"
            ? newTime === 300 && originalTimeRef.current > 600
            : originalTimeRef.current - newTime === 300 &&
              originalTimeRef.current > 600;

        if (fiveMinutesLeft) {
          setShowModal(true);
          setTimeout(() => setShowModal(false), 5000);
        }

        const hasReachedTarget =
          (direction === "down" && newTime <= target) ||
          (direction === "up" && newTime >= target);

        if (hasReachedTarget) {
          clearInterval(intervalRef.current);
          setShowCard(true);

          // Play sound
          if (soundRef.current) soundRef.current.play();
          setDirection(null); // ✅ Reset direction so you can start again
          return target;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [direction, target]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Container
      fluid
      style={{ backgroundColor: "black" }}
      className="d-flex flex-column align-items-center vh-100 position-relative"
    >
      {/* Timer display */}
      <h2
        className="text-center text-white"
        style={{ fontSize: "12rem", fontWeight: "bold", marginTop: "20px" }}
      >
        {formatTime(seconds)}
      </h2>

      {/* Card input UI */}
      {showCard && (
        <Card
          style={{
            width: "14rem",
            padding: "10px",
            position: "absolute",
            top: "20px",
            zIndex: 10,
            boxShadow: "0 0 20px rgba(255,255,255,0.3)",
          }}
        >
          <Card.Body>
            <Card.Title className="text-center">Countdown Timer</Card.Title>
            <Form.Control
              type="text"
              placeholder="Minutes"
              inputMode="numeric"
              pattern="[0-9]*"
              value={minutes === 0 ? "" : minutes}
              onChange={(e) => {
                let rawValue = e.target.value;
                if (/^\d*$/.test(rawValue)) {
                  const cleaned = rawValue.replace(/^0+(?!$)/, "");
                  setMinutes(cleaned === "" ? 0 : Number(cleaned));
                }
              }}
              className="mb-2"
            />
            <Row>
              <Col>
                <Button
                  variant="primary"
                  onClick={() => startTimer("down")}
                  className="w-100"
                >
                  Down
                </Button>
              </Col>
              <Col>
                <Button
                  variant="success"
                  onClick={() => startTimer("up")}
                  className="w-100"
                >
                  Up
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Audio */}
      <audio
        ref={soundRef}
        src="src/assets/beep-07.wav"
        preload="auto"
      />

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Body className="text-center">
          <h4>5mn more!</h4>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
