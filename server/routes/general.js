// All API routes in one file
// TODO: Replace dummy data with MongoDB queries after connecting database

import express from 'express';
import User from '../model/User.js';
import Order from '../model/Order.js';
import { dummyUsers, dummyProducts, dummyOrders } from '../data.js';

const router = express.Router();

// Admin Dashboard API
// GET /api/admin/dashboard
router.get('/admin/dashboard', (req, res) => {
  try {
    // TODO: Replace with MongoDB queries:
    // const totalUsers = await User.countDocuments();
    // const totalOrders = await Order.countDocuments();
    // const totalProducts = await Product.countDocuments();
    // const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]);
    // const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('userId');

    const totalUsers = dummyUsers.length;
    const totalOrders = dummyOrders.length;
    const totalProducts = dummyProducts.length;
    const totalRevenue = dummyOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const recentOrders = dummyOrders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(order => ({
        orderId: order.orderId,
        userId: order.userId,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt
      }));

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// User Profile API
// GET /api/user/profile/:id
// User Profile API
// GET /api/user/profile/:id
router.get('/user/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      phone: user.mobile,
      address: user.address || {},
      createdAt: user.createdAt,
      lastLogin: user.updatedAt // Using updatedAt as proxy for now
    });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update User Profile API
// PUT /api/user/profile/:id
router.put('/user/profile/:id', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobile: phone, // Map phone to mobile
        address
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
      }
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Update User Profile API
// PUT /api/user/profile/:id
router.put('/user/profile/:id', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobile: phone, // Map phone to mobile
        address
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
      }
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Order History API
// GET /api/user/orders/:userId
router.get('/user/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format if needed, or let mongoose handle it
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Chatbot API
// POST /api/chatbot
router.post('/chatbot', (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userMessage = message.toLowerCase();

    // Keyword-based intent handling
    let botResponse = '';
    let intent = 'general';

    if (userMessage.includes('website') || userMessage.includes('help') || userMessage.includes('how')) {
      botResponse = 'Our website offers a wide range of products. You can browse categories, view product details, and place orders. Need help with something specific?';
      intent = 'website help';
    } else if (userMessage.includes('product') || userMessage.includes('item') || userMessage.includes('buy')) {
      botResponse = 'We have various products including electronics, clothing, and footwear. You can search for products using the search bar or browse by category.';
      intent = 'product queries';
    } else if (userMessage.includes('order') || userMessage.includes('status') || userMessage.includes('track')) {
      botResponse = 'You can check your order status in the Order History page. Your orders will show as Pending, Processing, Shipped, or Delivered.';
      intent = 'order status';
    } else if (userMessage.includes('refund') || userMessage.includes('return') || userMessage.includes('cancel')) {
      botResponse = 'For refunds or returns, please contact our support team. You can reach us via email at support@ecommerce.com or call +1-800-123-4567.';
      intent = 'refund / return';
    } else if (userMessage.includes('contact') || userMessage.includes('support') || userMessage.includes('help')) {
      botResponse = 'Our customer support team is available 24/7. Email: support@ecommerce.com | Phone: +1-800-123-4567 | Live chat available on weekdays 9 AM - 6 PM.';
      intent = 'contact support';
    } else {
      botResponse = 'I\'m here to help! You can ask me about products, orders, returns, or contact information. How can I assist you today?';
      intent = 'general';
    }

    res.json({
      response: botResponse,
      intent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chatbot message' });
  }
});

export default router;

