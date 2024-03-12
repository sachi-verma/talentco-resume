// src/services/authService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3002'; // Replace with your backend URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { username, password});
    // const token = response.data.token;
    // const role = response.data.role;
    const { token } = response.data;
    if (!token) {
      throw new Error('Invalid response from the server');
    }
    localStorage.setItem('token', token); // Store the token in localStorage
    console.log('token: ', token);
    console.log('Login successful'); // Log success
    return { token };
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Login failed. Please try again.'); // Rethrow the error with a more descriptive message
  }
};

// export const register = async (userData) => {
//   try {
//     await axios.post(`${BASE_URL}/auth/register`, userData);
//   } catch (error) {
//     throw error;
//   }
// };

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token ? { token } : null;
};


export const logout = () => {
  localStorage.removeItem('token'); // Remove the token from localStorage on logout
};

// export const getToken = () => {
//   return localStorage.getItem('token'); // Retrieve the token from localStorage
// };

// export const getRole = () => {
//   return localStorage.getItem('role');
// };