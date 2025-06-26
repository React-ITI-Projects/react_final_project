import { APIClient } from ".";

export const postsAPI = async (data) => {
  return await APIClient.post("/posts", { ...data });
};
export const editPostsAPI = async (id, data) => {
  return await APIClient.put(`/posts/${id}`, { ...data });
};
export const deletePostsAPI = async (id) => {
  return await APIClient.delete(`/posts/${id}`);
};
export const getPosts = async () => {
  try {
    return await APIClient.get(`/posts`);
  } catch (error) {
    throw new Error(error);
  }
};
export const getSinglePost = async (id) => {
  return await APIClient.get(`/posts/${id}`);
};
