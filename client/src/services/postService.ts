import configFile from "../config.json";
import httpService from "./httpService";
import { createPostData } from "./../hoc/hooks/usePosts/usePost.types";

const apiEndPoint = "/posts/";
const postService = {
  createPost: async (post: createPostData): Promise<{}> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, {
      ...post,
    });

    return data;
  },
};

export default postService;
