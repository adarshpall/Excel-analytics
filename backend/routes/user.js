// routes/user.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth'); // ✅ JWT verify middleware
const User = require('../models/User');

// ✅ GET /api/user/me — Get current logged-in user
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error("Fetch user error:", err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ PUT /api/user/update — Update profile info
router.put('/update', requireAuth, async (req, res) => {
  try {
    const { name,  location } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name,  location },
      { new: true }
    ).select('-password');

    res.json(updated);
  } catch (err) {
    console.error("Update user error:", err.message);
    res.status(500).json({ error: 'Profile update failed' });
  }
});

module.exports = router;
