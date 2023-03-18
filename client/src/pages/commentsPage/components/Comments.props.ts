export interface createCommentData {
  content: string;
  user: string;
  postId?: string;
  reply?: ReplyData;
}

export interface CommentData extends Omit<createCommentData, "user"> {
  _id: string;
  createdAt: Date;
  user: { _id: string; image?: string; name: string };
  replies?: CommentData[];
}
export interface CommentEditProps {
  data: string;
  textRef: React.RefObject<HTMLTextAreaElement>;
  _id: string;
  handleText: () => void;
  handleEdit: () => void;
  onEdit: (_id: string) => void;
}
export interface Reply {
  to?: string;
  parentId?: string;
  name?: string;
}
export interface ReplyData extends Reply {
  onReply: (name: string, id: string, parentId: string) => void;
}
export interface LikeBoxProps {
  likes: number;
  userId: string;
  parentId: string;
  liked: string | boolean;
}
export interface AdditionalData {
  name?: string;
  liked: string | boolean;
  likes: number;
  currentUserId: string;
  nested?: true;
}
