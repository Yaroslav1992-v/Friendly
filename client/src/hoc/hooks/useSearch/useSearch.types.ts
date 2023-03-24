import { UserMinData } from "../../../props/props";

export interface SearchContextValue {
  searchQuery: string;
  searchQueries: string[];
  resetSearch: () => void;
  handleSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  users: UserMinData[];
  isDataLoaded: boolean;
}
