import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import LotterySpiner from "./LotterySpiner/LotterySpiner.jsx";
import Footers from "./Footers/Footers.jsx";
// import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StudentPicker from "./StudentPicker/StudentPicker.jsx";
import { BrowserRouter as Router, Routes, Route, Link,NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./App.css";
import PrizeGenerator from "./PrizeGenerator/PrizeGenerator.jsx";


const App = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNav = () => setExpanded(false); // Function to close navbar

  return (
    <Router>
      <div className="app-container">
        <Navbar
          expand="lg"
          bg="dark"
          variant="dark"
          expanded={expanded} // Control Navbar state
          className="fixed-top custom-navbar"
        >
          <Container>
            <Navbar.Brand as={Link} to="/" onClick={closeNav}>🎁 E-Randomizer</Navbar.Brand>
            <Navbar.Toggle onClick={() => setExpanded(expanded ? false : true)} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} to="/" className="px-3 custom-navlink" onClick={closeNav}>📀 Spinner</Nav.Link>
                <Nav.Link as={NavLink} to="/stupicker" className="px-3 custom-navlink" onClick={closeNav}>🎡 Picker</Nav.Link>
                <Nav.Link as={NavLink} to="/angpao" className="px-3 custom-navlink" onClick={closeNav}>🧧 AngPao Prize</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main className="content">
          <Routes>
            <Route exact path="/" element={<LotterySpiner />} />
            <Route path="/angpao" element={<PrizeGenerator />} />
            <Route path="/stupicker" element={<StudentPicker />} />
          </Routes>
        </main>

        <Footers />
      </div>
    </Router>
  );
};

export default App;