import React, { useReducer } from "react";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Answers from "./components/Answers";
import QuizContext from "./context/QuizContext";

import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ,
} from "./reducers/types.js";
import quizReducer from "./reducers/QuizReducer";

import "./App.css";

function App() {
  const questions = [
    {
      id: 1,
      question: "1 + 1",
      answer_a: "3",
      answer_b: "2",
      answer_c: "0",
      answer_d: "-1",
      correct_answer: "b",
      correct_answer_value: "2",
    },
    {
      id: 2,
      question: "5 + 4",
      answer_a: "20",
      answer_b: "9",
      answer_c: "1",
      answer_d: "None of the above",
      correct_answer: "b",
      correct_answer_value: "9",
    },
    {
      id: 3,
      question: "2 + 2",
      answer_a: "1",
      answer_b: "4",
      answer_c: "0",
      answer_d: "1024",
      correct_answer: "b",
      correct_answer_value: "4",
    },
    {
      id: 4,
      question: "2 ^ 10",
      answer_a: "20",
      answer_b: "1024",
      answer_c: "512",
      answer_d: "20000000000",
      correct_answer: "b",
      correct_answer_value: "1024",
    },
    {
      id: 5,
      question: "7 * 8 * 9",
      answer_a: "1000()",
      answer_b: "5040",
      answer_c: "504",
      answer_d: "56",
      correct_answer: "c",
      correct_answer_value: "504",
    },
  ];

  let initialState = {
    questions,
    currentQuestion: 0,
    currentAnswer: "",
    answers: [],
    showResults: false,
    error: "",
    correct_count: 0,
    incorrect_count: 0,
    correct_answer_value: "",
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  let {
    currentQuestion,
    currentAnswer,
    answers,
    showResults,
    error,
    correct_count,
    incorrect_count,
    correct_answer_value,
  } = state;

  const question = questions[currentQuestion];

  const renderError = () => {
    if (!error) {
      return;
    }

    return <div className="error">{error}</div>;
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      correct_count = correct_count + 1;
      return <span className="correct">CORRECT, {correct_count}</span>;
    } else {
      incorrect_count = incorrect_count + 1;
      return (
        <span className="failed">
          WRONG, {incorrect_count} <br></br> Correct Answer:{" "}
          {question.correct_answer_value}
        </span>
      );
    }
  };

  const renderResultsData = () => {
    return answers.map((answer) => {
      const question = questions.find(
        (question) => question.id === answer.questionId
      );

      return (
        <div key={question.id}>
          {question.question} <br></br> {renderResultMark(question, answer)}
        </div>
      );
    });
  };

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
  };

  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };
    if (currentAnswer === correct_answer_value) {
      correct_count += 1;
    } else {
      incorrect_count += 1;
    }

    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: "Please select an option" });
      return;
    }

    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: "" });

    if (currentQuestion + 1 < questions.length) {
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1,
      });
      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  if (showResults) {
    return (
      <div className="container results">
        <h2>Results</h2>
        <h5>Correct: {correct_count}</h5>
        <h5>Incorrect : {incorrect_count}</h5>
        <ul>{renderResultsData()}</ul>
        <button className="btn btn-primary" onClick={restart}>
          Restart
        </button>
      </div>
    );
  } else {
    return (
      <QuizContext.Provider value={{ state, dispatch }}>
        <div className="container">
          <Progress total={questions.length} current={currentQuestion + 1} />
          <Question />
          {renderError()}
          <Answers />
          <button className="btn btn-primary" onClick={next}>
            Confirm and Continue
          </button>
        </div>
      </QuizContext.Provider>
    );
  }
}

export default App;
