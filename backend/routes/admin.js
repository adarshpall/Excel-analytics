const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');
const User = require('../models/User');
const Upload = require('../models/Upload');

// ✅ GET all users
router.get('/users', requireAuth, requireAdmin, async (req, res) => {
  const users = await User.find({}, 'email role createdAt');
  res.json(users);
});

// ✅ GET all uploads
router.get('/uploads', requireAuth, requireAdmin, async (req, res) => {
  const uploads = await Upload.find({})
    .populate('userId', 'email')
    .sort({ uploadedAt: -1 });
  res.json(uploads);
});
// Promote a user to admin
router.put('/make-admin/:userId', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    await User.updateOne({ _id: userId }, { $set: { role: 'admin' } });
    res.json({ message: 'User promoted to admin' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

module.exports = router;
