export interface FileFieldProps {
  id: string;
  Icon: JSX.Element;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: "image" | "video";
  multiple: boolean;
}
