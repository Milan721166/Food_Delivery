const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If everything is correct, send a success response
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error("Error during admin login:", error.message); // Log error message
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;