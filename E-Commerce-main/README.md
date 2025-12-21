# E-Commerce MERN Stack Application

A simple, clean MERN (MongoDB, Express, React, Node.js) stack application built for college assignments. This project demonstrates a minimal structure with four core modules: Admin Dashboard, User Profile, Order History, and Customer Support Chatbot.

## 📁 Project Structure

```
e-commerce/
├── client/                 # React (Vite) Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Admin.jsx      # Admin Dashboard
│   │   │   ├── Profile.jsx    # User Profile
│   │   │   ├── Orders.jsx     # Order History
│   │   │   └── Chatbot.jsx    # Customer Support Chatbot
│   │   ├── api.js             # Axios API configuration
│   │   ├── App.jsx            # Main App with routing
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Node.js + Express Backend
│   ├── server.js           # Express server setup
│   ├── db.js               # MongoDB connection (commented)
│   ├── models.js           # Mongoose schemas (User, Order, Product)
│   ├── routes.js           # All API routes
│   ├── data.js             # Dummy data for development
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (optional, for database connection)

### Installation

**Option 1: Install all dependencies at once (Recommended)**
```bash
cd e-commerce
npm run install:all
```

**Option 2: Install separately**

1. **Install Backend Dependencies:**
   ```bash
   cd e-commerce/server
   npm install
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd e-commerce/client
   npm install
   ```

### Running the Application

**IMPORTANT:** You need TWO terminal windows - one for backend, one for frontend.

#### Terminal 1 - Start Backend Server

```bash
cd e-commerce/server
npm start
```

The server will run on `http://localhost:5000`

For development with auto-reload:
```bash
npm run dev
```

#### Terminal 2 - Start Frontend Development Server

```bash
cd e-commerce/client
npm run dev
```

The frontend will run on `http://localhost:3000`

**Alternative:** Use the root package.json to run both (requires `concurrently`):
```bash
cd e-commerce
npm install -g concurrently  # Install globally if not installed
npm run dev
```

## 📡 API Endpoints

### Admin Dashboard
- **GET** `/api/admin/dashboard`
  - Returns: `totalUsers`, `totalOrders`, `totalProducts`, `totalRevenue`, `recentOrders`

### User Profile
- **GET** `/api/user/profile`
  - Returns: User information (name, email, phone, address, createdAt, lastLogin)
  - **Note:** Currently uses dummy userId. Replace with authentication token later.

### Order History
- **GET** `/api/user/orders`
  - Returns: Array of orders with `orderId`, `products`, `totalAmount`, `paymentMethod`, `orderStatus`
  - **Note:** Currently uses dummy userId. Replace with authentication token later.

### Customer Support Chatbot
- **POST** `/api/chatbot`
  - Body: `{ "message": "your message here" }`
  - Returns: `{ "response": "...", "intent": "...", "timestamp": "..." }`
  
  **Supported Intents:**
  - Website help
  - Product queries
  - Order status
  - Refund / Return
  - Contact support

## 🗄️ MongoDB Integration

### Current Status
- MongoDB connection is **commented out** in `server/db.js`
- All APIs currently use **dummy data** from `server/data.js`
- Mongoose schemas are defined in `server/models.js` but models are commented

### Connecting MongoDB Atlas

1. **Get MongoDB Atlas Connection String:**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and get your connection string
   - Format: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority`

2. **Update `server/db.js`:**
   ```javascript
   // Uncomment the connection code:
   await mongoose.connect(MONGODB_URI);
   console.log('MongoDB connected successfully');
   ```

3. **Update `server/models.js`:**
   ```javascript
   // Uncomment the model exports:
   export const User = mongoose.model('User', userSchema);
   export const Product = mongoose.model('Product', productSchema);
   export const Order = mongoose.model('Order', orderSchema);
   ```

4. **Update `server/routes.js`:**
   - Replace dummy data queries with MongoDB queries
   - Example:
     ```javascript
     // Replace:
     const totalUsers = dummyUsers.length;
     
     // With:
     const totalUsers = await User.countDocuments();
     ```

5. **Set Environment Variable (Optional):**
   Create a `.env` file in `server/`:
   ```
   MONGODB_URI=your_connection_string_here
   PORT=5000
   ```

## 🔧 Integration Notes for Teammates

### Adding Authentication
1. Install JWT packages: `npm install jsonwebtoken bcryptjs`
2. Create authentication middleware
3. Update routes to use `req.user.id` instead of dummy userId
4. Add login/signup endpoints

### Adding New Features
- **Backend:** Add routes in `server/routes.js`
- **Frontend:** Create new page in `client/src/pages/`
- **API:** Add function in `client/src/api.js`
- **Routing:** Add route in `client/src/App.jsx`

### Code Style
- Keep it simple and commented
- Use consistent naming conventions
- Add TODO comments for future improvements
- Structure code for easy viva presentation

## 📝 Features Implemented

✅ **Admin Dashboard**
- Statistics cards (Users, Orders, Products, Revenue)
- Recent orders table with status badges

✅ **User Profile**
- Personal information display
- Address information
- Account creation and last login dates

✅ **Order History**
- List of all user orders
- Order details (products, amounts, payment methods)
- Order status tracking

✅ **Customer Support Chatbot**
- Interactive chat interface
- Keyword-based intent recognition
- Quick suggestion buttons
- Message timestamps

## 🚫 Not Implemented (As Per Requirements)

- Login / Signup
- Shopping Cart
- Payment Processing
- Wishlist
- Product Listing UI

## 🛠️ Technologies Used

- **Frontend:** React 19, Vite, React Router DOM, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose) - Ready but commented
- **Styling:** CSS (No frameworks for minimal structure)

## 📚 Development Notes

- All backend routes are in a single file (`routes.js`) for simplicity
- All Mongoose models are in a single file (`models.js`)
- Frontend uses simple CSS without frameworks
- Dummy data is used until MongoDB is connected
- Code is heavily commented for educational purposes

## 🎓 For College Assignment

This project is structured to be:
- **Easy to explain** during viva
- **Simple to understand** for teammates
- **Ready for integration** with MongoDB
- **Minimal but functional** - demonstrates MERN stack concepts

## 📞 Support

For questions or issues:
- Check API endpoints documentation above
- Review code comments in each file
- Ensure both frontend and backend servers are running
- Check browser console and server logs for errors

---

**Built with ❤️ for MERN Stack Learning**
