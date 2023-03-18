export interface AccoundHeadMiddleProps {
  name: string;
  occupation?: string;
}
export interface AccountHeadTopProps {
  url?: string;
  id: string;
  currentUserId: string;
  isFollowing: boolean;
}
export interface AccountHeadBottomProps {
  followers: number;
  following: number;
  posts: number;
}
export interface AccountAction {
  Icon: JSX.Element;
  action: string | (() => void);
  name: string;
}
export type Nav = "posts" | "photos";
