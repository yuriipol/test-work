import axios from "axios";

const instance = axios.create({
  baseURL: "https://64378c75894c9029e8c02c43.mockapi.io/api-tweets/",
  params: {
    page: 1,
    limit: 9,
  },
});

export const getUsersCards = async (page) => {
  const { data } = await instance.get(`users`, {
    params: {
      page: page,
    },
  });
  return data;
};
