import axios from "axios";

const instance = axios.create({
  baseURL: "https://64378c75894c9029e8c02c43.mockapi.io/api-tweets/",
});

export const getUsersCards = async () => {
  const { data } = await instance.get("users");
  return data;
};
