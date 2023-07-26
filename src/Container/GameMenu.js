import React from "react";
import Select from "../Components/Select";
import styles from "./GameMenu.module.css";

function GameMenu({
  displayGame,
  setNumberOfQuestions,
  difficulty,
  setDifficulty,
  category,
  setCategory,
  startGame,
  finalResult,
  numberOfQuestions,
}) {
  return (
    <div>
      {!displayGame && (
        <div className={styles.container}>
          <div className={styles.result}>
            {" "}
            Final result: {finalResult} / {numberOfQuestions}
          </div>
          <div className={styles.selectContainer}>
            <div className={styles.numberOfQuestions}>
              Select number of questions:
            </div>
            <Select
              options={[5, 10, 15]}
              setValue={setNumberOfQuestions}
              value={numberOfQuestions}
            />
          </div>
          <div className={styles.selectContainer}>
            <div className={styles.difficulty}>Select difficulty:</div>
            <Select
              options={{
                "Any difficutly": "",
                Easy: "easy",
                Medium: "medium",
                Hard: "hard",
              }}
              value={difficulty}
              setValue={setDifficulty}
            />
          </div>
          <div className={styles.selectContainer}>
            <div className={styles.category}>Select category:</div>
            <Select
              options={{
                "Any category": "",
                Sports: 21,
                Geography: 22,
                History: 23,
                Politics: 24,
                Art: 25,
                Celebrities: 26,
                Animals: 27,
              }}
              value={category}
              setValue={setCategory}
            />{" "}
          </div>
          <button className={styles.button} onClick={() => startGame()}>
            New game
          </button>{" "}
        </div>
      )}
    </div>
  );
}

export default GameMenu;
