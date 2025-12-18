// Axios configuration for API calls
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

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
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch user profile');
  }
};

// Order History API
export const getUserOrders = async () => {
  try {
    const response = await api.get('/user/orders');
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

