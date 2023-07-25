import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import Logo from "../../assets/icons/logow.webp";
import "./NavBar.styles.css";

const Transition = styled.div`
  .active {
    visibility: visible;
    transition: all 200ms ease-in;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-out;
    transform: translate(0, -100%);
  }
`;

const MyNavbar = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = () => {
    setScrollPos(document.body.getBoundingClientRect().top);
    setShowNavbar(document.body.getBoundingClientRect().top > scrollPos);
  };
  let navDisplay = showNavbar ? "active" : "hidden";
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const isHomePage = location.pathname === "/";
  return isHomePage ? (
    <Transition>
      <Navbar
        className={`nav-theme justify-content-between ${navDisplay}`}
        fixed="top"
        variant="dark"
        expand="md"
      >
        <div>
          <Navbar.Brand href="#home">
            <img className="logo" src={""} alt="" />
          </Navbar.Brand>
        </div>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#relax">Relax</Nav.Link>
              <Nav.Link href="#wishes">Wishes</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#experience">Experience</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </Transition>
  ) : (
    <Transition>
    <Navbar
      className={`nav-theme justify-content-between ${navDisplay}`}
      fixed="top"
      variant="dark"
      expand="md"
    >
      <div>
        <Navbar.Brand href="/#home">
          <img className="logo" src={""} alt="" />
        </Navbar.Brand>
      </div>
      <div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ">
          <Nav.Link href="/#home">Home</Nav.Link>
          <Nav.Link href="/#relax">About</Nav.Link>
            <Nav.Link href="/#wishes">Wishes</Nav.Link>
            <Nav.Link href="/#skills">Skills</Nav.Link>
            <Nav.Link href="/#experience">Experience</Nav.Link>
            <Nav.Link href="/#projects">Projects</Nav.Link>
            <Nav.Link href="/#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  </Transition>

  );
};

export default MyNavbar;
