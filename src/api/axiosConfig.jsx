import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT,
  // If you don't want to use .env .., just write it here buddy!
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let toastFunction = null;
export const setToastFunction = (toast) => {
  toastFunction = toast;
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (toastFunction) {
      toastFunction("Có lỗi xảy ra khi gửi yêu cầu!", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    const errorMessage =
      error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau";

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default axiosInstance;
