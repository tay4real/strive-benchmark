import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

class Register extends Component {
  state = {
    candidateName: "",
    examQuestions: [],
    isLoading: true,
    error: false,
  };

  handleInputChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({ [name]: value });
  };

  handleRegister = async (e) => {
    const { candidateName } = this.state;
    e.preventDefault();
    localStorage.setItem("name", candidateName);

    await this.loadExam();
    this.setState({ candidateName: "", isLoading: false });
  };

  loadExam = async () => {
    try {
      const resp = await fetch(process.env.REACT_APP_BE + "exams/start", {
        method: "POST",
        body: JSON.stringify({
          candidateName: localStorage.getItem("name"),
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (resp.ok) {
        let examQuestions = await resp.json();

        this.setState({
          examQuestions,
          isLoading: false,
          error: null,
        });
      } else {
        this.setState({
          isLading: true,
          error: "500 - Server error",
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: "500 - Server error",
      });
    }
  };

  render() {
    const { candidateName, examQuestions } = this.state;

    return (
      <>
        {this.state.isLoading && (
          <>
            <Helmet>
              <title>Benchmark | Test your skill level</title>
            </Helmet>
            <Container>
              <div className="register d-flex flex-column justify-content-center align-items-center">
                <Card className="mx-auto" onClick={this.props.handleStartExam}>
                  <Card.Header className="border-0 header">
                    <Card.Title className="text-white">
                      Before you start, we'll love to know you
                    </Card.Title>
                  </Card.Header>
                  <Form onSubmit={this.handleRegister}>
                    <Card.Body>
                      <Form.Group controlId="loginForm">
                        <Form.Control
                          className="input-text"
                          type="text"
                          name="candidateName"
                          placeholder="Enter your name"
                          value={candidateName}
                          onChange={this.handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Card.Body>
                    <Card.Footer className="d-flex border-0 footer">
                      <Link to="/">
                        <Button
                          variant="danger"
                          className="cancel px-2 px-md-3 px-lg-5 mr-2 mr-md-3"
                          style={{ flex: "1 0 auto" }}
                        >
                          Cancel
                        </Button>
                      </Link>

                      <Button
                        type="submit"
                        className="register-button px-1 px-md-2 px-lg-5"
                        style={{ flex: "1 0 auto" }}
                      >
                        Register
                      </Button>
                    </Card.Footer>
                  </Form>
                </Card>
              </div>
            </Container>
          </>
        )}

        {!this.state.isLoading && (
          <>
            <Helmet>
              <title>Benchmark | Test your skill level</title>
            </Helmet>
            <Container>
              <div className="register d-flex flex-column justify-content-center align-items-center">
                <Card className="mx-auto" onClick={this.props.handleStartExam}>
                  <Card.Header className="border-0 header">
                    <Card.Title className="text-white text-center">
                      You can now take the test. <br />
                      Please go through the following instructions before you
                      begin.
                    </Card.Title>
                  </Card.Header>

                  <Card.Body className="text-center">
                    {" "}
                    {this.state.examQuestions.instructions}
                  </Card.Body>
                  <Card.Footer className="d-flex border-0 footer ">
                    <Link
                      to={{
                        pathname: "/startexam",
                        questions: examQuestions,
                      }}
                      className="mx-auto"
                    >
                      <Button className="register-button px-5 ">Start</Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </div>
            </Container>
          </>
        )}
      </>
    );
  }
}

export default Register;
