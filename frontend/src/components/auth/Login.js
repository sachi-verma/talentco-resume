// src/components/Auth/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authentication';

const LoginAuth = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
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
      const { token } = await login(formData.username, formData.password);
      // Redirect to the appropriate dashboard based on user role
      navigate("/filter"); // You can dynamically choose the dashboard route
    } catch (error) {
      console.log('Error logging in', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  const navigateToView = () => {
    navigate("/filter");
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
      <h2>Login</h2>
      {/* <div className='d-flex justify-content-end'>
      <button type="signup" className='btn btn-info' onClick={navigateToView}>Submit your Resume</button>
      </div> */}
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
        {/* <button type="signup" className='btn btn-secondary' onClick={navigateToClient}>Client Dashboard</button> */}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
};

export default LoginAuth;
