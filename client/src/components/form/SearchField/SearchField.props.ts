export interface SearchFiledProps {
  searchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
  cancel: () => void;
  value: string;
}
