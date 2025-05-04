import axios from 'axios';

const API_URL = '/api/auth';

// Cấu hình mặc định cho axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Tạo instance axios với cấu hình cụ thể
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Xử lý lỗi chung
const handleError = (error) => {
    if (error.response) {
        // Server trả về response với status code nằm ngoài 2xx
        console.error('Response error:', error.response.data);
        throw error.response.data;
    } else if (error.request) {
        // Request được gửi nhưng không nhận được response
        console.error('Request error:', error.request);
        throw { message: 'Không thể kết nối đến server' };
    } else {
        // Có lỗi khi thiết lập request
        console.error('Error:', error.message);
        throw { message: 'Đã xảy ra lỗi khi gửi yêu cầu' };
    }
};

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/login', {
            username,
            password
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const register = async (userData) => {
    try {
        console.log('Sending registration request with data:', userData);
        const response = await axiosInstance.post('/register', userData);
        console.log('Registration response:', response.data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}; 