
const express = require('express');
const router = express.Router();
const {
  getLatestHealthData,
  getHealthDataHistory,
} = require('../controllers/healthDataController');

router.get('/latest', getLatestHealthData);
router.get('/history', getHealthDataHistory);

module.exports = router;
