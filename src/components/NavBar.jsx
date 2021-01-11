import React from "react";
import { Navbar, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <Container fluid>
      <Container>
        <Navbar
          className="navbar justify-content-between align-items-center "
          expand="lg"
        >
          <Navbar.Brand to="#home">
            <Link to="/">
              <Image
                className="img-fluid logo"
                src="./assets/images/benchmark-logo.png"
                alt="Benchmark logo"
              />
            </Link>
          </Navbar.Brand>
          <div>{props.name}</div>
        </Navbar>
      </Container>
    </Container>
  );
};

export default NavBar;
