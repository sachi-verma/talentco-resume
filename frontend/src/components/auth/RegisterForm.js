// src/components/Auth/RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '', role: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await register(formData);
      // Redirect to the appropriate dashboard based on user role
      navigate.push('/client-dashboard'); // You can dynamically choose the dashboard route
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.' + error.message);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToResume = () => {
    navigate("/");
  };
  

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
      <h2>Register</h2>
      <div className='d-flex justify-content-end'>
      <button type="signup" className='btn btn-info' onClick={navigateToResume}>Submit your Resume</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label id='label2'>Username:</label>
          <input id='input2' type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className='mb-2'>
          <label id='label2'>Password:</label>
          <input id='input2' type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className='mb-2'>
          <label id='label2'>Email:</label>
          <input id='input2' type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className='mb-2'>
          <label id='label2'>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
          </select>
        </div >
        <button id='button2' className='btn btn-warning' type="submit">Register</button>
        <button className='btn btn-success' type="login" onClick={navigateToLogin}>Go to Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
};

export default RegisterForm;
