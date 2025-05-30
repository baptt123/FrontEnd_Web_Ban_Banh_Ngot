// src/api/commentApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/comments';

export const addComment = async (commentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/addcomment`, commentData);
        return response.data;
    } catch (error) {
        console.error('Failed to add comment:', error);
        throw error;
    }
};

export const fetchAllComments = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/comments`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        await axios.delete(`${BASE_URL}/deletecomment/${commentId}`);
    } catch (error) {
        console.error('Failed to delete comment:', error);
        throw error;
    }
};
