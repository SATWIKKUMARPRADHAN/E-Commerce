// Main App Component with Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Admin from './pages/Admin.jsx';
import Profile from './pages/Profile.jsx';
import Orders from './pages/Orders.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './App.css';
import Home from './pages/Home.jsx';

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
          <Footer />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

// Enhanced Home Component (will be replaced by Priyanshu)


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

