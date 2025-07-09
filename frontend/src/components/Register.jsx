import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      alert('Registered successfully! Now login.');
    } catch (err) {
      alert(err.response.data.error || 'Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="email" placeholder="Email" className="w-full mb-2 p-2 border" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="w-full mb-2 p-2 border" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
