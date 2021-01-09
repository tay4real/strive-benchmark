import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

class StartScreen extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Strive Benchmark</title>
        </Helmet>
        <Container>
          <div className="start-screen">
            <div className="row pad">
              <div
                className="mx-auto position-relative"
                onClick={this.props.handleStartExam}
              >
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
          </div>
        </Container>
      </>
    );
  }
}

export default StartScreen;
