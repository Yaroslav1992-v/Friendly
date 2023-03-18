export interface PostTextAreaProps {
  value?: string;
  textRef: React.RefObject<HTMLTextAreaElement>;
  onChange: () => void;
}
