import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addToCart } from '../api';
import { useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const foundProduct = await getProductById(id);
                setProduct(foundProduct);

                if (foundProduct) {
                    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                    const exists = wishlist.find(item => item.id === foundProduct.id);
                    setIsWishlisted(!!exists);
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const toggleWishlist = () => {
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

        // Dispatch custom event
        window.dispatchEvent(new Event('wishlistUpdated'));
    };

    const handleAddToCart = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please login to add items to cart');
            navigate('/login');
            return;
        }

        setAddingToCart(true);
        try {
            await addToCart({
                userId: user._id,
                productId: product._id, // Use MongoDB _id
                name: product.name,
                image: product.image,
                price: product.price,
                qty: 1
            });
            alert('Added to cart!');
        } catch (error) {
            console.error("Failed to add to cart", error);
            alert('Failed to add to cart. Please try again.');
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!product) return <div className="error">Product not found. <Link to="/products">Back to Products</Link></div>;

    return (
        <div className="product-detail-container">
            <div className="product-detail-grid">
                <div className="product-gallery">
                    <img src={product.image} alt={product.name} className="main-image" />
                </div>

                <div className="product-info-section">
                    <div className="product-header">
                        <span className="detail-category">{product.category}</span>
                        <h1 className="detail-title text-gradient-neon">{product.name}</h1>
                        <div className="detail-rating">
                            <span className="stars">⭐⭐⭐⭐⭐</span>
                            <span className="review-count">({product.reviews} reviews)</span>
                        </div>
                    </div>

                    <div className="detail-price-section">
                        <span className="detail-price text-gradient-cyan">Rs. {product.price}</span>
                        {product.discount > 0 && (
                            <>
                                <span className="detail-original-price">Rs. {product.originalPrice}</span>
                                <span className="detail-discount">({product.discount}% OFF)</span>
                            </>
                        )}
                        <span className="stock-status in-stock">In Stock</span>
                    </div>

                    <p className="detail-description">
                        {product.description}
                    </p>

                    <div className="detail-actions">
                        <button
                            className="btn btn-primary add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={addingToCart}
                        >
                            {addingToCart ? 'Adding...' : 'Add to Cart'}
                        </button>
                        <button
                            className={`btn btn-outline wishlist-action-btn ${isWishlisted ? 'active' : ''}`}
                            onClick={toggleWishlist}
                        >
                            {isWishlisted ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                        </button>
                    </div>

                    <div className="product-meta">
                        <div className="meta-item">
                            <span className="meta-label">SKU:</span>
                            <span className="meta-value">WK-{product.id.toString().padStart(4, '0')}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Category:</span>
                            <span className="meta-value">{product.category}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Shipping:</span>
                            <span className="meta-value">Free Shipping</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
