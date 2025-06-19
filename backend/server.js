
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const adminRoutes = require('./routes/admin');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');

app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
