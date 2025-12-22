// server/routes/general.js
import express from 'express';
import { dummyOrders } from '../data.js'; 
import Product from '../model/Product.js';
import User from '../model/User.js'; // ✅ 1. Import User Model

const router = express.Router();

// --- ADMIN DASHBOARD (Kept as is for now) ---
router.get('/admin/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); // Real count
    const totalProducts = await Product.countDocuments();
    // keeping dummy orders for now as requested
    const totalOrders = dummyOrders.length; 
    const totalRevenue = dummyOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      recentOrders: dummyOrders.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// --- ✅ FIXED USER PROFILE ROUTE ---
// Changed from '/user/profile' to '/user/profile/:id' to match frontend
router.get('/user/profile/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // 1. Find the REAL user in MongoDB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 2. Return real data
    res.json({
      name: user.name,
      email: user.email,
      phone: user.mobile,
      address: user.address || "No address added",
      createdAt: user.createdAt,
      lastLogin: new Date() // Just a placeholder
    });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// --- ORDER HISTORY (Kept as is) ---
router.get('/user/orders', (req, res) => {
    // ... your existing code ...
    // Note: Eventually you will want to filter by the REAL user ID too
    res.json(dummyOrders); 
});

// --- PRODUCT ROUTES ---
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    } else {
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

//chatbot route
router.post('/chatbot', async (req, res) => {
    const { message } = req.body;
    
    // 1. Basic Logic (Replace this with AI or Database logic later)
    let botResponse = "I'm not sure about that. Try asking about 'tracking' or 'returns'.";
    
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        botResponse = "Hello! Welcome to our store. How can I help you with your style today?";
    } 
    else if (lowerMsg.includes('track') || lowerMsg.includes('order')) {
        botResponse = "To track your order, go to your Profile > Orders page.";
    } 
    else if (lowerMsg.includes('return') || lowerMsg.includes('refund')) {
        botResponse = "We accept returns within 7 days. Please keep the tags intact!";
    }
    else if (lowerMsg.includes('product') || lowerMsg.includes('buy')) {
        botResponse = "Check out our 'Featured' section on the homepage for the latest drops!";
    }

    // 2. Return the dynamic response
    res.json({ 
        response: botResponse, 
        timestamp: new Date().toISOString() 
    });
});
export default router;