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
    toast.success(res.data);
    return { success: true, data: res.data };
  } catch (err) {
    toast.error(err.response?.data || "Verification failed");
    return { success: false, error: err.response?.data };
  }
};

export const loginApi = async (credentials) => {
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/login`, credentials);
    toast.success(res.data.message);
    return { success: true, data: res.data };
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    return { success: false, error: err.response?.data };
  }
};

export const googleLoginApi = async (token) => {
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/google-login`, {
      token,
    });
    if (res.data.user && !res.data.user.active) {
      toast.error(
        res.response?.data?.message ||
          "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email của bạn để kích hoạt tài khoản."
      );
      return { success: false, error: res.response?.data };
    }
    toast.success(res.data.message || "Google login successful");
    return { success: true, data: res.data };
  } catch (error) {
    toast.error(error.response?.data?.message || "Google login failed");
    return { success: false, error: error.response?.data };
  }
};

export const logoutApi = async () => {
  try {
    await axiosInstance.post(`${API_BASE}/auth/logout`);
    toast.info("Đã đăng xuất");
    return { success: true };
  } catch (err) {
    console.error("Logout error:", err);
    toast.error("Đăng xuất thất bại!");
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
    toast.success(res.data);
    return { success: true, data: res.data };
  } catch (err) {
    toast.error(err.response?.data || "Forgot password failed");
    return { success: false, error: err.response?.data };
  }
};

export const resetPasswordApi = async ({ token, newPassword }) => {
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/reset-password`, {
      token,
      newPassword,
    });
    toast.success(res.data);
    return { success: true, data: res.data };
  } catch (err) {
    toast.error(err.response?.data || "Reset password failed");
    return { success: false, error: err.response?.data };
  }
}; 