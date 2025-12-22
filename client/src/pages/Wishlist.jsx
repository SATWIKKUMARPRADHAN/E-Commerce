import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const fetchWishlist = () => {
        const items = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistItems(items);
    };

    useEffect(() => {
        fetchWishlist();

        // Listen for updates from other tabs/components
        const handleStorageChange = () => fetchWishlist();

        // Custom event listener for updates within the same window
        window.addEventListener('wishlistUpdated', handleStorageChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('wishlistUpdated', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const clearWishlist = () => {
        localStorage.removeItem('wishlist');
        setWishlistItems([]);
        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    return (
        <div className="wishlist-container m-4">
            <div className="wishlist-header">
            <h1><span style={{color: 'var(--neon-green)', fontSize: '2rem'}}>//</span> YOUR STASH</h1>
            
            {wishlistItems.length > 0 && (
                <button className="btn btn-outline" onClick={clearWishlist}>
                    CLEAR ALL ✖
                </button>
            )}
        </div>

            {wishlistItems.length > 0 ? (
                <div className="products-grid">
                    {wishlistItems.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div 
    className="empty-wishlist flex flex-col items-center justify-center text-center min-h-[60vh] w-full"
    style={{ backgroundColor: '#0a0a0a' }} // Ensures dark background
>
        {/* Animated Broken Heart with Neon Glow */}
        <div 
            className="empty-icon text-9xl mb-6 animate-bounce" 
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 0, 85, 0.5))' }}
        >
            💔
        </div>

        {/* Edgy Uppercase Heading */}
        <h2 
            className="text-4xl font-black uppercase tracking-widest mb-4"
            style={{ color: '#ffffff', textShadow: '2px 2px 0px #333' }}
        >
            No Drip Detected
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-lg mb-8 max-w-md">
            Your stash is empty. Go find some fits before they sell out.
        </p>

        {/* Neon Cyberpunk Button */}
        <Link 
            to="/products" 
            className="px-10 py-4 font-bold uppercase tracking-wider transition-all duration-300"
            style={{ 
                border: '2px solid #ccff00', 
                color: '#ccff00', 
                textDecoration: 'none',
                background: 'transparent',
                boxShadow: '0 0 10px rgba(204, 255, 0, 0.2)'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.background = '#ccff00';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(204, 255, 0, 0.8)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ccff00';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(204, 255, 0, 0.2)';
            }}
            >
                Start Coping ➔
            </Link>
            </div>
                )}
        </div>
    );
};

export default Wishlist;
