import React from "react";
import { ButtonWrapper, Wrapper } from "./QuestionCard.styles";

interface Props {
  question: string;
  answer: string[];
  questionNumber: number;
  totalQuestion: number;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  userAnswer: any;
}

function QuestionCard(props: Props) {
  return (
    <Wrapper>
      <p>
        Question No. {props.questionNumber} / {props.totalQuestion}
      </p>
      <p>{props.question}</p>
      <>
        {React.Children.toArray(
          props.answer.map((singleOption) => (
            <ButtonWrapper
              correct={props.userAnswer?.correctAnswer === singleOption}
              userClicked={props.userAnswer?.answer === singleOption}
            >
              <button onClick={props.checkAnswer} disabled={props.disabled}>
                {singleOption}
              </button>
            </ButtonWrapper>
          ))
        )}
      </>
    </Wrapper>
  );
}

export default QuestionCard;
