export interface TextAreaProps {
  placeholder: string;
  reply?: string;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  value: string;
  emoji?: string;
  textRef: React.RefObject<HTMLTextAreaElement>;
}
