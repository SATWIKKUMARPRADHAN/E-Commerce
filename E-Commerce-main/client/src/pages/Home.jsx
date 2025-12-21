import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Get top 4 sorted by rating as featured
    const featuredProducts = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

    if (loading) return <div className="text-center mt-5 text-white">Loading...</div>;

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title text-gradient-neon">Upgrade Your Style</h1>
                    <p className="hero-subtitle">Premium clothing and smart wearables for the modern you.</p>
                    <div className="hero-buttons">
                        <Link to="/products" className="btn btn-primary">Shop Now</Link>
                        <Link to="/products?category=wearables" className="btn btn-outline">Wearables</Link>
                    </div>
                </div>
                <div className="hero-image">
                    {/* Placeholder for hero image */}
                    <div className="hero-image-placeholder">🧥</div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="section-header">
                    <h2 className="text-gradient-cyan">Shop by Category</h2>
                    <Link to="/products" className="view-all-link">View All</Link>
                </div>
                <div className="categories-grid">
                    {[
                        { name: 'Men', icon: '👨' },
                        { name: 'Women', icon: '👩' },
                        { name: 'Ethnic Wear', icon: '🥻' },
                        { name: 'Footwear', icon: '👟' },
                        { name: 'Wearables', icon: '⌚' },
                        { name: 'Accessories', icon: '👜' }
                    ].map(cat => (
                        <Link to={`/products?category=${cat.name.toLowerCase()}`} key={cat.name} className="category-card">
                            <div className="category-circle">{cat.icon}</div>
                            <span className="category-name">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
                <div className="section-header">
                    <h2 className="text-gradient-neon">Featured Products</h2>
                    <Link to="/products" className="view-all-link">View All Products</Link>
                </div>
                <div className="products-grid">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Benefits Section (From original code) */}
            <section className="benefits-section">
                <div className="benefit-item">
                    <span className="benefit-icon">🚀</span>
                    <h3>Fast Delivery</h3>
                    <p>Get your order in 24 hours</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">🛡️</span>
                    <h3>Secure Payment</h3>
                    <p>100% secure payment</p>
                </div>
                <div className="benefit-item">
                    <span className="benefit-icon">💬</span>
                    <h3>24/7 Support</h3>
                    <p>We're here to help</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
