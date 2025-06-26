import { jwtDecode } from "jwt-decode";
import { APIClient } from ".";

export const getMe = async () => {
  try {
    const { token } =
      JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
    if (!token) throw new Error("no token found");
    const { id } = jwtDecode(token);
    return await APIClient.get(`/users/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async () => {
  try {
    const { token } =
      JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
    if (!token) throw new Error("no token found");
    const { id } = jwtDecode(token);
    return await APIClient.get(`/users/${id}/posts`);
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (postData) => {
  try {
    const { token } =
      JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
    if (!token) throw new Error("no token found");
    const { id } = jwtDecode(token);
    return await APIClient.post("/posts", { ...postData, authorId: id });
  } catch (error) {
    throw new Error(error);
  }
};
