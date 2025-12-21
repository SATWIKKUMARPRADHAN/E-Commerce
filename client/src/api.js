// Axios configuration for API calls
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3030/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth APIs
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

// Admin Dashboard API
export const getAdminDashboard = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch dashboard data');
  }
};

// User Profile API
// User Profile API
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/user/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch user profile');
  }
};

export const updateUserProfile = async (userId, data) => {
  try {
    const response = await api.put(`/user/profile/${userId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update profile');
  }
};

// Order History API
export const getUserOrders = async (userId) => {
  try {
    const response = await api.get(`/user/orders/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch orders');
  }
};

// Chatbot API
export const sendChatbotMessage = async (message) => {
  try {
    const response = await api.post('/chatbot', { message });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to send message');
  }
};

export default api;

