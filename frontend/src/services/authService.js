// src/services/authService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Replace with your backend URL

export const login = async (username, password, role) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { username, password, role });
    // const token = response.data.token;
    // const role = response.data.role;
    const { token, role } = response.data;
    if (!token || !role) {
      throw new Error('Invalid response from the server');
    }
    localStorage.setItem('token', token); // Store the token in localStorage
    console.log('token: ', token);
    localStorage.setItem('role', role);
    console.log('role', role);
    console.log('Login successful'); // Log success
    return { token, role };
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Login failed. Please try again.'); // Rethrow the error with a more descriptive message
  }
};

export const register = async (userData) => {
  try {
    await axios.post(`${BASE_URL}/auth/register`, userData);
  } catch (error) {
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return token && role ? { token, role } : null;
};


export const logout = () => {
  localStorage.removeItem('token'); // Remove the token from localStorage on logout
  localStorage.removeItem('role');
};

// export const getToken = () => {
//   return localStorage.getItem('token'); // Retrieve the token from localStorage
// };

// export const getRole = () => {
//   return localStorage.getItem('role');
// };