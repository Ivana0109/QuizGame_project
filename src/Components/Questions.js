import React, { useMemo } from "react";
import styles from "./Questions.module.css";

function Questions({
  displayGame,
  numberOfQuestions,
  currentQuestion,
  handleNextQuestion,
  checkResult,
  data,
  questionIndex,
  colorAnswer,
}) {
  const decodeHTMLEntities = (text) => {
    var textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  const answers = useMemo(
    () =>
      data
        ? [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers]
        : [],
    [currentQuestion, data]
  );

  const shuffledArray = useMemo(() => {
    let shuffleArray = [...answers];
    for (let i = shuffleArray.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffleArray[i];
      shuffleArray[i] = shuffleArray[j];
      shuffleArray[j] = temp;
    }
    return shuffleArray;
  }, [answers]);

  return (
    <div>
      {" "}
      {displayGame && (
        <div className={styles.container}>
          <button
            className={styles.button}
            onClick={() => handleNextQuestion()}
          >
            Next question
          </button>
          <div className={styles.numberOfQuestion}>
            Number of question: {data && numberOfQuestions}/ {questionIndex + 1}
          </div>
          <div className={styles.question}>
            Question: {data && decodeHTMLEntities(currentQuestion?.question)}
          </div>
          <div className={styles.answersContainer}>
            {shuffledArray.map((item) => {
              return (
                <button
                  onClick={() => checkResult(item)}
                  className={styles.answer}
                  style={
                    colorAnswer
                      ? {
                          backgroundColor:
                            item === currentQuestion.correct_answer
                              ? "#3ab1bc"
                              : "#fd4c00fc",
                          border: "none",
                          color: "white",
                        }
                      : undefined
                  }
                >
                  {decodeHTMLEntities(item)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Questions;
