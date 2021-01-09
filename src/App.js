import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Register from "./components/Register";
import StartScreen from "./components/StartScreen";
import StartExam from "./components/StartExam";

class App extends Component {
  state = {
    showRegisterModal: false,
    examQuestions: [],
    isLoading: true,
    examStarted: false,
    errors: null,
  };

  handleShowRegisterModal = () => {
    this.setState({ showRegisterModal: true });
  };
  handleHideRegisterModal = () => {
    this.setState({ showRegisterModal: false });
  };
  handleStartExam = () => {
    this.setState((prevState) => ({
      examStarted: !prevState.examStarted,
    }));
  };

  render() {
    const { showRegisterModal } = this.state;
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
                examStarted={this.state.examStarted}
                handleStartExam={this.handleStartExam}
                openRegisterModal={this.handleShowRegisterModal}
              />
            )}
          />

          <Route exact path="/register" component={Register} />

          <Route
            path="/examstart"
            exact
            render={(routerProps) => (
              <StartExam
                {...routerProps}
                showRegisterModal={showRegisterModal}
                closeRegisterModal={this.handleHideRegisterModal}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
