type LetterInputsProps = { disable: boolean; classNames: string[] };

function LettersInputs(props: LetterInputsProps) {
  return (
    <div>
      <input
        className={props.classNames[0]}
        type="text"
        name="char1"
        maxLength={1}
        minLength={1}
        disabled={props.disable}
      />
      <input
        className={props.classNames[1]}
        type="text"
        name="char2"
        maxLength={1}
        minLength={1}
        disabled={props.disable}
      />
      <input
        className={props.classNames[2]}
        type="text"
        name="char3"
        maxLength={1}
        minLength={1}
        disabled={props.disable}
      />
      <input
        className={props.classNames[3]}
        type="text"
        name="char4"
        maxLength={1}
        minLength={1}
        disabled={props.disable}
      />
      <input
        className={props.classNames[4]}
        type="text"
        name="char5"
        maxLength={1}
        minLength={1}
        disabled={props.disable}
      />
    </div>
  );
}

export default LettersInputs;
