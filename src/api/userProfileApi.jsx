import axiosInstance from "../api/axiosConfig.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const API_BASE = import.meta.env.VITE_API_ROOT;

export const getUserProfileApi = async () => {
  try {
    const res = await axiosInstance.get(`${API_BASE}/profile/me`);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data };
  }
};

export const updateUserProfileApi = async (userData) => {
  try {
    const res = await axiosInstance.put(`${API_BASE}/profile/update`, userData);
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data };
  }
}; 