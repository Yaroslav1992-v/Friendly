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
  likes?: string[];
  replies?: CommentData[];
}

export interface Reply {
  to?: string;
  parentId?: string;
  name?: string;
}
export interface ReplyData extends Reply {
  onReply: (name: string, id: string, parentId: string) => void;
}
