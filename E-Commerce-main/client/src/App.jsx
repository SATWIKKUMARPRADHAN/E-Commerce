// Main App Component with Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ProductListing from './pages/ProductListing.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Admin from './pages/Admin.jsx';
import Profile from './pages/Profile.jsx';
import './App.css';
//add by shalini 
import React from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home page - Created by Priyanshu */}
          <Route path="/" element={<Home />} />

          {/* Product pages - Created by Priyanshu */}
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* User account pages - Satwik's work */}
          <Route path="/profile" element={<Profile />} />

          {/* Admin page - Satwik's work */}
          <Route path="/admin" element={<Admin />} />

          {/* Auth pages - will be created by Shalini */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/register" element={<Register />} /> */}

          {/* Cart & Checkout - will be created by Shalini */}
          <Route path='/cart' element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Layout>
    </Router>
  );
}

// Placeholder component for pages created by other teammates
function PlaceholderPage({ title, message }) {
  return (
    <div className="placeholder-container">
      <div className="placeholder-content">
        <h1>{title}</h1>
        <p>{message}</p>
        <p className="placeholder-note">This page is being developed by another team member.</p>
      </div>
    </div>
    
  );
}

export default App;

