import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import StartScreen from "./components/StartScreen";

class App extends Component {
  state = {
    startExam: false,
  };

  handleStartExam = () => {
    this.setState((prevState) => ({
      showModal: false,
      examQuestions: [],
      isLoading: true,
      startExam: !prevState.startExam,
      errors: null,
    }));
  };

  async componentDidMount() {
    const url = "http://localhost:3001/exams/start";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      examQuestions: data.data,
      isLoading: false,
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Route
            path="/"
            exact
            render={(routerProps) => (
              <StartScreen
                {...routerProps}
                startExam={this.state.startExam}
                handleStartExam={this.handleStartExam}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
