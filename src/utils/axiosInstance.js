import axios from 'axios';

// Tạo instance axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Tạo một closure để lưu hàm addToast
let showToast = null;

// Hàm để thiết lập toast function từ bên ngoài
export const setToastFunction = (addToastFunction) => {
  showToast = addToastFunction;
};

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    if (showToast) {
      showToast("Có lỗi xảy ra khi gửi yêu cầu!", { 
        appearance: 'error', 
        autoDismiss: true 
      });
    }
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Kiểm tra cấu trúc lỗi và log để debug
    console.error('API Error:', error);
    
    if (error.response) {
      const { response } = error;
      const errorData = response.data;
      
      // Hiển thị thông báo lỗi nếu showToast đã được thiết lập
      if (showToast) {
        switch (response.status) {
          case 400:
            // Xử lý thông báo lỗi dựa trên cấu trúc thực tế từ backend
            showToast(errorData.message || "Dữ liệu gửi không hợp lệ!", {
              appearance: 'error',
              autoDismiss: true
            });
            break;
          case 401:
            showToast("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!", {
              appearance: 'error',
              autoDismiss: true
            });
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            break;
          case 403:
            showToast("Bạn không có quyền thực hiện thao tác này!", {
              appearance: 'error',
              autoDismiss: true
            });
            break;
          case 404:
            showToast("Không tìm thấy tài nguyên yêu cầu!", {
              appearance: 'error',
              autoDismiss: true
            });
            break;
          case 500:
            showToast("Lỗi máy chủ. Vui lòng thử lại sau!", {
              appearance: 'error',
              autoDismiss: true
            });
            break;
          default:
            showToast(errorData.message || "Có lỗi xảy ra!", {
              appearance: 'error',
              autoDismiss: true
            });
        }
      }
    } else if (showToast) {
      showToast("Không thể kết nối đến máy chủ!", {
        appearance: 'error',
        autoDismiss: true
      });
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;