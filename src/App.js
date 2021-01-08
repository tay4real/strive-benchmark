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
      startExam: !prevState.startExam,
    }));
  };

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
