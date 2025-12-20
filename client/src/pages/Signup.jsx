import React, { useState} from 'react'
import axios from 'axios';
 import Navbar from '../components/layout/Navbar';

export default function Signup() {
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
    const validateForm = ()=>{
        const {name, mobile, email, password, confirmPassword} = formData;

        if(name==="") return "name is empty";

        if(email ==="") return "email is empty";
        const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegix.test(email)) return "invalid email format";

        
        if(mobile.length!==10) return "number should be 10 digits only";

        if(password.length<6) return "password must be more than 6 length";

        if(confirmPassword !== password) return "password do not match";
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const validationError = validateForm();
        if(validationError){
            setError(validationError);
            return;
        }

        try{
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
                password:'',
                confirmPassword:''
            })
            setError('');
        }
        catch(err){
            console.error(err);
            setError(`signup failed, Server might be down`);
        }
       
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-white to-purple-200">
    <Navbar /> 
    <div className="bg-white shadow-2xl rounded-xl p-10 m-5 w-full max-w-md border border-gray-200">
    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 tracking-wide">
      Create Your Jenz Fashion Account
    </h2>

    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full"
    >
      <input
        type="text"
        name="name"
        placeholder="Enter Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400 text-gray-700"
      />

      <input
        type="text"
        name="mobile"
        placeholder="Enter Your Mobile"
        value={formData.mobile}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400 text-gray-700"
      />

      <input
        type="text"
        name="email"
        placeholder="Enter Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400 text-gray-700"
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Your Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400 text-gray-700"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400 text-gray-700"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold tracking-wide shadow-md hover:opacity-90 transition duration-300"
      >
        Sign Up
      </button>
    </form>

    <p className="text-center text-sm text-gray-500 mt-6">
      Already have an account?{" "}
      <a href="/login" className="text-pink-500 font-medium hover:underline">
        Login here
      </a>
    </p>
  </div>
</div>
  )
}
