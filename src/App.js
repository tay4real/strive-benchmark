import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

import StartScreen from "./components/StartScreen";
import Register from "./components/Register";
import StartExam from "./components/StartExam";

class App extends Component {
  state = {
    candidateName: "",
    examStarted: false,
    errors: null,
  };

  handleStartExam = () => {
    this.setState((prevState) => ({
      examStarted: !prevState.examStarted,
    }));
  };

  componentDidMount() {
    this.setState({
      candidateName: "",
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.candidateName !== this.state.candidateName) {
      this.setUserName();
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar name={this.state.candidateName} />
          <div className="screen-bg">
            <Route exact path="/" component={StartScreen} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/startexam" component={StartExam} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
