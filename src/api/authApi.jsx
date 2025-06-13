import axiosInstance from "../api/axiosConfig.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const API_BASE = import.meta.env.VITE_API_ROOT;

export const registerApi = async (data) => {
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/register`, data);
    toast.success("Đăng ký thành công");
    return { success: true, data: res.data };
  } catch (err) {
    toast.error(err.response?.data?.message || "Đăng ký thất bại");
    return { success: false, error: err.response?.data };
  }
};

export const verifyEmailApi = async (token) => {
  try {
    const res = await axiosInstance.get(`${API_BASE}/auth/verify`, {
      params: { token },
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data };
  }
};

export const loginApi = async (credentials) => {
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/login`, credentials);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data };
  }
};

export const googleLoginApi = async (token) => {
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/google-login`, {
      token,
    });
    if (res.data.user && !res.data.user.active) {
      return { success: false, error: res.response?.data };
    }
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error.response?.data };
  }
};

export const logoutApi = async () => {
  try {
    await axiosInstance.post(`${API_BASE}/auth/logout`);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.response?.data };
  }
};

export const forgotPasswordApi = async (email) => {
  try {
    const res = await axiosInstance.post(
      `${API_BASE}/auth/forgot-password`,
      null,
      {
        params: { email },
      }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data };
  }
};

export const resetPasswordApi = async ({ token, newPassword }) => {
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/reset-password`, {
      token,
      newPassword,
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data };
  }
}; 