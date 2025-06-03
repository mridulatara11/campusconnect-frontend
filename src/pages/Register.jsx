
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', formData);
      alert('Registered successfully!');
      navigate('/');
    } catch (err) {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="register-container">
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
<img
        src={require('../assets/mgit.png')}
        alt="MGIT"
        style={{
          width: '180px',
          marginBottom: '30px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />

   <form onSubmit={handleRegister} className="register-form">
  <h2>Register</h2>
  <input name="name" placeholder="Name" onChange={handleChange} required />
  <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
  <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
  <select name="role" onChange={handleChange}>
    <option value="student">Student</option>
    <option value="clubHead">Club Head</option>
    <option value="admin">Admin</option>
  </select>
  <button type="submit">Register</button>
  <p>Already registered? <a href="/">Login here</a></p>
</form>

  </div>
  );
}

export default Register;
