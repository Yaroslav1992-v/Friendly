export interface TextAreaProps {
  placeholder: string;
  reply?: string;
  onChange: () => void;
  value: string;
  textRef: React.RefObject<HTMLTextAreaElement>;
}
