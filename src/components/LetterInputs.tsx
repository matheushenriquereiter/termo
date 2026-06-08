type LetterInputsProps = {
  disable: boolean;
  classNames: string[];
  saveTypedLetters(index: number, value: string): void;
};

function LettersInputs(props: LetterInputsProps) {
  return (
    <div>
      {[0, 1, 2, 3, 4].map(index => (
        <input
          className={props.classNames[index]}
          type="text"
          name={`char${index}`}
          maxLength={1}
          minLength={1}
          disabled={props.disable}
          onChange={event => props.saveTypedLetters(index, event.target.value)}
        />
      ))}
    </div>
  );
}

export default LettersInputs;
