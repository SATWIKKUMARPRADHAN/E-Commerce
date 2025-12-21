import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    // added useNavigate for redirection after signup
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: ""

    })

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    const validateForm = () => {
        const { name, mobile, email, password, confirmPassword } = formData;

        if (name === "") return "name is empty";

        if (email === "") return "email is empty";
        const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegix.test(email)) return "invalid email format";


        if (mobile.length !== 10) return "number should be 10 digits only";

        if (password.length < 6) return "password must be more than 6 length";

        if (confirmPassword !== password) return "password do not match";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const res = await axios.post('http://localhost:3030/signup', {
                name: formData.name,
                mobile: formData.mobile,
                email: formData.email,
                password: formData.password,
            })
            alert("registered successfully!!!")
            console.log(res.data);

            setFormData({
                name: '',
                mobile: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            setError('');
            
            // Redirect to login after successful signup
            navigate('/login'); 
        }
        catch (err) {
            console.error(err);
            setError(`signup failed, Server might be down`);
        }

    }
    return (
        // 1. Background: Pure Black
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            
            {/* 2. Card: Compact padding (p-8 instead of p-10), Dark Gray bg, Neon Shadow */}
            <div className="bg-neutral-900 shadow-2xl shadow-pink-500/10 rounded-2xl p-8 w-full max-w-md border border-neutral-800">
                
                {/* 3. Tagline: Edgy and Bold */}
                <h2 className="text-4xl font-black text-white text-center mb-1 tracking-tighter uppercase italic">
                    Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Hype</span>
                </h2>
                <p className="text-gray-500 text-center mb-6 text-xs uppercase tracking-[0.2em]">
                    Secure your exclusive access.
                </p>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-500/10 py-1 rounded border border-red-500/20">{error}</p>}

                {/* Form: Reduced gap to keep it short */}
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 w-full"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        // Inputs: Dark bg, slightly smaller vertical padding (py-2.5)
                        className="w-full px-4 py-2.5 bg-black border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                    />

                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-black border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                    />

                    <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-black border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-black border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-black border border-neutral-700 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                    />

                    <button
                        type="submit"
                        className="w-full mt-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-bold uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:opacity-90 hover:scale-[1.01] transition-all duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already part of the squad?{" "}
                    <Link to="/login" className="text-pink-500 font-bold hover:text-pink-400 hover:underline transition-colors">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    )
}