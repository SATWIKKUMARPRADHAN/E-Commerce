// All API routes in one file
import express from 'express';
import { dummyUsers, dummyOrders } from '../data.js'; // product dummy data removed
import Product from '../model/Product.js';
import User from '../model/User.js';

const router = express.Router();

// Authentication Routes
// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    // Check if user already exists
    const existUser = await User.findOne({ $or: [{ email: email }, { mobile: mobile }] });
    if (existUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    // Create new user
    const newUser = await User.create({ name, mobile, email, password });
    res.status(201).json({
      message: "user registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Admin Dashboard API
router.get('/admin/dashboard', async (req, res) => {
  try {
    const totalUsers = dummyUsers.length; // Keeping dummy for now
    const totalOrders = dummyOrders.length; // Keeping dummy for now

    // Fetch real product count from DB
    const totalProducts = await Product.countDocuments();

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
router.get('/user/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address || {},
      createdAt: user.createdAt,
      lastLogin: user.updatedAt
    });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update User Profile API
router.put('/user/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, address } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;

    if (address) {
      user.address = {
        street: address.street || user.address?.street,
        city: address.city || user.address?.city,
        state: address.state || user.address?.state,
        zipCode: address.zipCode || user.address?.zipCode
      };
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        address: updatedUser.address
      }
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Order History API (Partial Dummy)
router.get('/user/orders', (req, res) => {
  try {
    const userId = '1';
    const orders = dummyOrders
      .filter(order => order.userId === userId)
      .map(order => ({
        orderId: order.orderId,
        products: order.products, // Note: these product references in dummy orders won't match new DB IDs yet, this is fine for now
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

// --- NEW REAL PRODUCT ROUTES ---

// GET /api/products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products/:id
router.get('/products/:id', async (req, res) => {
  try {
    // Search by numeric id (custom field) OR _id
    // Since frontend might send "1", "2", or an ObjectId
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // It's a MongoDB ObjectId
      product = await Product.findById(id);
    } else {
      // It's our numeric custom id
      product = await Product.findOne({ id: parseInt(id) });
    }

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Chatbot API
router.post('/chatbot', (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const userMessage = message.toLowerCase();
    let botResponse = '';
    let intent = 'general';

    if (userMessage.includes('website') || userMessage.includes('help') || userMessage.includes('how')) {
      botResponse = 'Our website offers a wide range of products. You can browse categories, view product details, and place orders.';
      intent = 'website help';
    } else if (userMessage.includes('product') || userMessage.includes('item') || userMessage.includes('buy')) {
      botResponse = 'We have various products including electronics, clothing, and footwear. Check out our latest collection!';
      intent = 'product queries';
    } else if (userMessage.includes('order') || userMessage.includes('status') || userMessage.includes('track')) {
      botResponse = 'You can check your order status in the Order History page.';
      intent = 'order status';
    } else if (userMessage.includes('refund') || userMessage.includes('return') || userMessage.includes('cancel')) {
      botResponse = 'For refunds or returns, please contact our support team.';
      intent = 'refund / return';
    } else if (userMessage.includes('contact') || userMessage.includes('support')) {
      botResponse = 'Our customer support team is available 24/7 at support@ecommerce.com.';
      intent = 'contact support';
    } else {
      botResponse = 'I\'m here to help! specific queries about products or orders work best.';
      intent = 'general';
    }

    res.json({ response: botResponse, intent, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chatbot message' });
  }
});

export default router;

