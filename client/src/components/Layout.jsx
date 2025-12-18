// Shared Layout Component with Navigation
// This will be used across all pages for consistent navigation
import { Link, useLocation } from 'react-router-dom';
import ChatbotWidget from './ChatbotWidget.jsx';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();
  
  // Check if user is logged in (placeholder - will be replaced with actual auth)
  const isLoggedIn = true; // TODO: Replace with actual authentication check
  const isAdmin = true; // TODO: Replace with actual admin check - Set to true for testing admin access

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            🛍️ E-Commerce
          </Link>
          
          <div className="nav-links">
            {/* Public Links */}
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
              Products
            </Link>
            
            {/* User Account Links */}
            {isLoggedIn ? (
              <>
                <Link to="/wishlist" className={`nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`}>
                  Wishlist
                </Link>
                <Link to="/cart" className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}>
                  Cart
                </Link>
                <Link to="/orders" className={`nav-link ${location.pathname === '/orders' ? 'active' : ''}`}>
                  Orders
                </Link>
                <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                  Profile
                </Link>
                {isAdmin && (
                  <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                    Admin
                  </Link>
                )}
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>
                  Login
                </Link>
                <Link to="/signup" className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      {/* Floating Chatbot Widget - appears on all pages */}
      <ChatbotWidget />
    </div>
  );
}

export default Layout;

