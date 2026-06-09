import { useRef } from "react";

type LetterInputsProps = {
  disable: boolean;
  classes: string[];
  setEmptyInputMessage(value: string): void;
  setFirstInput(input: HTMLInputElement): void;
};

function LettersInputs(props: LetterInputsProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    props.setEmptyInputMessage("");

    if (value.length === 1) {
      let foundEmptyAhead = false;

      for (let i = index + 1; i < 5; i++) {
        if (!inputRefs.current[i]?.value) {
          inputRefs.current[i]?.focus();
          foundEmptyAhead = true;
          break;
        }
      }

      if (!foundEmptyAhead) {
        for (let i = 0; i < index; i++) {
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
          className={props.classes[index]}
          ref={element => {
            if (element === null) return;

            if (index === 0 && inputRefs.current[0] !== element) {
              props.setFirstInput(element);
            }

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
          autoComplete="off"
        />
      ))}
    </div>
  );
}

export default LettersInputs;
