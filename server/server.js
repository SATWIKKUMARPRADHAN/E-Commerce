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
// import { connectDB } from './db.js'; // Uncomment when MongoDB is ready

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(express.json());

//connection to database
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch((error)=>console.error("DB connection error", error));

// Routes
app.use('/api', generalRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/track', track);
app.use('/api/orders', orderRoutes);



//login and signup routes
app.post('/signup', async(req, res)=>{
    try{
        const {name, mobile, email, password} = req.body;
        
        //if user already exist
        const existUser = await User.findOne({ $or: [{email: email}, {mobile: mobile} ] });
        if(existUser){
            return res.status(400).json({message: "user already exist"});
        }
        //create new user
        const newUser = await User.create({name, mobile, email, password});
        res.status(201).json({
            message: "user registered successfully",
            user: newUser
        });
        
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error", error: error.message});
    }
});


app.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({email});

        if(!user || user.password !== password){
            return res.status(401).json({message: "Invalid email or password"});
        }
        res.json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
        
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

