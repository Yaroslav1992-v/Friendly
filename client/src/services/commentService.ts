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
};

export default commentsService;
