import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserRound, Search, Heart, ShoppingBag, LogOut } from 'lucide-react';
import ChatbotWidget from './ChatbotWidget.jsx'; 
import './Layout.css'; 
import { useAuth } from '../context/AuthContext.jsx'; 

function Layout({ children }) {
  const navigate = useNavigate();
  // Get user and logout function directly from Context
  const { isLoggedIn, user, logout } = useAuth(); 

  const handleLogout = () => {
    logout(); // Updates context state
    navigate('/login'); // Redirects user
  };

  return (
    <div className="layout">
      
      
      <div
        className="container-fluid text-white"
        style={{
          position: 'fixed', 
          top: 0,
          left: 0,
          width: '100%',
          backdropFilter: 'blur(10px)',
          background: 'rgba(0,0,0,0.6)', 
          zIndex: 1000,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className="row">
          <nav className="d-flex align-items-center justify-content-between p-3 px-4">
            
            {/* 1. LEFT: Logo & Main Links */}
            <div className="d-flex align-items-center gap-5">
              <Link to="/" className="text-decoration-none text-white fw-black fs-4 tracking-tighter">
                <span className="text-stroke" style={{ letterSpacing: '2px' }}>🛍️ HYPERRUSH</span>
              </Link>
              
              <div className="d-none d-md-flex gap-4">
                <Link to="/" className="text-gray-300 text-decoration-none small text-uppercase fw-bold hover-text-white">Home</Link>
                <Link to="/products" className="text-gray-300 text-decoration-none small text-uppercase fw-bold hover-text-white">Products</Link>
              </div>
            </div>

            {/* 2. CENTER: Search Bar (Desktop) */}
            <div
              className="d-none d-md-flex align-items-center"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 20px',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.05)',
                width: '350px'
              }}
            >
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search drops..."
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  outline: 'none',
                  marginLeft: '10px',
                  width: '100%'
                }}
              />
            </div>

            {/* 3. RIGHT: Icons & User Actions */}
            <div className="d-flex align-items-center gap-4">
              
              {/* Wishlist */}
              <Link to="/wishlist" className="text-white hover-opacity" title="Wishlist">
                <Heart size={22} />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="text-white hover-opacity position-relative" title="Cart">
                <ShoppingBag size={22} />
                {/* Optional Badge */}
                {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-pink-500" style={{fontSize: '0.6rem'}}>2</span> */}
              </Link>

              <div className="vr bg-white opacity-25 mx-2" style={{height: '25px'}}></div>

              {/* AUTH SECTION */}
              {isLoggedIn ? (
                // ✅ LOGGED IN VIEW
                <div className="d-flex align-items-center gap-3">
                  {/* Profile Link */}
                  <Link to="/profile" className="d-flex align-items-center gap-2 text-decoration-none text-white hover-opacity">
                    <UserRound size={22} />
                    {/* Show Name only on Desktop */}
                    <span className="d-none d-lg-block small fw-bold text-uppercase">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                  </Link>

                  {/* Logout Button */}
                  <button 
                    onClick={handleLogout}
                    className="btn btn-link text-white p-0 hover-text-pink"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                // ❌ LOGGED OUT VIEW
                <Link 
                  to="/login" 
                  className="btn btn-sm btn-light rounded-pill fw-bold px-4"
                  style={{ fontSize: '14px' }}
                >
                  Login
                </Link>
              )}

            </div>

          </nav>
        </div>
      </div>
      
      {/* Main Content Area */}
      <main style={{ paddingTop: '85px', minHeight: '100vh', background: '#0a0a0a' }}>
        {children}
      </main>

      <ChatbotWidget />
    </div>
  );
}

export default Layout;