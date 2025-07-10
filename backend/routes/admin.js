const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');
const User = require('../models/User');
const Upload = require('../models/Upload');

// 🔒 Apply global auth + admin check
router.use(requireAuth);
router.use(requireAdmin);

// ✅ GET all users
router.get('/users', async (req, res) => {
  const users = await User.find({}, 'email role createdAt');
  res.json(users);
});

// ✅ GET all uploads
router.get('/uploads', async (req, res) => {
  const uploads = await Upload.find({})
    .populate('userId', 'email')
    .sort({ uploadedAt: -1 });
  res.json(uploads);
});

// ✅ Promote user to admin
router.put('/make-admin/:userId', async (req, res) => {
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
