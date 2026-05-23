import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setBaseUrl = (url: string) => {
  api.defaults.baseURL = url;
};

export default api;
