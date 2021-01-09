import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

class Register extends Component {
  state = { candidateName: "" };

  handleInputChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({ [name]: value });
  };

  handleRegister = async (e) => {
    const { candidateName } = this.state;
    e.preventDefault();
    localStorage.setItem("name", candidateName);

    console.log(localStorage.getItem("name"));

    await this.loadExam();
    this.setState({ candidateName: "" });
  };

  loadExam = async () => {
    try {
      console.log(localStorage.getItem("name"));
      const resp = await fetch(process.env.REACT_APP_BE + "/exams/start", {
        method: "POST",
        body: JSON.stringify({
          candidateName: localStorage.getItem("name"),
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (resp.ok) {
        console.log(resp);
        this.setState({
          isLoading: false,
          error: null,
        });
      } else {
        this.setState({
          loading: false,
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
    const { candidateName } = this.state;

    return (
      <>
        <Helmet>
          <title>Strive Benchmark</title>
        </Helmet>
        <Container>
          <div className="register">
            <div className="row pad">
              <Card className="mx-auto " onClick={this.props.handleStartExam}>
                <Card.Header className="border-0 header">
                  <Card.Title className="text-white">
                    Register your name to proceed
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
          </div>
        </Container>
      </>
    );
  }
}

export default Register;
