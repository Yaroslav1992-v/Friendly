import { InputFieldProps } from "./InputField.props";

export const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  required,
  autoFocus,
  inputRef,
  error,
  value,
  label,
  onChange,
}) => {
  return (
    <div className="input__box">
      {label && (
        <label className="input__label" htmlFor={label}>
          {label}
        </label>
      )}
      <input
        id={label}
        ref={inputRef}
        onChange={onChange}
        type={type}
        className={"input__input" + (error ? " input__input-error" : "")}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        value={value}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};
