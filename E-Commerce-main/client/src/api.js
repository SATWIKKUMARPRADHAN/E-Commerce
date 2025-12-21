// Axios configuration for API calls
import axios from 'axios';

// Direct connection to backend (proxy not working)
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth API
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Registration failed';
    throw new Error(message);
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
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/user/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch user profile');
  }
};

// Update User Profile API
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await api.put(`/user/profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update user profile');
  }
};

// Order History API
export const getUserOrders = async (userId) => {
  try {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

export const placeOrder = async (orderData) => {
  try {
    const response = await api.post('/orders/place', orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to place order');
  }
};

// Product API
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product details');
  }
};

// Cart API
export const getCart = async (userId) => {
  try {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch cart');
  }
};

export const addToCart = async (cartData) => {
  try {
    const response = await api.post('/cart/add', cartData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add to cart');
  }
};

export const updateCartQty = async (updateData) => {
  try {
    const response = await api.put('/cart/update-qty', updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update quantity');
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await api.delete(`/cart/remove/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to remove item');
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

