import * as types from "./type";
import axiosInstance from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { registerApi, verifyEmailApi, loginApi, googleLoginApi, logoutApi, forgotPasswordApi, resetPasswordApi } from "../../api/authApi";
import { getUserProfileApi, updateUserProfileApi } from "../../api/userProfileApi";
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
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
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
    const res = await registerApi(data);
    if (res.success) {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: REGISTER_FAILURE, error: res.error });
      throw res.error;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const verifyEmail = (token) => async (dispatch) => {
  dispatch({ type: VERIFY_REQUEST });
  try {
    const res = await verifyEmailApi(token);
    if (res.success) {
      dispatch({ type: VERIFY_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: VERIFY_FAILURE, error: res.error });
      throw res.error;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await loginApi(credentials);
    if (res.success) {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: LOGIN_FAILURE, error: res.error });
      throw res.error;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const googleLogin = (token) => async (dispatch) => {
  dispatch({ type: GOOGLE_REQUEST });
  try {
    const res = await googleLoginApi(token);
    if (res.success) {
      dispatch({ type: GOOGLE_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: GOOGLE_FAILURE, error: res.error });
      throw res.error;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const logout = () => async (dispatch) => {
  try {
    const res = await logoutApi();
    if (res.success) {
      dispatch({ type: LOGOUT });
    } else {
      console.error("Logout error:", res.error);
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
};

export const getUserProfile = () => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const res = await getUserProfileApi();
    if (res.success) {
      dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: GET_USER_PROFILE_FAILURE, error: res.error });
      throw res.error;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateUserProfile = (userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
  try {
    const res = await updateUserProfileApi(userData);
    if (res.success) {
      dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: UPDATE_USER_PROFILE_FAILURE, error: res.error });
      throw res.error;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_REQUEST });
  try {
    const res = await forgotPasswordApi(email);
    if (res.success) {
      dispatch({ type: FORGOT_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: FORGOT_FAILURE, error: res.error });
      throw res.error;
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const resetPassword =
  ({ token, newPassword }) =>
  async (dispatch) => {
    dispatch({ type: RESET_REQUEST });
    try {
      const res = await resetPasswordApi({ token, newPassword });
      if (res.success) {
        dispatch({ type: RESET_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: RESET_FAILURE, error: res.error });
        throw res.error;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  };
