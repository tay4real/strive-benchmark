import React, { Component } from "react";
import { Navbar, Image, Container } from "react-bootstrap";

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
                alt="Benchmark logo"
              />
            </Navbar.Brand>
          </Navbar>
        </Container>
      </Container>
    );
  }
}

export default NavBar;
