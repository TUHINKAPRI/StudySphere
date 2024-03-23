import axios from "axios";

const baseURL = "http://localhost:4000/api/v1";

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
 (err) => {
    return err?.response
  }
);
