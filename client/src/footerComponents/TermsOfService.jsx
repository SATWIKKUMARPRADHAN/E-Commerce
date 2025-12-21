import React from 'react';
import { AlertTriangle, Ban, CheckCircle2 } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-neutral-950 text-gray-400 font-sans">
      
      {/* Header */}
      <div className=" py-4 text-center" style={{backgroundColor: '#0cbfe9'}}>
        <p className="text-black font-black uppercase tracking-[0.2em] text-sm">
          // Read Before You Cop //
        </p>
      </div>

      <div className="max-w-5xl mx-auto py-16 px-6">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-12 uppercase italic">
          Terms <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">& Conditions</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1: The Basics */}
          <div className="bg-black border border-gray-800 p-8 rounded-3xl hover:border-yellow-400 transition-colors duration-300">
            <CheckCircle2 className="text-yellow-400 mb-6" size={40} />
            <h3 className="text-2xl font-bold text-white uppercase mb-4">1. The Agreement</h3>
            <p>
              By browsing HYPERRUSH, you agree to play by our rules. If you don't agree, close the tab. Simple as that. We reserve the right to update these terms whenever we drop new features.
            </p>
          </div>

          {/* Card 2: No Bots */}
          <div className="bg-black border border-gray-800 p-8 rounded-3xl hover:border-red-500 transition-colors duration-300">
            <Ban className="text-red-500 mb-6" size={40} />
            <h3 className="text-2xl font-bold text-white uppercase mb-4">2. Don't Be A Bot</h3>
            <p>
              Using scripts, bots, or automated software to snatch up limited drops is strictly prohibited. If we catch you botting, we cancel your order and ban your IP. Fair game only.
            </p>
          </div>

          {/* Card 3: Returns */}
          <div className="bg-black border border-gray-800 p-8 rounded-3xl hover:border-blue-500 transition-colors duration-300">
            <AlertTriangle className="text-blue-500 mb-6" size={40} />
            <h3 className="text-2xl font-bold text-white uppercase mb-4">3. Returns & Refunds</h3>
            <p>
              You have 7 days to initiate a return. The item must be unworn, unwashed, and have all original tags attached. If it smells like a party, we're sending it back to you.
            </p>
          </div>

          {/* Card 4: Content */}
          <div className="bg-black border border-gray-800 p-8 rounded-3xl hover:border-purple-500 transition-colors duration-300">
            <div className="text-purple-500 text-4xl font-black mb-6">©</div>
            <h3 className="text-2xl font-bold text-white uppercase mb-4">4. Intellectual Property</h3>
            <p>
              Our designs, logos, and photos belong to HYPERRUSH. Don't steal our drip for your own brand. We will find you, and our lawyers aren't as chill as our customer service.
            </p>
          </div>

        </div>

        <div className="mt-16 text-center border-t border-gray-800 pt-8">
          <p className="text-sm uppercase tracking-widest">Last Updated: December 2025</p>
        </div>
      </div>
    </div>
  );
}