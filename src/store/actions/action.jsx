import * as types from "./type";
import axiosInstance from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  REMOVE_FROM_COMPARE_LIST,
  ADD_TO_COMPARE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILURE,
  GOOGLE_REQUEST,
  GOOGLE_SUCCESS,
  GOOGLE_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILURE,
} from "./type";

const API_BASE = import.meta.env.VITE_API_ROOT;

export const fetchProductsBegin = () => ({
  type: types.FETCH_PRODUCTS_BEGIN,
});

export const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

export const addToCart = (product, qty, color, size) => (dispatch) => {
  toast.success(`${product.title} Added to Cart`);
  dispatch({
    type: types.ADD_TO_CART,
    product,
    qty,
    color,
    size,
  });
};

export const removeFromCart = (product_id) => (dispatch) => {
  toast.success("Item Removed from Cart");
  dispatch({
    type: types.REMOVE_FROM_CART,
    product_id,
  });
};

export const incrementQuantity = (product_id) => (dispatch) => {
  dispatch({
    type: types.INCREMENT_QUANTITY,
    product_id,
  });
};

export const decrementQuantity = (product_id) => (dispatch) => {
  dispatch({
    type: types.DECREMENT_QUANTITY,
    product_id,
  });
};

export const addToWishList = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_WISHLIST,
    product,
  });
};

export const removeFromWishList = (id) => (dispatch) => {
  toast.error("Item removed from WishList");
  dispatch({
    type: REMOVE_FROM_WISHLIST,
    id,
  });
};

export const addToCompareList = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_COMPARE,
    product,
  });
};
export const removeFromCompareList = (product) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_COMPARE_LIST,
    product,
  });
};

// === AUTH ACTIONS ===
export const register = (data) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/register`, data);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    toast.success("Đăng ký thành công");
    return res.data;
  } catch (err) {
    dispatch({ type: REGISTER_FAILURE, error: err.response?.data });
    toast.error(err.response?.data?.message || "Đăng ký thất bại");
    throw err;
  }
};

export const verifyEmail = (token) => async (dispatch) => {
  dispatch({ type: VERIFY_REQUEST });
  try {
    const res = await axiosInstance.get(`${API_BASE}/auth/verify`, {
      params: { token },
    });
    dispatch({ type: VERIFY_SUCCESS });
    toast.success(res.data);
    return res.data;
  } catch (err) {
    dispatch({ type: VERIFY_FAILURE, error: err.response?.data });
    toast.error(err.response?.data || "Verification failed");
    throw err;
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/login`, credentials);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    toast.success(res.data.message);
    return res.data;
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, error: err.response?.data });
    toast.error(err.response?.data?.message || "Login failed");
    throw err;
  }
};

export const googleLogin = (token) => async (dispatch) => {
  dispatch({ type: GOOGLE_REQUEST });
  try {
    const res = await axiosInstance.post(`${API_BASE}/auth/google-login`, {
      token,
    });
    // Kiểm tra trạng thái active của người dùng
    if (res.data.user && !res.data.user.active) {
      dispatch({ type: GOOGLE_FAILURE, error: err.response?.data });
      toast.error(
        err.response?.data?.message ||
          "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email của bạn để kích hoạt tài khoản."
      );
      throw err;
    }
    dispatch({ type: GOOGLE_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: GOOGLE_FAILURE, error: err.response?.data });
    toast.error(err.response?.data?.message || "Google login failed");
    throw err;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.post(`${API_BASE}/auth/logout`);
    dispatch({ type: LOGOUT });
    toast.info("Đã đăng xuất");
  } catch (err) {
    console.error("Logout error:", err);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_REQUEST });
  try {
    const res = await axiosInstance.post(
      `${API_BASE}/auth/forgot-password`,
      null,
      {
        params: { email },
      }
    );
    dispatch({ type: FORGOT_SUCCESS });
    toast.success(res.data);
    return res.data;
  } catch (err) {
    dispatch({ type: FORGOT_FAILURE, error: err.response?.data });
    toast.error(err.response?.data || "Forgot password failed");
    throw err;
  }
};

export const resetPassword =
  ({ token, newPassword }) =>
  async (dispatch) => {
    dispatch({ type: RESET_REQUEST });
    try {
      const res = await axiosInstance.post(`${API_BASE}/auth/reset-password`, {
        token,
        newPassword,
      });
      dispatch({ type: RESET_SUCCESS });
      toast.success(res.data);
      return res.data;
    } catch (err) {
      dispatch({ type: RESET_FAILURE, error: err.response?.data });
      toast.error(err.response?.data || "Reset password failed");
      throw err;
    }
  };
