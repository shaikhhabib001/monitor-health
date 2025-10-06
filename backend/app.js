require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const healthDataRoutes = require('./src/routes/healthDataRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/health-data', healthDataRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => console.error('MongoDB connection error:', err));

module.exports = app;