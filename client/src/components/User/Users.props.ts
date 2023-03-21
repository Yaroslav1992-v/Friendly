import { User, UserMinData } from "../../props/props";

export interface MinUser extends Omit<UserMinData, "email"> {}
export interface UsersProps {
  users: MinUser[];
  isLoading: boolean;
  following: string[];
  currentUser: User;
}
export interface AdditionalUsersData {
  isFollowing: boolean;
  currentUser: User;
}
