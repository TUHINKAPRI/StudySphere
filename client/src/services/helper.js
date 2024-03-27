import axios from "axios";

const baseURL = "http://localhost:4000/api/v1";
// const baseURl="https://studysphere-3a2o.onrender.com/api/v1"

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = JSON.parse(token);
      return config
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return err?.response;
  }
);
