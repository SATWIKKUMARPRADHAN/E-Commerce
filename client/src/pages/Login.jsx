import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('')


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegix.test(formData.email)) return "invalid email format";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3030/api/auth/login', {
        email: formData.email,
        password: formData.password
      })

      login(res.data.user); // Update auth context
      alert('login successful!!!');
      navigate('/')

      setFormData({
        email: '',
        password: '',
      })
      setError('');

    }
    catch (err) {
      console.log(err);
      setError('login failed, please check your credentials' );
    }
  }

  return (
    // 1. Background: Pure Black to match your theme
    <div className="min-h-screen flex items-center justify-center bg-black">
      
      {/* 2. Card: Dark Gray (Neutral-900) instead of White. 
             This blends better but still stands out. 
             Added a subtle white glow shadow. */}
      <div className="bg-neutral-900 shadow-2xl shadow-white/5 rounded-xl p-10 w-full max-w-md border border-neutral-800">
        
        {/* 3. Heading: White text */}
        <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          Jenz Fashion ✨
        </h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form action="" onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your Email"
            onChange={handleChange}
            // 4. Inputs: Black background with White text. 
            //    Border is dark gray, turns Pink on click.
            className="w-full px-4 py-3 my-4 bg-black border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your Password"
            onChange={handleChange}
            // Same dark styling for password
            className="w-full px-4 py-3 mb-4 bg-black border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />

          <button
            type="submit"
            // 5. Button: Gradient stays, but added a colored shadow for a "Neon" effect
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-bold tracking-wide shadow-lg shadow-pink-500/30 hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          New to Jenz Fashion?{" "}
          <Link to={'/Signup'} className="text-pink-500 font-medium hover:text-pink-400 hover:underline transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}