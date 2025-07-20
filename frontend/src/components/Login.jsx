import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://excel-analytics-2.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      onLogin(); // Callback to update UI
    } catch (err) {
      alert(err.response.data.error || 'Login failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="w-full mb-2 p-2 border" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="w-full mb-2 p-2 border" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
