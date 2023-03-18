import { Like, LikeData } from "../props/props";
import httpService from "./httpService";

const apiEndPoint = "/likes/";
const likesService = {
  createLike: async (like: Like): Promise<LikeData> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, {
      ...like,
    });

    return data;
  },
  //   getComments: async (postId: string): Promise<CommentData[]> => {
  //     const { data } = await httpService.get(
  //       `${apiEndPoint}getComments/${postId}`
  //     );
  //     return data;
  //   },
  removeLike: async (likeId: string): Promise<number> => {
    const data = await httpService.delete(`${apiEndPoint}delete/${likeId}`);
    return data.status;
  },
  getCommentLikes: async (postId: string): Promise<LikeData[]> => {
    const { data } = await httpService.get(
      `${apiEndPoint}getCommentsLikes/${postId}`
    );
    return data;
  },
  getPostsLikes: async (postIds: string[]): Promise<LikeData[]> => {
    const { data } = await httpService.post(`${apiEndPoint}getPostsLikes`, {
      data: postIds,
    });
    return data;
  },
};

export default likesService;
