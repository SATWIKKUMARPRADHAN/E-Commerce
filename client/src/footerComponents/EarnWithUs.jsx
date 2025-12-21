import React from 'react';
import { TrendingUp, Truck, DollarSign } from 'lucide-react';

export default function EarnWithUs() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      
      {/* Hero Banner */}
      <div className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            alt="Money Background"
         />
         <div className="relative z-10 text-center">
            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter">
              Secure The <span className="text-lime-400">Bag</span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-bold text-gray-300">
              Don't just spend money. Make money with HYPERRUSH.
            </p>
         </div>
      </div>

      {/* Options Grid */}
      <div className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-8 -mt-20 relative z-20">
        
        {/* Affiliate Card */}
        <div className="group bg-neutral-900 border border-gray-800 p-8 rounded-3xl hover:bg-neutral-800 transition-all hover:scale-105 duration-300">
          <div className="bg-lime-400/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-colors">
            <DollarSign size={32} />
          </div>
          <h3 className="text-3xl font-black uppercase mb-4">Affiliate Program</h3>
          <p className="text-gray-400 mb-8">
            Got followers? Post our fits, drop your link, and get <span className="text-white font-bold">10% commission</span> on every single sale. No cap.
          </p>
          <button className="w-full py-4 border border-lime-400 text-lime-400 font-bold uppercase hover:bg-lime-400 hover:text-black transition-all">
            Join Squad
          </button>
        </div>

        {/* Delivery Partner Card */}
        <div className="group bg-neutral-900 border border-gray-800 p-8 rounded-3xl hover:bg-neutral-800 transition-all hover:scale-105 duration-300">
          <div className="bg-pink-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-pink-500 group-hover:bg-pink-500 group-hover:text-black transition-colors">
            <Truck size={32} />
          </div>
          <h3 className="text-3xl font-black uppercase mb-4">Delivery Partner</h3>
          <p className="text-gray-400 mb-8">
            Got a bike? Help us move product. Flexible hours, instant payouts, and you control your schedule. Be your own boss.
          </p>
          <button className="w-full py-4 border border-pink-500 text-pink-500 font-bold uppercase hover:bg-pink-500 hover:text-black transition-all">
            Ride With Us
          </button>
        </div>

      </div>
    </div>
  );
}