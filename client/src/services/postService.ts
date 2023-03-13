import configFile from "../config.json";
import httpService from "./httpService";
import { createPostData, Post } from "./../hoc/hooks/usePosts/usePost.types";
import { PostData } from "../props/props";

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
};

export default postService;
