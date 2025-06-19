const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const requireAuth = require('../middleware/requireAuth');
const Upload = require('../models/Upload');

// Use memory storage (no need to save to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Upload Excel file and parse it
router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // ✅ Save upload record in DB
    await Upload.create({
      filename: file.originalname,
      userId: req.user.id
    });

    res.json({ columns: Object.keys(data[0]), data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// ✅ Fetch user's upload history
router.get('/history', requireAuth, async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.user.id }).sort({ uploadedAt: -1 });
    res.json(uploads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
