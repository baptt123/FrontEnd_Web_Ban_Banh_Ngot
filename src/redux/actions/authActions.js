import axiosInstance from '../../utils/axiosInstance';

// Action Types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

// Action Creators
export const register = (userData) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });
      
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response?.data?.message || 'Đăng ký thất bại'
      });
      return Promise.reject(error);
    }
  };
};

export const login = (userData) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
      const response = await axiosInstance.post('/auth/login', userData);
      
      // Lưu token và thông tin user vào localStorage
      if (response.data.accessToken) {
        localStorage.setItem('auth_token', response.data.accessToken);
        localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      }
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
      
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'Đăng nhập thất bại'
      });
      return Promise.reject(error);
    }
  };
};

export const googleLogin = (credential) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
      const response = await axiosInstance.post('/auth/google-login', { credential });
      
      if (response.data.accessToken) {
        localStorage.setItem('auth_token', response.data.accessToken);
        localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      }
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
      
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || 'Đăng nhập Google thất bại'
      });
      return Promise.reject(error);
    }
  };
};

// Cập nhật action logout để sử dụng API endpoint mới
export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    
    try {
      // Gọi API logout mới
      await axiosInstance.post('/auth/logout');
      
      // Xóa dữ liệu từ localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      
      dispatch({ type: LOGOUT_SUCCESS });
      
      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: error.response?.data?.message || 'Đăng xuất thất bại'
      });
      
      // Vẫn xóa dữ liệu local dù API có lỗi
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      
      return Promise.reject(error);
    }
  };
};

// Thêm action quên mật khẩu
export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    
    try {
      const response = await axiosInstance.post(`/auth/forgot-password?email=${email}`);
      
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: response.data
      });
      
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAILURE,
        payload: error.response?.data?.message || 'Gửi yêu cầu quên mật khẩu thất bại'
      });
      
      return Promise.reject(error);
    }
  };
};

// Thêm action đặt lại mật khẩu
export const resetPassword = (token, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    
    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        token,
        newPassword
      });
      
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: response.data
      });
      
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAILURE,
        payload: error.response?.data?.message || 'Đặt lại mật khẩu thất bại'
      });
      
      return Promise.reject(error);
    }
  };
};