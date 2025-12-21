// MongoDB connection using Mongoose
// TODO: Uncomment and configure after setting up MongoDB Atlas

import mongoose from 'mongoose';

// MongoDB Atlas connection string format:
// mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority';

export const connectDB = async () => {
  try {
    // Uncomment when ready to connect:
    // await mongoose.connect(MONGODB_URI);
    // console.log('MongoDB connected successfully');
    
    console.log('MongoDB connection is commented out. Using dummy data.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Uncomment when MongoDB is connected:
// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB disconnected');
// });

