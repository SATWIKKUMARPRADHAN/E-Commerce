// Express server setup
// Run with: node server/server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './model/User.js'
import generalRoutes from './routes/general.js'; 
// import Product from './model/Product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

import track from './routes/track.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
// import { connectDB } from './db.js'; // Uncomment when MongoDB is ready

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;
app.use(express.json());

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));



// Routes
app.use('/api', generalRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/track', track);
app.use('/api/orders', orderRoutes);



//login and signup routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;

        //if user already exist
        const existUser = await User.findOne({ $or: [{ email: email }, { mobile: mobile }] });
        if (existUser) {
            return res.status(400).json({ message: "user already exist" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(password, salt);


        //create new user
        const newUser = await User.create({ name, mobile, email, password: hashedPassword });
        res.status(201).json({
            message: "user registered successfully",
            user: newUser
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server Error during signup", error: error.message });
    }
});


app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
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
        res.status(500).json({ message: "Server Error", error: error.message });
    }

});





// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
// ... imports and middleware remain the same ...



// Connect to DB FIRST, then start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully to:", mongoose.connection.name);
        
        // ONLY start the server if DB connects
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`API endpoints available at http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => {
        console.error("CRITICAL DB ERROR:", error.message);
        // Ensure the process stops if DB fails
        process.exit(1);
    });

