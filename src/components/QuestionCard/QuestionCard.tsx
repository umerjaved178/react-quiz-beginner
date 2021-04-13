import React from 'react'

interface Props {
    question: any;
    answer: string[];
    questionNumber: number;
    totalQuestion: number;
    checkAnswer: any
}

function QuestionCard(props: Props) {
    return (
        <div>
            <p>Question No. {props.questionNumber} / {props.totalQuestion}</p>
            <p>Question: {props.question}</p>
            <>Options:
                {React.Children.toArray(
                    props.answer.map(singleOption => (
                        <p onClick={props.checkAnswer}>{singleOption}</p>
                     ))
                    )
                }
            </>
        </div>
    )
}

export default QuestionCard
