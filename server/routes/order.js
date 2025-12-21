import express from 'express';
import Order from '../model/Order.js';
import Cart from '../model/Cart.js';

const router = express.Router();

// Place Order
router.post('/place', async (req, res) => {
    try {
        const { userId, products, totalAmount, paymentMethod } = req.body;

        if (!userId || !products || products.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        // Generate a random order ID (e.g., ORD12345678)
        const orderId = 'ORD' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');

        const newOrder = new Order({
            userId,
            orderId,
            products,
            totalAmount,
            paymentMethod: paymentMethod || 'Cash on Delivery'
        });

        await newOrder.save();

        // Clear user's cart after placing order
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
});

// Get User Orders
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Error fetching user orders", error: error.message });
    }
});

export default router;
