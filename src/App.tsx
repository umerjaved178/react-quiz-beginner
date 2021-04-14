import React, { useState } from "react";
import axios from "axios";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import { shuffle } from "./components/utils/utils";
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

function App() {
  interface QuestionTypeYo {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    answer: string[];
    question: string;
    type: string;
  }
  interface QuestionType {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }

  const [apiResult, setapiResult] = useState<QuestionTypeYo[] | undefined>([]);
  const [activeQuestionNumber, setactiveQuestionNumber] = useState<number>(0);
  const [userAnswers, setuserAnswers] = useState<any>([]);
  const [startQuiz, setstartQuiz] = useState<boolean>(false);
  const [disbaled, setdisbaled] = useState<boolean>(true);
  const [score, setscore] = useState<number>(0);

  const startQuizHandler = () => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
      )
      .then((res) => {
        var modifiedAPI = res.data.results.map((question: QuestionType) => ({
          ...question,
          answer: shuffle([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }));

        setapiResult(modifiedAPI);
      });
    setstartQuiz((prevState) => true);
    setscore(0);
    setdisbaled(false);
    setactiveQuestionNumber(0);
  };

  const nextQuestion = () => {
    if (activeQuestionNumber < TOTAL_QUESTIONS - 1 && startQuiz) {
      setactiveQuestionNumber((prevState) => prevState + 1);
    }
    setdisbaled(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const input = e.target as HTMLElement;
    if (input.innerText === apiResult![activeQuestionNumber].correct_answer) {
      setscore((prevState) => prevState + 1);
    }
    setdisbaled(true);

    // new
    const correct =
      apiResult![activeQuestionNumber].correct_answer === input.innerText;

    const answerObject = {
      question: apiResult![activeQuestionNumber].question,
      answer: input.innerText,
      correct,
      correctAnswer: apiResult![activeQuestionNumber].correct_answer,
    };
    setuserAnswers((prev: any) => [...prev, answerObject]);
  };

  let question = apiResult ? (
    <QuestionCard
      question={
        apiResult
          ? apiResult[activeQuestionNumber]
            ? apiResult[activeQuestionNumber].question
            : ""
          : ""
      }
      answer={
        apiResult![activeQuestionNumber]
          ? apiResult![activeQuestionNumber].answer
          : []
      }
      questionNumber={activeQuestionNumber + 1}
      totalQuestion={TOTAL_QUESTIONS}
      checkAnswer={checkAnswer}
      disabled={disbaled}
      userAnswer={userAnswers ? userAnswers[activeQuestionNumber] : undefined}
    />
  ) : (
    <p>Loading questions...</p>
  );

  return (
    <div className="App">
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz Game</h1>
        {!(apiResult!.length > 0) ||
        (activeQuestionNumber === TOTAL_QUESTIONS - 1 && disbaled) ? (
          <button className="start" onClick={startQuizHandler}>
            Start
          </button>
        ) : null}
        <p className="score">Score: {score}</p>
        {startQuiz ? question : null}
        {disbaled && activeQuestionNumber !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </div>
  );
}

export default App;
