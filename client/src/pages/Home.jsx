import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api';
import HeroImg from '../assets/hero-img.jpg';
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

    const featuredProducts = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

    if (loading) return <div className="loading-screen">LOADING ASSETS...</div>;

    return (
        <div className="home-container">
            
            {/* 1. SCROLLING MARQUEE (Hype Bar) */}
            <div className="marquee-container">
                <div className="marquee-content">
                    <span>NEW DROP AVAILABLE NOW ✦ FREE SHIPPING ON ORDERS $50+ ✦ WINTER COLLECTION LIVE ✦ STREETWEAR ESSENTIALS ✦ </span>
                    <span>NEW DROP AVAILABLE NOW ✦ FREE SHIPPING ON ORDERS $50+ ✦ WINTER COLLECTION LIVE ✦ STREETWEAR ESSENTIALS ✦ </span>
                </div>
            </div>

            {/* 2. HERO SECTION (Video/Image vibe) */}
            <section className="hero-section">
                {/* Background Overlay Image */}
                <div className="hero-bg-overlay"></div>
                
                <div className="hero-content">
                    <span className="hero-tag">EST. 2024 // GEN-Z EDITION</span>
                    <h1 className="hero-title glitch-text text-red-900" data-text="REDEFINE">
                        REDEFINE <br />
                        <span className="text-stroke">YOUR REALITY</span>
                    </h1>
                    <p className="hero-subtitle">
                        Curated streetwear for the bold. Don't just wear it, own the streets.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/products" className="btn btn-neon">SHOP THE DROP</Link>
                        <Link to="/products?category=wearables" className="btn btn-outline-neon">VIEW LOOKBOOK</Link>
                    </div>
                </div>

                <div className="hero-visual">
                    {/* Using a high-quality Unsplash Streetwear Image */}
                    <img 
                        src='https://img.freepik.com/premium-photo/high-fashion-forward-model-collages-fashion-backgrounds-trendsetting-boutique-styles-unveiled_1020495-196270.jpg' 
                        alt="Streetwear Model" 
                        className="hero-img-main"
                    />
                    <div className="floating-card">
                        <span>🔥 Trending</span>
                        <p>Urban Hoodie V2</p>
                    </div>
                </div>
            </section>

            {/* 3. CATEGORIES (Bento Box Style) */}
            <section className="categories-section">
                <h2 className="section-title text-gray-700">CHOOSE YOUR <span className="highlight">VIBE</span></h2>
                
                <div className="bento-grid">
                    {/* Large Card */}
                    <Link to="/products?category=men" className="bento-item item-large" style={{backgroundImage: "url('https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800')"}}>
                        <div className="bento-overlay">
                            <h3>MEN'S FITS</h3>
                            <p>Oversized & Bold</p>
                        </div>
                    </Link>

                    {/* Medium Cards */}
                    <Link to="/products?category=women" className="bento-item" style={{backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600')"}}>
                         <div className="bento-overlay"><h3>WOMEN</h3></div>
                    </Link>
                    
                    <Link to="/products?category=wearables" className="bento-item" style={{backgroundImage: "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600')"}}>
                        <div className="bento-overlay"><h3>TECH</h3></div>
                    </Link>

                    <Link to="/products?category=footwear" className="bento-item item-wide " style={{backgroundImage: "url(https://static.vecteezy.com/system/resources/previews/022/255/712/non_2x/beautiful-shoes-generative-ai-free-photo.jpg)", backgroundSize: 'cover'}}>
                        <div className="bento-overlay">
                            <h3>KICKS LAB</h3>
                            <p>Exclusive Sneakers</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* 4. FEATURED PRODUCTS */}
            <section className="featured-section">
                <div className="section-header">
                    <h2 className="section-title" style={{color: '#EDE8D0'}}>JUST <span className="highlight-blue">DROPPED</span></h2>
                    <Link to="/products" className="btn-view-all">VIEW ALL ➔</Link>
                </div>
                <div className="products-grid">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* 5. VIBRANT FOOTER BANNER */}
            <section className="vibe-banner">
                <div className="vibe-text">
                    <h2>LEVEL UP</h2>
                    <h2>YOUR GAME</h2>
                </div>
                <img src="https://images.stockcake.com/public/a/4/0/a403f6ae-94a6-44fe-bc0a-32c21d1ebe4e_large/urban-fashion-pose-stockcake.jpg" alt="Vibe" />
            </section>
        </div>
    );
};

export default Home;