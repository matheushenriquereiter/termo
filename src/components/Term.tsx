import { useState, useRef, useEffect } from "react";
import LetterInputs from "../components/LetterInputs";

function Term() {
  const randomWord = "carro";

  const [attemptNumber, setAttemptNumber] = useState(0);
  const [emptyInputMessage, setEmptyInputMessage] = useState("");
  const firstInputs = useRef<(HTMLInputElement | null)[]>([]);

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

    const form = event.currentTarget;
    const activeInputs = Array.from(
      form.querySelectorAll("input:not([disabled])"),
    ) as HTMLInputElement[];

    const typedWord = activeInputs.map(input => input.value).join("");
    const randomWordLettersAmount = getLettersAmount(randomWord);

    if (typedWord.length != 5) {
      setEmptyInputMessage("Termo inválido");
      return;
    }

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
    firstInputs.current[attemptNumber]?.focus();
  };

  useEffect(() => {
    firstInputs.current[attemptNumber]?.focus();
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        {[0, 1, 2, 3, 4].map(index => (
          <LetterInputs
            key={index}
            disable={attemptNumber === index ? false : true}
            classes={inputsStyle[index]}
            setEmptyInputMessage={setEmptyInputMessage}
            setFirstInput={(element: HTMLInputElement | null) => {
              firstInputs.current[index] = element;
            }}
          ></LetterInputs>
        ))}

        <button>Enter</button>
        <p className="empty-input-message">{emptyInputMessage}</p>
      </form>
    </>
  );
}

export default Term;
