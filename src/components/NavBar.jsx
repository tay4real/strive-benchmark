import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <Container fluid>
        <Container>
          <Navbar
            className="navbar justify-content-between align-items-center "
            expand="lg"
          >
            <Navbar.Brand to="#home">
              <Image
                className="img-fluid logo"
                src="./assets/images/benchmark-logo.png"
              />
            </Navbar.Brand>
          </Navbar>
        </Container>
      </Container>
    );
  }
}

export default NavBar;
