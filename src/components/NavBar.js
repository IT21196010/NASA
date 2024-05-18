import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { BrowserRouter as Router } from "react-router-dom";

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  //
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                href="#home"
                className={
                  activeLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("home")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#apod"
                className={
                  activeLink === "apod" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("apod")}
              >
                Picture of the Day
              </Nav.Link>
              <Nav.Link
                href="#projects"
                className={
                  activeLink === "projects"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("projects")}
              >
                Mars Rover
              </Nav.Link>
              <Nav.Link
                href="#contact"
                className={
                  activeLink === "connect"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("connect")}
              >
                Signup
              </Nav.Link>
              {/* Link to the login page */}
              {!user && !token ? (
                <Nav.Link
                  href="/login"
                  className={
                    activeLink === "login"
                      ? "active navbar-link"
                      : "navbar-link"
                  }
                >
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link
                  href="/"
                  className={
                    activeLink === "logout"
                      ? "active navbar-link"
                      : "navbar-link"
                  }
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
              )}
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#">
                  <img src={navIcon1} alt="" />
                </a>
                <a href="#">
                  <img src={navIcon2} alt="" />
                </a>
                <a href="#">
                  <img src={navIcon3} alt="" />
                </a>
              </div>
              <HashLink to="#connect">
                <button className="vvd">
                  <span>Let’s Connect</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
}
