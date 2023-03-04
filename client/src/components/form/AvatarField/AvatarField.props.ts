export interface AvatarFieldProps {
  id: string;
  url?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
