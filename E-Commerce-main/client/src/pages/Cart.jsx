import { useEffect, useRef, useState } from "react";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateCartQty } from "../api";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const alertShown = useRef(false);

  const user = JSON.parse(localStorage.getItem('user')); //from local storeage
  const userId = user ? user._id : null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = subtotal > 1000 || cartItems.length === 0 ? 0 : 40;
  const tax = (subtotal * 0.18).toFixed(0);
  const total = subtotal + shipping + parseFloat(tax);

  useEffect(() => {
    if (!userId && !alertShown.current) {
      alertShown.current = true;
      console.log("user not logged in");
      alert("User not logged in");
      navigate('/login');
    }

  }, [userId, navigate]);


  // Fetch Cart
  const fetchCartData = async () => {
    if (!userId) return;
    try {
      const data = await getCart(userId);
      if (data.cartItems) setCartItems(data.cartItems);
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [userId]);

  // Update Quantity
  const updateQuantity = async (productId, newQty) => {
    try {
      await updateCartQty({ userId, productId, qty: newQty });
      fetchCartData(); // Refresh UI
    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };

  // Remove Item
  const removeItem = async (productId) => {
    try {
      await removeFromCart(userId, productId);
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  // Handle Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your bag is empty!");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-4 md:px-10 font-body">

      <h1 className="text-4xl font-display uppercase tracking-tighter mb-8 text-gradient-neon">
        Your Bag <span className="text-[#ccff00]">({cartItems.length})</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Left: Cart Items */}
        <div className="flex-1 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-gray-500">Your bag is empty. Go add some drip.</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.productId} className="flex gap-4 p-4 border border-gray-800 rounded-lg bg-[#111] hover:border-[#ccff00] transition-colors">
                {/* Image */}
                <div className="w-24 h-24 bg-gray-800 rounded-md overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">Size: M</p>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.productId, item.qty - 1)}
                        className="p-1 rounded bg-gray-800 hover:bg-white hover:text-black transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-mono">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.qty + 1)}
                        className="p-1 rounded bg-gray-800 hover:bg-white hover:text-black transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <p className="text-xl font-bold">₹{item.price * item.qty}</p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-gray-500 hover:text-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-96 h-fit bg-[#111] p-6 border border-gray-800 rounded-lg sticky top-28">
          <h2 className="text-xl font-display uppercase mb-4 border-b border-gray-800 pb-2">Order Summary</h2>

          <div className="space-y-3 text-gray-400 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-white">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST 18%)</span>
              <span className="text-white">₹{(subtotal * 0.18).toFixed(0)}</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold mb-6 border-t border-gray-800 pt-4">
            <span>Total</span>
            <span className="text-[#ccff00]">₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-4 bg-[#ccff00] text-black font-bold uppercase tracking-wider hover:bg-[#b3e600] transition flex justify-center items-center gap-2"
          >
            Checkout <ArrowRight size={20} />
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Secure Checkout • Free Returns
          </p>
        </div>

      </div>
    </div>
  );
};

export default Cart;