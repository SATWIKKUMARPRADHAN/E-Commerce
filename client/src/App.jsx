// Main App Component with Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Admin from './pages/Admin.jsx';
import Profile from './pages/Profile.jsx';
import Orders from './pages/Orders.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './App.css';

// add by priyanshu
import ProductListing from './pages/ProductListing.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Wishlist from './pages/Wishlist.jsx';

//add by shalini 
import React from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

import Cart from './pages/Cart.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import Payment from './pages/Payement.jsx';
import Footer from './components/Footer.jsx';
//adding FooterComponents
import AboutUs from './footerComponents/AboutUs.jsx';
import ContactUs from './footerComponents/ContactUs.jsx';
import Help from './footerComponents/Help.jsx';
import EarnWithUs from './footerComponents/EarnWithUs.jsx';
import PrivacyPolicy from './footerComponents/PrivacyPolicy.jsx';
import TermsOfService from './footerComponents/TermsOfService.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Home page - will be created by Priyanshu */}
            <Route path="/" element={<Home />} />
            
            {/* Product pages - will be created by Priyanshu */}
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />


            {/* User account pages - Satwik's work */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<PlaceholderPage title="Order Tracking" message="Order tracking page will be created by Shalini" />} />
            
            {/* Admin page - Satwik's work */}
            <Route path="/admin" element={<Admin />} />
            
            {/* Auth pages - will be created by Shalini */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/register" element={<Register />} /> */}
            
            <Route path="/order-track" element={<OrderTracking />} />
            <Route path="/payment" element={<Payment />}  />
            <Route path='/checkout' element={<Checkout />} />

            {/* footer element added by Shalini */}
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/contactUs' element={<ContactUs />} />
            <Route path="/help" element={<Help />} />
            <Route path='/earnWithUs' element={<EarnWithUs />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />


            {/* Cart & Checkout - will be created by Shalini */}
            <Route path='/cart' element={<Cart />} />
            <Route path="/checkout" element={<PlaceholderPage title="Checkout" message="Checkout page will be created by Shalini" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

// Enhanced Home Component (will be replaced by Priyanshu)
function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to HYPERRUSH</h1>
        <p>Discover amazing products at unbeatable prices</p>
        <div className="home-cta">
          <a href="/products" className="cta-button cta-primary">Shop Now</a>
          <a href="/products" className="cta-button cta-secondary">Browse Products</a>
        </div>
      </div>

      <div className="home-stats">
        <h2>Why Choose Us?</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5K+</span>
            <span className="stat-label">Products Available</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Secure Payment</span>
          </div>
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <span className="feature-icon">🛍️</span>
          <h3>Browse Products</h3>
          <p>Explore our wide range of high-quality products across multiple categories</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">❤️</span>
          <h3>Wishlist</h3>
          <p>Save your favorite items for later and never miss a deal</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🛒</span>
          <h3>Easy Shopping</h3>
          <p>Simple checkout process with secure payment options</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📦</span>
          <h3>Fast Delivery</h3>
          <p>Track your orders in real-time with our reliable delivery service</p>
        </div>
      </div>
      <Footer />
    </div>
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

