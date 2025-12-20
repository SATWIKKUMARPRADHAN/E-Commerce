import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserRound, Search, Heart, ShoppingBag, LogOut } from 'lucide-react';
import ChatbotWidget from './ChatbotWidget.jsx'; // Satwik's Chatbot
import './Layout.css'; // Keep Satwik's CSS for the general layout structure

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // --- SHALINI'S AUTH LOGIC ---
  // Using real data instead of placeholders
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="layout">
      
      {/* --- SHALINI'S NAVBAR DESIGN (Replacing Satwik's generic nav) --- */}
      <div
        className="container-fluid text-white"
        style={{
          position: 'absolute', // Your glass effect positioning
          top: 0,
          left: 0,
          width: '100%',
          backdropFilter: 'blur(10px)',
          background: 'rgba(0,0,0,0.4)',
          zIndex: 1000,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className="row">
          <nav className="d-flex align-items-center justify-content-between p-3">
            
            {/* Left: Logo & Main Links */}
            <div className="d-flex align-items-center gap-4">
              {/* Logo */}
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }} className="fw-bold fs-4 m-0">
                🛍️ HYPERRUSH
              </Link>
              
              {/* Satwik's Links integrated into your style */}
              <div className="d-none d-md-flex gap-3">
                <Link to="/" className="text-white text-decoration-none small hover-opacity">Home</Link>
                <Link to="/products" className="text-white text-decoration-none small hover-opacity">Products</Link>
              </div>
            </div>

            
            <div
              className="d-none d-md-flex align-items-center"
              style={{
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '6px 20px',
                borderRadius: '20px',
                gap: '10px',
                background: 'rgba(255,255,255,0.1)'
              }}
            >
              <Search size={18} color="white" />
              <input
                type="text"
                placeholder="Search drops..."
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  outline: 'none',
                  minWidth: '200px'
                }}
              />
            </div>

            {/* Right: Icons & User Actions */}
            <div className="d-flex align-items-center fw-bold mr-6" style={{ gap: '20px' }}>
              
              {user ? (
                <div className="d-flex align-items-center gap-4">
                  
                  {/* will be on user profile page */}
                  {/* <Link to="/orders" className="text-white text-decoration-none small" style={{opacity: 0.8}}>Orders</Link> */}
                  
                  <span className="small text-warning">Hi, {user.name.split(' ')[0]}</span>
                  
                  <button 
                    onClick={handleLogout} 
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" style={{ color: 'white' }}>
                  <UserRound size={22} />
                </Link>
              )}

              <Link to="/wishlist" style={{ background: 'none', border: 'none', color: 'white' }}>
                <Heart size={22} />
              </Link>

              <Link to="/cart" style={{ background: 'none', border: 'none', color: 'white', position: 'relative' }}>
                <ShoppingBag size={22} />
                {/* Optional: Add a badge here later if you want */}
              </Link>

              <Link to="/Profile" style={{ background: 'none', border: 'none', color: 'white', position: 'relative' }}>
                <UserRound  size={22} />
                {/* Optional: Add a badge here later if you want */}
              </Link>
            </div>

          </nav>
        </div>
      </div>

      
      {/* Added paddingTop so your absolute navbar doesn't cover the content */}
      <main className="main-content" style={{ minHeight: '100vh', paddingTop: '80px', background: '#0a0a0a' }}>
        {children}
      </main>

      {/* Floating Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}

export default Layout;