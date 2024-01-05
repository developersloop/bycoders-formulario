import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL_API,
  timeout: 5000,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error status code:", error.response.status);
      console.error("Error data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);
export default api;
