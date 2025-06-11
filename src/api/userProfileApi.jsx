import axiosInstance from "../api/axiosConfig.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const API_BASE = import.meta.env.VITE_API_ROOT;

export const getUserProfileApi = async () => {
  try {
    const res = await axiosInstance.get(`${API_BASE}/profile/me`);
    // toast.success("Lấy thông tin hồ sơ thành công!"); // Consider if you want a toast for successful profile fetch
    return { success: true, data: res.data };
  } catch (err) {
    toast.error(err.response?.data?.message || "Không thể lấy thông tin hồ sơ");
    return { success: false, error: err.response?.data };
  }
};

export const updateUserProfileApi = async (userData) => {
  try {
    const res = await axiosInstance.put(`${API_BASE}/profile/update`, userData);
    toast.success("Cập nhật hồ sơ thành công!");
    return { success: true, data: res.data };
  } catch (err) {
    toast.error(err.response?.data?.message || "Cập nhật hồ sơ thất bại!");
    return { success: false, error: err.response?.data };
  }
}; 