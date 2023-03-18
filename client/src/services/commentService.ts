import {
  CommentData,
  createCommentData,
} from "../pages/commentsPage/components/Comments.props";
import httpService from "./httpService";

const apiEndPoint = "/comments/";
const commentsService = {
  createComments: async (comment: createCommentData): Promise<CommentData> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, {
      ...comment,
    });

    return data;
  },
  getComments: async (postId: string): Promise<CommentData[]> => {
    const { data } = await httpService.get(
      `${apiEndPoint}getComments/${postId}`
    );
    return data;
  },
  removeComment: async (commentId: string): Promise<number> => {
    const data = await httpService.delete(
      `${apiEndPoint}removeComment/${commentId}`
    );
    return data.status;
  },
  editComment: async (
    commentId: string,
    content: string
  ): Promise<CommentData> => {
    const { data } = await httpService.patch(`${apiEndPoint}editComment`, {
      data: { commentId, content },
    });
    return data;
  },
};

export default commentsService;
