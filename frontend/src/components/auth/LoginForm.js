// src/components/Auth/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log('Handling login...');

    try {
      const { token, role } = await login(formData.username, formData.password);
      // Redirect to the appropriate dashboard based on user role
      // navigate("/admin-dashboard"); // You can dynamically choose the dashboard route
      console.log("role entered is", role)
      if(role === 'admin'){
        navigate("/admin-dashboard");
      } else if(role === 'client'){
        navigate("/client-dashboard");
      }
    } catch (error) {
      console.log('Error logging in', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToResume = () => {
    navigate("/");
  };

  const navigateToClient = () => {
    navigate("/client-dashboard");
  };


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
      <h2>Login</h2>
      <div className='d-flex justify-content-end'>
      <button type="signup" className='btn btn-info' onClick={navigateToResume}>Submit your Resume</button>
      </div>
      <form>
        <div className='mb-2'>
          <label id='label2'>Username:</label>
          <input id='input2' type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className='mb-2'>
          <label id='label2'>Password:</label>
          <input id='input2' type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {/* <div className='mb-2'>
          <label id='label2'>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
          </select>
        </div > */}
        <button id='button2' type="submit" className='btn btn-success' onClick={handleSubmit}>Login</button>
        <button id='button2' type="signup" className='btn btn-warning' onClick={navigateToRegister}>Register</button>
        <button type="signup" className='btn btn-secondary' onClick={navigateToClient}>Client Dashboard</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
};

export default LoginForm;
