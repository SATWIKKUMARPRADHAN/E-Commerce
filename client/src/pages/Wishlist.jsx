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
                <div className="empty-wishlist">
                    <div className="empty-icon">💔</div>
                    <h2>Your wishlist is empty</h2>
                    <p>Explore our products and find something you love!</p>
                    <Link to="/products" className="btn btn-primary mt-3">
                        Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
