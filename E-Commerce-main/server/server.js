// Express server setup
// Run with: node server/server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './model/Product.js';
import User from './model/User.js'
import generalRoutes from './routes/general.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';
import mongoose from 'mongoose';
// import { connectDB } from './db.js'; // Uncomment when MongoDB is ready

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//connection to database
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB connected");
    })
    .catch((error) => console.error("DB connection error", error));

// Routes
app.use('/api', generalRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Login and signup routes moved to general.js for consistency





// Root endpoint
app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING! 🚀 API is available at /api');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);

    // Uncomment when MongoDB is ready:
    // connectDB();
});

