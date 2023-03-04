export interface InputFieldProps {
  type: string;
  placeholder: string;
  required?: boolean;
  autoFocus?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  error?: string | null;
}
