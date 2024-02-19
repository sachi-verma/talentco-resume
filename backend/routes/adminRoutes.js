// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


router.get('/admin-dashboard', authMiddleware, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: 'Welcome to the Admin Dashboard', user: req.user });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
});

module.exports = router;
