import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('')
    

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(prev=>({...prev, [name]:value}));
    };

    const validateForm=()=>{
        const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegix.test(formData.email)) return "invalid email format";
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const validationError = validateForm();

        if(validationError){
            setError(validationError);
            return;
        }

        try{
            const res =  await axios.post('http://localhost:3030/login',{
            email: formData.email,
            password: formData.password
            })

            localStorage.setItem('user', JSON.stringify(res.data.user));
            alert('login successful!!!');
            navigate('/')
            
            setFormData({
                email: '',
                password:'',
            })
            setError('');
            
        }
        catch(err){
            console.log(err);
            setError('login failed. Please try again later');
        }
       

    }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-white to-purple-100">
      <Navbar />
  <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md border border-gray-200">
    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 tracking-wide">
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
        className="w-full px-4 py-3 my-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400 text-gray-700"
      /> 

      <input
        type="password"
        name="password"
        value={formData.password}
        placeholder="Enter your Password"
        onChange={handleChange}
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400 text-gray-700"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold tracking-wide shadow-md hover:opacity-90 transition duration-300"
      >
        Login
      </button>
    </form>

    <p className="text-center text-sm text-gray-500 mt-6">
      New to Jenz Fashion?{" "}
      <Link to={'/Signup'} className="text-pink-500 font-medium hover:underline">
        Create an account
      </Link>
    </p>
  </div>
</div>
  )
}
