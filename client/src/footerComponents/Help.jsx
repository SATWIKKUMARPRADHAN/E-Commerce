import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function Help() {
  // Simple state for accordion
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "Where's my stuff?", a: "Chill. Go to the 'Track Order' page, type your AWB, and see exactly where your drip is." },
    { q: "Can I return this if it doesn't fit?", a: "Yeah, you got 7 days. But don't pop the tags, or we can't take it back. Keep it fresh." },
    { q: "Do you ship worldwide?", a: "Not yet. We're taking over India first. Global domination coming soon." },
    { q: "Is this real or a scam?", a: "100% legit. We're a student startup, but the hustle is real. Check our socials for proof." }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black text-center mb-12 uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
          FAQ<span className="text-pink-500">.</span>
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-800 rounded-2xl overflow-hidden hover:border-pink-500 transition-colors duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 bg-neutral-900 text-left"
              >
                <span className="text-xl font-bold uppercase">{faq.q}</span>
                {openIndex === index ? <Minus className="text-pink-500" /> : <Plus className="text-gray-400" />}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 p-6 bg-neutral-950' : 'max-h-0'}`}>
                <p className="text-gray-400 font-mono text-lg border-l-4 border-lime-400 pl-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 uppercase tracking-widest mb-4">Still confused?</p>
          <a href="/contactus" className="inline-block border-2 border-white px-8 py-3 font-bold uppercase hover:bg-white hover:text-black transition-all">
            Talk to Human
          </a>
        </div>
      </div>
    </div>
  );
}