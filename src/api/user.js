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

export const editeMe = async (updatedData) => {
  try {
    const { token } =
      JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
    if (!token) throw new Error("No token found");
    const { id } = jwtDecode(token);
    return await APIClient.put(`/users/${id}`, updatedData);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteMe = async () => {
  const authState = JSON.parse(localStorage.getItem("auth-store"));
  const userId = authState?.state?.user?.id;
  return await APIClient.delete(`/users/${userId}`);
};
export const getUserById = async (id) => {
  try {
    return await APIClient.get(`/users/${id}`);
  } catch (error) {
    console.error("Error fetching user:", error);
    return { data: { name: "Unknown" } };
  }
};
