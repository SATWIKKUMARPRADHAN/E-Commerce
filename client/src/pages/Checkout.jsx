import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, placeOrder } from '../api';
import { CreditCard, Truck, ShoppingBag, CheckCircle, ChevronLeft, ArrowRight } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : null;

    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'Cash on Delivery'
    });

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }

        const fetchCart = async () => {
            try {
                const data = await getCart(userId);
                if (data.cartItems && data.cartItems.length > 0) {
                    setCartItems(data.cartItems);
                } else {
                    alert("Your cart is empty!");
                    navigate('/cart');
                }
            } catch (err) {
                console.error("Error fetching cart", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [userId, navigate]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const shipping = subtotal > 1000 ? 0 : 40;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const orderData = {
                userId,
                products: cartItems.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    quantity: item.qty,
                    price: item.price,
                    image: item.image
                })),
                totalAmount: total,
                paymentMethod: formData.paymentMethod,
                shippingAddress: {
                    fullName: formData.fullName,
                    address: formData.address,
                    city: formData.city,
                    zipCode: formData.zipCode
                }
            };

            const response = await placeOrder(orderData);
            if (response.order) {
                setOrderSuccess(true);
                // Clear cart locally if needed, though backend handles it
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (err) {
            console.error("Checkout error", err);
            alert("Failed to place order. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="checkout-loading">Preparing your checkout...</div>;

    if (orderSuccess) {
        return (
            <div className="checkout-success-container">
                <div className="success-card">
                    <CheckCircle size={80} color="#ccff00" />
                    <h1 className="text-gradient-neon">Order Placed!</h1>
                    <p>Thank you for your purchase, {formData.fullName}.</p>
                    <p>Redirecting to home page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page pt-24 pb-12 px-4 md:px-10">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/cart')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ChevronLeft size={20} /> Back to Bag
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left side: Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="checkout-section">
                            <h2 className="flex items-center gap-3 text-2xl font-display uppercase tracking-tight mb-6">
                                <Truck className="text-[#ccff00]" /> Shipping Details
                            </h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Street address, apartment, suite"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="zipCode">Zip Code</label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            placeholder="123456"
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </section>

                        <section className="checkout-section">
                            <h2 className="flex items-center gap-3 text-2xl font-display uppercase tracking-tight mb-6">
                                <CreditCard className="text-[#ccff00]" /> Payment Method
                            </h2>
                            <div className="payment-options">
                                <label className={`payment-option ${formData.paymentMethod === 'Cash on Delivery' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Cash on Delivery"
                                        checked={formData.paymentMethod === 'Cash on Delivery'}
                                        onChange={handleInputChange}
                                    />
                                    <span>Cash on Delivery</span>
                                </label>
                                <label className={`payment-option ${formData.paymentMethod === 'Credit Card' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Credit Card"
                                        checked={formData.paymentMethod === 'Credit Card'}
                                        onChange={handleInputChange}
                                    />
                                    <span>Credit / Debit Card (Simulated)</span>
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Right side: Order Summary */}
                    <div className="lg:col-span-1">
                        <aside className="order-summary-card">
                            <h2 className="flex items-center gap-3 text-xl font-display uppercase border-b border-gray-800 pb-4 mb-6">
                                <ShoppingBag size={20} className="text-[#ccff00]" /> Order Summary
                            </h2>

                            <div className="cart-preview space-y-4 mb-8">
                                {cartItems.map(item => (
                                    <div key={item.productId} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-900 rounded-md overflow-hidden border border-gray-800">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                                            <p className="text-xs text-gray-400">Qty: {item.qty} • Size: M</p>
                                            <p className="text-sm font-bold">₹{item.price * item.qty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cost-breakdown space-y-3 pt-6 border-t border-gray-800 text-gray-400">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-white">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (GST 18%)</span>
                                    <span className="text-white">₹{tax.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-gray-800">
                                    <span>Total</span>
                                    <span className="text-[#ccff00]">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={submitting || !formData.address || !formData.city || !formData.zipCode}
                                className="w-full mt-8 py-4 bg-[#ccff00] text-black font-bold uppercase tracking-wider hover:bg-[#b3e600] disabled:bg-gray-700 disabled:text-gray-500 transition-all flex justify-center items-center gap-2"
                            >
                                {submitting ? 'Processing...' : 'Complete Order'} <ArrowRight size={20} />
                            </button>

                            <p className="text-[10px] text-center text-gray-500 mt-4 uppercase tracking-widest">
                                Secure Encrypted Transaction
                            </p>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
