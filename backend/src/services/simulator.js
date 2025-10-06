
const HealthData = require('../models/HealthData');
const WebSocket = require('ws'); 

let patientId = 'Patient_001';
let lastHeartRate = 75;
let lastSteps = 0;
let lastSleepHours = 0;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, decimals) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};

let cumulativeSteps = 0;
let lastReset = new Date().getDate();

const generateHealthData = () => {
  const today = new Date().getDate();
  if (today !== lastReset) {
    cumulativeSteps = 0;
    lastReset = today;
  }

  const heartRate = getRandomInt(60, 140);

  const sleepHours = getRandomFloat(4, 9, 1);

  cumulativeSteps += getRandomInt(10, 50);

  const timestamp = new Date();

  return { patientId, heartRate, steps: cumulativeSteps, sleepHours, timestamp };
};

/**
 * @param {WebSocket.Server} wss The WebSocket server instance.
 */
const startSimulator = (wss) => {
  setInterval(async () => {
    const data = generateHealthData();
    try {
      const newHealthData = new HealthData(data);
      await newHealthData.save();
      console.log('New health data saved:', newHealthData);

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newHealthData));
        }
      });

    } catch (error) {
      console.error('Error saving health data:', error);
    }
  }, 5000);
};

module.exports = startSimulator;
