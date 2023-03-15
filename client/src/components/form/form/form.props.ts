export interface TextFormProps {
  placeholder: string;
  reply?: string;
  value: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleText: () => void;
  disabled: boolean;
  textRef: React.RefObject<HTMLTextAreaElement>;
}