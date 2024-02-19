// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/client-dashboard', authMiddleware, (req, res) => {
  if (req.user.role === 'client') {
    res.json({ message: 'Welcome to the Client Dashboard', user: req.user });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
});

module.exports = router;
