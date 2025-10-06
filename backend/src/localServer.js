require('dotenv').config();
const http = require('http');
const app = require('../api/app');
const { WebSocketServer } = require('ws');
const startSimulator = require('./services/simulator');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('WebSocket client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(PORT, () => {
  console.log(`✅ Local server running on http://localhost:${PORT}`);
  startSimulator(wss);
});