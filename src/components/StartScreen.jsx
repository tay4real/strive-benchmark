import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

class StartScreen extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Benchmark | Assess your skill level</title>
        </Helmet>
        <Container>
          <div className="start-screen d-flex flex-column justify-content-center align-items-center">
            <div className="onboard text-center">
              Welcome to Strive <br /> Benchmark Platform{" "}
              <span>Assess your skill level</span>
            </div>
            <div className="" onClick={this.props.handleStartExam}>
              <Link to="/register">
                <img
                  className="img-fluid start-button"
                  src="./assets/images/start-button.png"
                  alt="Start Button"
                  onClick={this.props.openRegisterModal}
                />
              </Link>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default StartScreen;
