import { InputFieldProps } from "./InputField.props";

export const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  required,
  autoFocus,
  inputRef,
  error,
}) => {
  return (
    <div className="input__box">
      <input
        ref={inputRef}
        type={type}
        className={"input__input" + (error ? " input__input-error" : "")}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};
