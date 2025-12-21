import React from 'react';
import Hero from '../assets/Hero.png'
import aboutUs from '../assets/aboutUs.jpg'
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white">
      {/* Hero Section */}
      <div 
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('${Hero}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
            HYPER<br />RUSH
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-bold uppercase tracking-widest border-t-2 border-b-2 border-pink-500 py-2 inline-block">
            Not Just A Brand. It's A Movement.
          </p>
        </div>
      </div>

      {/* The Manifesto */}
      <div className="max-w-6xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-lime-400">
              We Don't Do <span className="text-white line-through decoration-pink-500">Basic</span>.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Born in the chaos of the digital age, HYPERRUSH is for the ones who move fast and break things. We curate the fits that make people stop scrolling.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              No seasons. No rules. Just pure adrenaline and aesthetic. If you're looking for boring corporate wear, you're at the wrong URL.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={aboutUs} 
              alt="Streetwear" 
              className="relative rounded-lg shadow-2xl grayscale group-hover:grayscale-0 transition duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}