// All API routes in one file
// TODO: Replace dummy data with MongoDB queries after connecting database

import express from 'express';
import { dummyUsers, dummyProducts, dummyOrders } from './data.js';

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
// GET /api/user/profile
// TODO: Use real userId from authentication token
router.get('/user/profile', (req, res) => {
  try {
    // TODO: Replace with MongoDB query:
    // const userId = req.user.id; // from authentication middleware
    // const user = await User.findById(userId);

    const userId = '1'; // Dummy userId - replace with actual auth
    const user = dummyUsers.find(u => u._id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update User Profile API
// PUT /api/user/profile
// TODO: Use real userId from authentication token
router.put('/user/profile', (req, res) => {
  try {
    // TODO: Replace with MongoDB query:
    // const userId = req.user.id; // from authentication middleware
    // const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

    const userId = '1'; // Dummy userId - replace with actual auth
    const { name, email, mobile } = req.body;

    // Validate input
    if (!name || !email || !mobile) {
      return res.status(400).json({ error: 'Name, email, and mobile are required' });
    }

    // Find user in dummy data
    const userIndex = dummyUsers.findIndex(u => u._id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    dummyUsers[userIndex] = {
      ...dummyUsers[userIndex],
      name,
      email,
      mobile
    };

    res.json({
      message: 'Profile updated successfully',
      user: {
        name: dummyUsers[userIndex].name,
        email: dummyUsers[userIndex].email,
        mobile: dummyUsers[userIndex].mobile,
        createdAt: dummyUsers[userIndex].createdAt,
        lastLogin: dummyUsers[userIndex].lastLogin
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Order History API
// GET /api/user/orders
// TODO: Use real userId from authentication token
router.get('/user/orders', (req, res) => {
  try {
    // TODO: Replace with MongoDB query:
    // const userId = req.user.id; // from authentication middleware
    // const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    const userId = '1'; // Dummy userId - replace with actual auth
    const orders = dummyOrders
      .filter(order => order.userId === userId)
      .map(order => ({
        orderId: order.orderId,
        products: order.products,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(orders);
  } catch (error) {
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

