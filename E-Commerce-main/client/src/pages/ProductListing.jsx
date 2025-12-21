import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api';
import './ProductListing.css';

const ProductListing = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]); // Store all products
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortBy, setSortBy] = useState('featured');
    const [loading, setLoading] = useState(true);

    // Get category and search from URL
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
                setFilteredProducts(data); // Initial set
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length === 0) return;

        let result = [...products];

        // Filter by category
        if (categoryParam) {
            result = result.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase());
        }

        // Filter by Search Query
        if (searchParam) {
            const query = searchParam.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Sort
        if (sortBy === 'price-low-high') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high-low') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }
        // 'featured' is default order (id)

        setFilteredProducts(result);
    }, [categoryParam, searchParam, sortBy, products]);

    const handleCategoryChange = (category) => {
        if (category) {
            setSearchParams({ category: category.toLowerCase() });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div className="product-listing-container">
            <div className="listing-header">
                <h1 className="text-gradient-neon">{categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` : 'All Products'}</h1>
                <p>{filteredProducts.length} items found</p>
            </div>

            <div className="listing-content">
                {/* Sidebar Filters */}
                <aside className="filters-sidebar">
                    <div className="filter-group">
                        <h3>Categories</h3>
                        <ul>
                            <li className={!categoryParam ? 'active' : ''} onClick={() => handleCategoryChange(null)}>All Categories</li>
                            {['Men', 'Women', 'Ethnic Wear', 'Footwear', 'Wearables', 'Accessories'].map(cat => (
                                <li
                                    key={cat}
                                    className={categoryParam === cat.toLowerCase() ? 'active' : ''}
                                    onClick={() => handleCategoryChange(cat)}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <div className="main-listing">
                    {/* Toolbar */}
                    <div className="listing-toolbar">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>

                    {/* Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="products-grid">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <h3>No products found</h3>
                            <p>Try clearing your filters to see more results.</p>
                            <button
                                className="btn btn-outline"
                                onClick={() => setSearchParams({})}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
