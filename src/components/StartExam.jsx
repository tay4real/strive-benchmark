import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

import { Button, Card } from "react-bootstrap";

class StartExam extends Component {
  state = {
    exam: {},
    question: "",
    answers: [],
    numberOfQuestions: 0,
    questionIndex: 0,
    isLoading: true,
    result: {},
    showResult: false,
  };

  async componentDidMount() {
    if (this.props.location.questions) {
      this.setState({
        exam: await this.props.location.questions,
      });
      console.log(this.state.exam);
      this.handleQuestionDisplay(this.state.questionIndex); // set first question for display
    }
  }

  handleQuestionDisplay = (questionIndex = this.state.questionIndex) => {
    const questionObject = this.state.exam.questions[questionIndex];

    if (questionObject.text) {
      console.log(questionObject);
      const questionText = questionObject.text;
      const answers = questionObject.answers;
      const numberofQuestions = this.state.exam.questions.length;

      this.setState((prevState) => ({
        question: questionText,
        answers: answers,
        numberOfQuestions:
          prevState.numberofQuestions !== numberofQuestions
            ? numberofQuestions
            : prevState.numberOfQuestions,
      }));
    }
  };

  handleSubmitQuestion = async (question_id, answer_id) => {
    try {
      const resp = await fetch(
        process.env.REACT_APP_BE + this.state.questions._id + "answers",
        {
          method: "POST",
          body: JSON.stringify({
            question: question_id,
            answer: answer_id,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      if (resp.ok) {
        let examResult = await resp.json();

        this.setState((prevState) => ({
          result: examResult,
          questionIndex:
            prevState.questionIndex < this.state.numberOfQuestions
              ? prevState.questionIndex + 1
              : prevState.questionIndex,
        }));
        this.handleQuestionDisplay(this.state.questionIndex);
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
    const {
      questionIndex,
      exam,
      question,
      answers,
      numberOfQuestions,
    } = this.state;

    return (
      <>
        <Helmet>
          <title>Benchmark | Test your skill level</title>
        </Helmet>
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center text-white  title">{exam.name}</h1>
          <div className="start-exam d-flex flex-column justify-content-center align-items-center">
            <Card
              className="mx-auto"
              style={{ width: "75%", minHeight: "75%" }}
            >
              <Card.Header className="border-0 header">
                <Card.Title className="text-white">
                  <span>
                    Question{" "}
                    {questionIndex !== numberOfQuestions &&
                      `${questionIndex + 1} of ${numberOfQuestions}`}{" "}
                  </span>
                </Card.Title>
              </Card.Header>

              <Card.Body className="">
                <h5>{question}</h5>
                <div className="d-flex justify-content-around">
                  {answers &&
                    answers.length > 0 &&
                    answers.map((answer, answer_index) => {
                      return (
                        <div
                          id={answer_index}
                          unselectable="on"
                          onClick={this.handleSubmitQuestion.bind(
                            this,
                            questionIndex,
                            answer_index
                          )}
                          className="option-button selectable px-5  rounded-pill"
                          key={answer_index}
                        >
                          {answer.text}
                        </div>
                      );
                    })}
                </div>
              </Card.Body>
              <Card.Footer className="d-flex border-0 footer ">
                <div className="mx-auto" onClick={this.submitTest}>
                  <Button className="proceed px-5 ">Proceed</Button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </Container>
      </>
    );
  }
}

export default StartExam;
