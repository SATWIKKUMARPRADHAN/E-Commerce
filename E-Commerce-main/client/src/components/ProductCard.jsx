import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const exists = wishlist.find(item => item.id === product.id);
        if (exists) {
            setIsWishlisted(true);
        }
    }, [product.id]);

    const toggleWishlist = (e) => {
        e.preventDefault(); // Prevent navigating to product detail if clicked on heart
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        if (isWishlisted) {
            const newWishlist = wishlist.filter(item => item.id !== product.id);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            setIsWishlisted(false);
        } else {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            setIsWishlisted(true);
        }

        // Dispatch a custom event to notify other components (like the Wishlist page if it's separate, or a counter)
        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`} className="product-card-link">
                <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <button
                        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                        onClick={toggleWishlist}
                        aria-label="Add to wishlist"
                    >
                        {isWishlisted ? '❤️' : '🤍'}
                    </button>
                </div>
                <div className="product-info">
                    <div className="product-category">{product.brand}</div>
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-footer">
                        <div className="price-container">
                            <span className="product-price">Rs. {product.price}</span>
                            {product.discount > 0 && (
                                <>
                                    <span className="original-price">Rs. {product.originalPrice}</span>
                                    <span className="discount-text">({product.discount}% OFF)</span>
                                </>
                            )}
                        </div>
                        <div className="product-rating">
                            <span className="star">⭐</span>
                            <span className="rating-val">{product.rating}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
