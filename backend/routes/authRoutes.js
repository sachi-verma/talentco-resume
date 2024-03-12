// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../models/User');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'talentco_resume',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// router.post('/register', async (req, res) => {
//   try {
//     const { username, password, email, role } = req.body;
//     const hashedPassword = await hashPassword(password);

//     const [results] = await pool.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', [
//       username,
//       hashedPassword,
//       email,
//       role,
//     ]);

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [results] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    console.log('Results from the database:', results);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    console.log('User fetched from the database:', user);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // const roleMatch = await bcrypt.compare(role, user.role);

    // if (role != user.role){
    //   console.log('Role mismatch')
    // }

    // if (role && role !== user.role) {
    //     return res.status(403).json({ message: 'Invalid role' });
    //   }

     // Determine the user's role
     let role = 'client'; // Set a default role
     // Add logic to determine the role based on user data (e.g., user.role column in the database)
     if (user.role) {
       role = user.role;
     }

    const token = jwt.sign({ username: user.username, userId: user.id }, '9j3nei8s72r4yo23hw8d6ysj89d37g2f9g84wusge', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
