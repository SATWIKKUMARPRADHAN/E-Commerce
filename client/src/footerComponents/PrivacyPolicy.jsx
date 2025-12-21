import React from 'react';
import { ShieldCheck, EyeOff, Cookie } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-lime-400 selection:text-black">
      
      {/* Header */}
      <div className="py-20 text-center border-b border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-lime-400/5 blur-3xl rounded-full pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
          Privacy <span className="text-lime-400">Protocol</span>
        </h1>
        <p className="text-xl font-bold uppercase tracking-widest text-gray-500">
          We protect your data like it's our own.
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-4xl mx-auto py-16 px-6 space-y-12">
        
        {/* Section 1 */}
        <div className="flex gap-6 items-start">
          <div className="bg-neutral-900 p-4 rounded-xl text-lime-400 shrink-0">
            <EyeOff size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white uppercase mb-3">No Snitching</h2>
            <p className="text-lg leading-relaxed">
              We collect your name, email, and address strictly to get your drip to your door. We 
              <span className="text-lime-400 font-bold mx-1">NEVER</span> 
              sell your personal info to third-party advertisers. That's sketchy, and we don't do sketchy.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex gap-6 items-start">
          <div className="bg-neutral-900 p-4 rounded-xl text-lime-400 shrink-0">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white uppercase mb-3">Fort Knox Security</h2>
            <p className="text-lg leading-relaxed">
              Your payment details? We don't even see them. All transactions are encrypted and processed by secure gateways (like Razorpay/Stripe). Even if we wanted to peek, we couldn't.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex gap-6 items-start">
          <div className="bg-neutral-900 p-4 rounded-xl text-lime-400 shrink-0">
            <Cookie size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white uppercase mb-3">Cookies (The Digital Kind)</h2>
            <p className="text-lg leading-relaxed">
              We use cookies to remember what's in your cart and keep you logged in. No creepy tracking across the internet. Just functional stuff to make your shopping smoother.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}