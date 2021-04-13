import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from './components/QuestionCard/QuestionCard';
import { shuffle } from './components/utils/utils';



const TOTAL_QUESTIONS = 10

function App() {
  interface QuestionType {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }
  interface QuestionTypeYo {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    answer: string[];
    question: string;
    type: string;
  }

  const [apiResult, setapiResult] = useState<QuestionTypeYo[] | undefined>([])
  const [activeQuestionNumber, setactiveQuestionNumber] = useState<number>(0)
  const [startQuiz, setstartQuiz] = useState<boolean>(false)
  const [score, setscore] = useState<number>(0)

  

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')
                                  .then(res => {
                                      const modifiedAPI = res.data.results.map((question: QuestionType) => ({
                                                            ...question,
                                                            answer: shuffle([
                                                              ...question.incorrect_answers,
                                                                question.correct_answer
                                                            ])
                                                          }))

                                      setapiResult(modifiedAPI)
                                      })
    }, []
  )

  const startQuizHandler = () => {
    setstartQuiz(prevState => true)
  }

  const nextQuestion = () => {
    if((activeQuestionNumber < TOTAL_QUESTIONS - 1) && startQuiz){
      setactiveQuestionNumber(prevState => prevState + 1)
    }
  }

  const checkAnswer = (e: any) => {
    if(e.target.innerText === apiResult![activeQuestionNumber].correct_answer){
      console.log("correct", e.target.innerText)
      setscore(prevState => prevState + 1)
    } else {
      console.log("incorrect", e.target.innerText)
    }
  }

  let question = apiResult ? <QuestionCard  question={apiResult ? (apiResult[activeQuestionNumber] ? apiResult[activeQuestionNumber].question : null): null} 
                                            answer={apiResult![activeQuestionNumber] ? apiResult![activeQuestionNumber].answer : []}
                                            questionNumber={activeQuestionNumber + 1} 
                                            totalQuestion={TOTAL_QUESTIONS}
                                            checkAnswer={checkAnswer}
                                            /> 
                              : <p>Loading questions...</p>


  return (
    <div className="App">
      <h1>Quiz Game</h1>
      <button onClick={startQuizHandler}>Start</button>
      <p>Score: {score}</p>
      {startQuiz ? question : null}
      
      <button onClick={nextQuestion}>Next Question</button>
      {console.log(apiResult)}
    </div>
  );
}

export default App;
