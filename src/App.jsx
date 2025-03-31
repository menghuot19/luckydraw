import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import LotterySpiner from "./LotterySpiner/LotterySpiner.jsx";
import Footers from "./Footers/Footers.jsx";
// import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StudentPicker from "./StudentPicker/StudentPicker.jsx";
import { BrowserRouter as Router, Routes, Route, Link,NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./App.css";
const App = () => {
  return (
    <Router>
      <div className="app-container">
      <Navbar expand="lg" bg="dark" variant="dark" className="fixed-top custom-navbar" >
      <Container>
        <Navbar.Brand as={Link} to="/">🎁 E-Randomizer </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/" className="px-3 custom-navlink">📀 Student Spinner</Nav.Link>
          <Nav.Link as={NavLink} to="/stupicker" className="px-3 custom-navlink">🎡 Student Picker</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


        <main className="content">
          <Routes>
            <Route exact path="/" element={<LotterySpiner />} />
            
            <Route path="/stupicker" element={<StudentPicker />} />
          </Routes>
        </main>
        <Footers />
      </div>
    </Router>
  );
  
};

export default App;
