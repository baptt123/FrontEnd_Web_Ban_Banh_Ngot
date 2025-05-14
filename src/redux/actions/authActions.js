import axiosInstance from '../../utils/axiosInstance';

// Action Types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_INACTIVE_ACCOUNT = 'LOGIN_INACTIVE_ACCOUNT';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const VERIFY_ACCOUNT_REQUEST = 'VERIFY_ACCOUNT_REQUEST';
export const VERIFY_ACCOUNT_SUCCESS = 'VERIFY_ACCOUNT_SUCCESS';
export const VERIFY_ACCOUNT_FAILURE = 'VERIFY_ACCOUNT_FAILURE';

// Thêm action types mới
export const RESEND_ACTIVATION_REQUEST = 'RESEND_ACTIVATION_REQUEST';
export const RESEND_ACTIVATION_SUCCESS = 'RESEND_ACTIVATION_SUCCESS';
export const RESEND_ACTIVATION_FAILURE = 'RESEND_ACTIVATION_FAILURE';

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
      const response = await axiosInstance.post('/auth/login', userData, {
        withCredentials: true
      });
      
      console.log("Login API response:", response.data);
      
      // Kiểm tra trạng thái active của người dùng
      if (response.data.user && !response.data.user.active) {
        console.log("User account is not active!");
        
        // Lưu thông tin user nhưng đánh dấu là không active
        localStorage.setItem('auth_user', JSON.stringify({
          ...response.data.user,
          needActivation: true
        }));
        
        dispatch({
          type: LOGIN_INACTIVE_ACCOUNT,
          payload: {
            user: response.data.user,
            message: 'Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản.'
          }
        });
        
        return Promise.reject({
          message: 'Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản.'
        });
      }
      
      // Lưu thông tin user vào localStorage
      localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
      
      return Promise.resolve(response.data);
    } catch (error) {
      console.error("Login error:", error);
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
      const response = await axiosInstance.post('/auth/google-login', { credential }, {
        withCredentials: true
      });
      
      // Kiểm tra trạng thái active của người dùng
      if (response.data.user && !response.data.user.active) {
      dispatch({
          type: LOGIN_FAILURE,
          payload: 'Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email của bạn để kích hoạt tài khoản.'
      });
        return Promise.reject('Tài khoản chưa được kích hoạt');
      }
      
      localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      
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

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    
    try {
      await axiosInstance.post('/auth/logout', {}, {
        withCredentials: true
      });
      
      // Xóa dữ liệu từ localStorage
      localStorage.removeItem('auth_user');
      
      dispatch({ type: LOGOUT_SUCCESS });
      
      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILURE,
        payload: error.response?.data?.message || 'Đăng xuất thất bại'
      });
      
      // Vẫn xóa dữ liệu local dù API có lỗi
      localStorage.removeItem('auth_user');
      
      return Promise.reject(error);
    }
  };
};

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

// Sửa hàm verifyAccount để gửi request đến backend đúng cách
export const verifyAccount = (token) => {
  return async (dispatch) => {
    dispatch({ type: VERIFY_ACCOUNT_REQUEST });
    
    try {
      const response = await axiosInstance.get(`/auth/verify?token=${token}`);
      
      console.log("Verify API response:", response.data);
      
      dispatch({
        type: VERIFY_ACCOUNT_SUCCESS,
        payload: response.data
      });
      
      return Promise.resolve(response.data);
    } catch (error) {
      console.error("Verify API error:", error);
      
      dispatch({
        type: VERIFY_ACCOUNT_FAILURE,
        payload: error.response?.data?.message || 'Xác thực tài khoản thất bại'
      });
      
      return Promise.reject(error);
    }
  };
};

// Thêm action gửi lại email kích hoạt
export const resendActivation = (email) => {
  return async (dispatch) => {
    dispatch({ type: RESEND_ACTIVATION_REQUEST });
    
    try {
      const response = await axiosInstance.post('/auth/resend-activation', { email });
      
      dispatch({
        type: RESEND_ACTIVATION_SUCCESS,
        payload: response.data
      });
      
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch({
        type: RESEND_ACTIVATION_FAILURE,
        payload: error.response?.data?.message || 'Gửi lại email kích hoạt thất bại'
      });
      
      return Promise.reject(error);
    }
  };
};