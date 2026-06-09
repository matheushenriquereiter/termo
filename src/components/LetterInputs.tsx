import { useRef } from "react";

type LetterInputsProps = {
  disable: boolean;
  classNames: string[];
  saveTypedLetters(index: number, value: string): void;
};

function LettersInputs(props: LetterInputsProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    props.saveTypedLetters(index, value);

    if (value.length === 1) {
      let allInputsFilled = false;

      for (let i = index; i < 5; i++) {
        if (!inputRefs.current[i]?.value) {
          inputRefs.current[i]?.focus();
          break;
        }

        allInputsFilled = true;
      }

      if (allInputsFilled) {
        for (let i = 0; i < 5; i++) {
          if (!inputRefs.current[i]?.value) {
            inputRefs.current[i]?.focus();
            break;
          }
        }
      }
    }
  };

  return (
    <div>
      {[0, 1, 2, 3, 4].map(index => (
        <input
          key={index}
          className={props.classNames[index]}
          ref={element => {
            inputRefs.current[index] = element;
          }}
          type="text"
          name={`char${index}`}
          maxLength={1}
          minLength={1}
          disabled={props.disable}
          onChange={event => handleChange(index, event.target.value)}
          onKeyDown={event => {
            if (
              event.key === "Backspace" &&
              !event.currentTarget.value &&
              index > 0
            ) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
        />
      ))}
    </div>
  );
}

export default LettersInputs;
