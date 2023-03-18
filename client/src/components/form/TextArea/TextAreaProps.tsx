export interface TextAreaProps {
  placeholder: string;
  reply?: string;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  value: string;
  textRef: React.RefObject<HTMLTextAreaElement>;
}
