import React, { Component } from "react";
import { Container } from "react-bootstrap";

class StartScreen extends Component {
  render() {
    return (
      <Container>
        <div className="start-screen">
          <div className="row pad">
            <div
              className="mx-auto position-relative"
              onClick={this.props.handleStartExam}
            >
              <img
                className="img-fluid start-button"
                src="./assets/images/start-button.png"
                alt="Start Button"
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default StartScreen;
