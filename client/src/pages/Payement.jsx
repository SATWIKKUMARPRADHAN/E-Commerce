import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Simple formatting logic
    if (name === 'number') {
       // Format as 0000 0000 0000 0000
       const formatted = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
       setCardData(prev => ({ ...prev, [name]: formatted }));
    } else {
       setCardData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // SIMULATE PAYMENT DELAY
    setTimeout(() => {
      setLoading(false);
      alert("Payment Successful! Order Placed.");
      // Redirect to an Order Success page or Home
      navigate('/'); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="bg-neutral-900 w-full max-w-lg rounded-2xl p-8 border border-neutral-800 shadow-2xl relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">
              Checkout<span className="text-pink-500">.</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
              Secure Encrypted Payment
            </p>
          </div>
          <ShieldCheck className="text-lime-400" size={32} />
        </div>

        {/* Total Amount (Hardcoded or passed via props) */}
        <div className="bg-black/50 p-4 rounded-lg mb-6 flex justify-between items-center border border-neutral-800">
          <span className="text-gray-400">Total to pay</span>
          <span className="text-2xl font-bold text-white">₹ 4,999.00</span>
        </div>

        {/* Form */}
        <form onSubmit={handlePayment} className="space-y-5">
          
          {/* Card Number */}
          <div>
            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Card Number</label>
            <div className="relative">
              <input 
                type="text" 
                name="number"
                value={cardData.number}
                onChange={handleChange}
                placeholder="0000 0000 0000 0000"
                className="w-full bg-black border border-neutral-700 rounded-lg py-3 px-4 pl-12 text-white focus:outline-none focus:border-pink-500 transition-colors tracking-widest font-mono"
                required
              />
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>

          {/* Card Holder */}
          <div>
             <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Card Holder Name</label>
             <input 
                type="text" 
                name="name"
                value={cardData.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                className="w-full bg-black border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-pink-500 transition-colors uppercase"
                required
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry */}
            <div>
              <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Expiry Date</label>
              <input 
                type="text" 
                name="expiry"
                placeholder="MM/YY"
                className="w-full bg-black border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-pink-500 transition-colors text-center"
                required
              />
            </div>
            {/* CVV */}
            <div>
              <label className="block text-xs uppercase font-bold text-gray-500 mb-2">CVV</label>
              <div className="relative">
                <input 
                  type="password" 
                  name="cvv"
                  placeholder="123"
                  className="w-full bg-black border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-pink-500 transition-colors text-center tracking-widest"
                  maxLength="3"
                  required
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold uppercase py-4 rounded-lg shadow-lg shadow-pink-500/20 hover:scale-[1.01] transition-transform disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>

        <div className="mt-6 text-center">
            <p className="text-xs text-gray-600 flex justify-center items-center gap-2">
                <Lock size={12} /> Encrypted by 256-bit SSL
            </p>
        </div>
      </div>
    </div>
  );
}