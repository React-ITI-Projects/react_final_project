import { APIClient } from ".";
import axios from "axios";

export const registerAPI = async (data) => {
  return axios.post("http://localhost:3000/signup", data);
};

export const logInAPI = async (data) => {
  return axios.post("http://localhost:3000/login", data);
};

export const refreshTokeAPI = async (data) => {
  return await APIClient.post("/refresh-token", { ...data });
};
