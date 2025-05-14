import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (res.data.role === 'student') navigate('/student');
      else if (res.data.role === 'clubHead') navigate('/club-head');
      else if (res.data.role === 'admin') navigate('/admin');
      else alert('Unknown role');
    } catch (err) {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: 'block', margin: '10px auto' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: 'block', margin: '10px auto' }}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
