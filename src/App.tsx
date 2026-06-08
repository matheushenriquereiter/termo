import { useState } from "react";
import LetterInputs from "./components/LetterInputs";
import "./App.css";

function App() {
  const randomWord = "carro";

  const [attemptNumber, setAttemptNumber] = useState(0);
  const [typedLetters, setTypedLetters] = useState(["", "", "", "", ""]);

  const [inputsStyle, setInputsStyle] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const getLettersAmount = (word: string): Map<string, number> => {
    const lettersAmount = new Map();

    for (const letter of word) {
      if (lettersAmount.get(letter)) {
        lettersAmount.set(letter, lettersAmount.get(letter) + 1);
        continue;
      }

      lettersAmount.set(letter, 1);
    }

    return lettersAmount;
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const typedWord = typedLetters.join("");
    const randomWordLettersAmount = getLettersAmount(randomWord);

    const currentInputsStyle = [];

    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === typedWord[i]) {
        randomWordLettersAmount.set(
          typedWord[i],
          (randomWordLettersAmount.get(typedWord[i]) || 0) - 1,
        );

        currentInputsStyle[i] = "correct-position";
        continue;
      }

      currentInputsStyle[i] = "";
    }

    for (let i = 0; i < randomWord.length; i++) {
      if (currentInputsStyle[i] === "correct-position") {
        continue;
      }

      if ((randomWordLettersAmount.get(typedWord[i]) || 0) > 0) {
        randomWordLettersAmount.set(
          typedWord[i],
          (randomWordLettersAmount.get(typedWord[i]) || 0) - 1,
        );

        currentInputsStyle[i] = "incorrect-position";
      }
    }

    const newInputsStyle = [...inputsStyle];
    newInputsStyle[attemptNumber] = currentInputsStyle;
    setInputsStyle(newInputsStyle);

    setAttemptNumber(attemptNumber + 1);
  };

  const saveTypedLetters = (index: number, value: string) => {
    const newLetters = [...typedLetters];
    newLetters[index] = value;
    setTypedLetters(newLetters);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {[0, 1, 2, 3, 4].map(index => (
          <LetterInputs
            key={index}
            disable={attemptNumber === index ? false : true}
            saveTypedLetters={saveTypedLetters}
            classNames={inputsStyle[index]}
          ></LetterInputs>
        ))}

        <button>Enter</button>
      </form>
    </>
  );
}

export default App;
