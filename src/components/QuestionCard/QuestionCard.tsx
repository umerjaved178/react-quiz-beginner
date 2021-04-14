import React from 'react'

interface Props {
    question: any;
    answer: string[];
    questionNumber: number;
    totalQuestion: number;
    checkAnswer: any;
    disabled: boolean;
}

function QuestionCard(props: Props) {
    return (
        <div>
            <p>Question No. {props.questionNumber} / {props.totalQuestion}</p>
            <p>{props.question}</p>
            <>
                {React.Children.toArray(
                    props.answer.map(singleOption => (
                        <div><button onClick={props.checkAnswer} disabled={props.disabled}>{singleOption}</button></div>
                     ))
                    )
                }
            </>
        </div>
    )
}

export default QuestionCard
