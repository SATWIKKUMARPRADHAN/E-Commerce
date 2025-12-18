// Express server setup
// Run with: node server/server.js

import express from 'express';
import cors from 'cors';
import routes from './routes.js';
// import { connectDB } from './db.js'; // Uncomment when MongoDB is ready

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

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

