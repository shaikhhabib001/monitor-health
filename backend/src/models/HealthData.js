
const mongoose = require('mongoose');

const HealthDataSchema = new mongoose.Schema({
  heartRate: {
    type: Number,
    required: true,
  },
  sleepHours: {
    type: Number,
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HealthData', HealthDataSchema);
