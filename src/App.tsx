import { useState, type FormEvent } from "react";
import LetterInputs from "./components/LetterInputs";
import "./App.css";

function App() {
  const testWord = "carro";

  const [currentNumber, setCurrentNumber] = useState(0);

  const [styles, setStyles] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const letters = Object.fromEntries(formData.entries());
    const word = Object.values(letters).join("");

    const lettersAmount = new Map();

    for (const letter of testWord) {
      if (lettersAmount.get(letter)) {
        lettersAmount.set(letter, lettersAmount.get(letter) + 1);
        continue;
      }

      lettersAmount.set(letter, 1);
    }

    const updatedStyles = [];

    for (let i = 0; i < word.length; i++) {
      if (word[i] === testWord[i]) {
        lettersAmount.set(testWord[i], lettersAmount.get(testWord[i]) - 1);
        updatedStyles[i] = "correct-position";
        continue;
      }

      updatedStyles[i] = "";
    }

    for (let i = 0; i < word.length; i++) {
      if (lettersAmount.get(word[i]) > 0) {
        lettersAmount.set(word[i], lettersAmount.get(word[i]) - 1);
        updatedStyles[i] = "incorrect-position";
      }
    }

    const newStyles = [...styles];
    newStyles[currentNumber] = updatedStyles;
    setStyles(newStyles);
    setCurrentNumber(currentNumber + 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {[0, 1, 2, 3, 4].map(index => (
          <LetterInputs
            key={index}
            disable={currentNumber === index ? false : true}
            classNames={styles[index]}
          ></LetterInputs>
        ))}

        <button>Testar</button>
      </form>
    </>
  );
}

export default App;
