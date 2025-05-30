// src/services/productService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products'; // Thay đổi nếu endpoint khác

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/getproducts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
