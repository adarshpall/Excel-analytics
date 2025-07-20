import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://excel-analytics-2.onrender.com/api/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      onLogin(token); // Update App state
      navigate('/uploads'); // Redirect to uploads/dashboard
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-2 bg-gray-700 text-white"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 bg-gray-700 text-white"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
       <p className="text-gray-400 text-center mt-4 text-sm">
         Don't have an account{" "}
          <a href="/auth/signup" className="text-green-400 hover:underline">
            Sign up?
          </a>
        </p>
    </div>
  );
}

export default Login;
