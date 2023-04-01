import { UserMinData } from "../../props/props";

export interface MinUser extends Omit<UserMinData, "email"> {}
export interface UsersProps {
  users: MinUser[];
  isLoading: boolean;
  data:
    | { follows: string[]; action: (id: string, isFollowing: boolean) => void }
    | ((id: string) => void);
}
export interface AdditionalUsersData {
  data:
    | {
        isFollowing: boolean;
        action: (id: string, isFollowing: boolean) => void;
      }
    | ((id: string) => void);
}
