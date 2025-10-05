
const HealthData = require('../models/HealthData');

const getLatestHealthData = async (req, res) => {
  try {
    const latestData = await HealthData.findOne().sort({ timestamp: -1 });
    if (!latestData) {
      return res.status(404).json({ message: 'No health data found.' });
    }
    res.json(latestData);
  } catch (error) {
    console.error('Error fetching latest health data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getHealthDataHistory = async (req, res) => {
  try {
    
    const history = await HealthData.find().sort({ timestamp: -1 }).limit(50);
    if (!history || history.length === 0) {
      return res.status(404).json({ message: 'No historical data found.' });
    }
    
    res.json(history.reverse());
  } catch (error) {
    console.error('Error fetching health data history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getLatestHealthData,
  getHealthDataHistory,
};
