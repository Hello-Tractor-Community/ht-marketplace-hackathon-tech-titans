import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.jpg"; 
import useAxios from "../../../Hooks/useAxios";
import { toast } from "react-toastify";

const LoginPage = ({back='/'}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { post,get } = useAxios()
  const navigate = useNavigate()

  
  const checkSession = async() => {
    try {
      const response = await get('/api/auth/check-session', { useAuth: true })
      localStorage.setItem('user_data', JSON.stringify(response.user))
    } catch(err) {
      console.error(err)
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await post('/api/auth/login', { email, password })
      toast.success(response.message)
      localStorage.setItem('access_token', response.token)
      await checkSession()
      if (response.user_data.userType === 'buyer') {
        navigate(back)
      } else if (response.user_data.userType === 'seller'){
        navigate('/seller/products')
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  };

  return ( 
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Hello Tractor Logo" className="h-16 w-auto" />
        </div>

        {/* Login Form */}
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825a10.05 10.05 0 01-3.75.825c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9a9 9 0 01-.825 3.75M15 15l4.35 4.35"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.98 8.4c.58-1.68 1.63-3.11 2.99-4.15C9.27 2.05 11.66 1.5 14.05 2c2.4.5 4.56 2.06 5.92 4.15a9.977 9.977 0 010 9.72c-.58 1.68-1.63 3.11-2.99 4.15-1.87 1.57-4.27 2.12-6.65 1.62a9.977 9.977 0 01-5.92-4.15 9.977 9.977 0 010-9.72zM15 12l4.35 4.35M9 9l4.35 4.35"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-sunsetBlaze hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
