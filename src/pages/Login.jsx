
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

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
    <div className="login-container">
    <img 
  src={require('../assets/logo.png')} 
  alt="MGIT" 
  style={{ 
    width: '160px', 
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }} 
/>

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
      <p>Don't have an account? <a href="/register">Register here</a></p>

    </form>
  </div>
  );
}

export default Login;
