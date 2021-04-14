import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from './components/QuestionCard/QuestionCard';
import { shuffle } from './components/utils/utils';
import API from './components/api/API';



const TOTAL_QUESTIONS = 10

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

  const [apiResult, setapiResult] = useState<QuestionTypeYo[] | undefined>([])
  const [activeQuestionNumber, setactiveQuestionNumber] = useState<number>(0)
  const [startQuiz, setstartQuiz] = useState<boolean>(false)
  const [disbaled, setdisbaled] = useState(true)
  const [score, setscore] = useState<number>(0)


  const startQuizHandler = () => {
    axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')
                                    .then(res => {
                                        var modifiedAPI = res.data.results.map((question: QuestionType) => ({
                                                            ...question,
                                                            answer: shuffle([
                                                                ...question.incorrect_answers,
                                                                question.correct_answer
                                                            ])
                                                            }))

                                        setapiResult(modifiedAPI)
                                        })
    setstartQuiz(prevState => true)
    setscore(0)
    setdisbaled(false)
    setactiveQuestionNumber(0)
  }

  const nextQuestion = () => {
    if((activeQuestionNumber < TOTAL_QUESTIONS - 1) && startQuiz){
      setactiveQuestionNumber(prevState => prevState + 1)
    }
    setdisbaled(false)
  }

  const checkAnswer = (e: any) => {
    if(e.target.innerText === apiResult![activeQuestionNumber].correct_answer){
      setscore(prevState => prevState + 1)
    } 
      setdisbaled(true)
  }

  let question = apiResult ? <QuestionCard  question={apiResult ? (apiResult[activeQuestionNumber] ? apiResult[activeQuestionNumber].question : null): null} 
                                            answer={apiResult![activeQuestionNumber] ? apiResult![activeQuestionNumber].answer : []}
                                            questionNumber={activeQuestionNumber + 1} 
                                            totalQuestion={TOTAL_QUESTIONS}
                                            checkAnswer={checkAnswer}
                                            disabled={disbaled}
                                            /> 
                              : <p>Loading questions...</p>


  return (
    <div className="App">
      <h1>Quiz Game</h1>

      {!(apiResult!.length > 0) || ((activeQuestionNumber === TOTAL_QUESTIONS-1) && disbaled) ? <button onClick={startQuizHandler} >Start</button> : null}
      <p>Score: {score}</p>
      {startQuiz ? question : null}
      {(disbaled && (activeQuestionNumber !== TOTAL_QUESTIONS-1)) ? <button onClick={nextQuestion}>Next Question</button> : null} 
      {console.log(apiResult)}
    </div>
  );
}

export default App;
