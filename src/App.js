import { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";
import Questions from "./Components/Questions";
import GameMenu from "./Container/GameMenu";

function App() {
  const [saveData, setSaveData] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [colorAnswer, setColorAnswer] = useState(false);

  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [displayGame, setDisplayGame] = useState(false);
  const [finalResult, setFilnalResult] = useState(0);

  const refresh = useCallback(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
      )
      .then((res) => {
        console.log(res.data.results);
        setSaveData(res.data.results);
      });
  }, [numberOfQuestions, category, difficulty]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const currentQuestion = saveData && saveData[questionIndex];
  console.log(currentQuestion);

  const handleNextQuestion = () => {
    if (questionIndex < saveData.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
    if (questionIndex === saveData.length - 1) {
      setQuestionIndex(0);
      setDisplayGame(false);
      refresh();
    }
  };

  const checkResult = (item) => {
    if (!colorAnswer) {
      setColorAnswer(true);
    }

    setTimeout(() => {
      setColorAnswer(false);
      handleNextQuestion();
    }, 800);

    if (item === currentQuestion.correct_answer) {
      setFilnalResult(finalResult + 1);
    }
  };

  const startGame = () => {
    setFilnalResult(0);
    setDisplayGame(true);
  };
  return (
    <div className={styles.container}>
      <GameMenu
        displayGame={displayGame}
        numberOfQuestions={numberOfQuestions}
        setNumberOfQuestions={setNumberOfQuestions}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        category={category}
        setCategory={setCategory}
        startGame={startGame}
        finalResult={finalResult}
      />
      <Questions
        displayGame={displayGame}
        data={saveData}
        checkResult={checkResult}
        handleNextQuestion={handleNextQuestion}
        numberOfQuestions={numberOfQuestions}
        currentQuestion={currentQuestion}
        questionIndex={questionIndex}
        colorAnswer={colorAnswer}
      />
    </div>
  );
}

export default App;
