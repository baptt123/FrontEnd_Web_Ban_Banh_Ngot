import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/ratings';
export const addRating = async (ratingRequest) => {
    const response = await axios.post(`${BASE_URL}/addratings`, ratingRequest);
    return response.data;
};

export const fetchAllRatings = async () => {
    const response = await axios.get(`${BASE_URL}/getratings`);
    return response.data;
};
export const updateRating = async (id, ratingRequest) => {
    const response = await axios.put(`${BASE_URL}/updateratings`, ratingRequest);
    return response.data;
};
