import axios from 'axios';

// Tạo instance axios với baseURL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // Quan trọng: Cho phép gửi và nhận cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Biến lưu hàm toast để sử dụng trong interceptor
let toastFunction = null;

// Function để set toast từ component
export const setToastFunction = (toast) => {
  toastFunction = toast;
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (toastFunction) {
      toastFunction("Có lỗi xảy ra khi gửi yêu cầu!", { 
        appearance: 'error', 
        autoDismiss: true 
      });
    }
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Nếu có message từ server và có toast function, hiển thị thông báo thành công
    if (response.data?.message && toastFunction) {
      toastFunction(response.data.message, {
        appearance: 'success',
              autoDismiss: true
            });
    }
    return response;
  },
  (error) => {
    // Xử lý lỗi response
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại sau';
    
    // Hiển thị thông báo lỗi nếu có toast function
    if (toastFunction) {
      toastFunction(errorMessage, {
        appearance: 'error',
        autoDismiss: true
      });
  }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;