const app = require('./app');
const { WebSocketServer } = require('ws');
const { createServer } = require('http');
const startSimulator = require('../src/services/simulator');

const server = createServer(app);
const wss = new WebSocketServer({ server });
startSimulator(wss);

module.exports = (req, res) => {
  server.emit('request', req, res);
};