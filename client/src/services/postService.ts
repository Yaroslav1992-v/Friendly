import httpService from "./httpService";
import { createPostData, Post } from "./../hoc/hooks/usePosts/usePost.types";

const apiEndPoint = "/posts/";
const postService = {
  createPost: async (post: createPostData): Promise<Post> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, {
      ...post,
    });

    return data;
  },
  getPostsByUserId: async (userId: string): Promise<Post[]> => {
    const { data } = await httpService.get(
      `${apiEndPoint}getPostsByUserId/${userId}`
    );
    return data;
  },
  loadPosts: async (userIds: string[]): Promise<Post[]> => {
    const { data } = await httpService.post(`${apiEndPoint}loadPosts/`, {
      data: userIds,
    });
    return data;
  },
  loadPost: async (postId: string): Promise<Post | undefined> => {
    const { data } = await httpService.get(`${apiEndPoint}loadPost/${postId}`);
    return data;
  },
  removePost: async (postId: string): Promise<Post | undefined> => {
    const { data } = await httpService.delete(
      `${apiEndPoint}removePost/${postId}`
    );
    return data;
  },
};

export default postService;
