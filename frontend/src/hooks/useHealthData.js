
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://smarthealthmonitoringtool-cftt.vercel.app/api/health-data';
const WS_URL = 'wss://smarthealthmonitoringtool-cftt.vercel.app';

export const useHealthData = () => {
  const [latestData, setLatestData] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Fetch initial historical data
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/history`);
        setHistoryData(res.data);
        // Set the very latest data point from history on initial load
        if (res.data.length > 0) {
          setLatestData(res.data[res.data.length - 1]);
        }
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistory();

    // Set up WebSocket connection
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setLatestData(newData);
      // Add new data to our history for live chart updates
      setHistoryData(prevData => [...prevData, newData].slice(-30)); // Keep last 30 points
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return { latestData, historyData };
};
