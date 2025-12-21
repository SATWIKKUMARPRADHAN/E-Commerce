import React from "react";
import { Mail, Instagram, Twitter, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side: Info */}
        <div className="p-10 flex flex-col justify-between bg-gradient-to-br from-gray-900 to-black">
          <div>
            <h1
              className="text-5xl uppercase italic mb-2"
              style={{
                background: "linear-gradient(90deg, #74032b, #fff700)",
                WebkitBackgroundClip: "text", // Clips background to text
                WebkitTextFillColor: "transparent", // Makes text transparent so gradient shows
              }}
            >
              Hit Us Up
            </h1>
            <p className="text-gray-400">
              Got a question? Need a collab? Just bored?
            </p>
          </div>

          <div className="space-y-8 mt-12">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-4 bg-gray-800 rounded-full group-hover:bg-pink-500 transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  Email
                </p>
                <p className="font-bold text-xl">theplug@hyperrush.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-4 bg-gray-800 rounded-full group-hover:bg-purple-500 transition-colors">
                <Instagram size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  The Gram
                </p>
                <p className="font-bold text-xl">@hyperrush.official</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 bg-black">
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Who are you?
              </label>
              <input
                type="text"
                className="w-full bg-neutral-900 border-b-2 border-gray-700 p-4 text-white focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Where can we reach you?
              </label>
              <input
                type="email"
                className="w-full bg-neutral-900 border-b-2 border-gray-700 p-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Spill the tea
              </label>
              <textarea
                rows="4"
                className="w-full bg-neutral-900 border-b-2 border-gray-700 p-4 text-white focus:outline-none focus:border-lime-400 transition-colors"
                placeholder="Type your message..."
              ></textarea>
            </div>
            <button className="w-full bg-white text-black font-black uppercase py-4 hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-1">
              Send It 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
