
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from './StatCard.jsx';
import LineChart from './LineChart.jsx';
import { FaHeartbeat, FaBed, FaWalking } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api/health-data';
const WS_URL = 'ws://localhost:5000';

const Dashboard = () => {
  const [latestData, setLatestData] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  const formatChartData = (data, dataKey, label, color) => {
    const labels = data.map(d => new Date(d.timestamp).toLocaleTimeString());
    const values = data.map(d => d[dataKey]);

    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          borderColor: color,
          backgroundColor: `${color}80`, // 50% opacity
          tension: 0.3,
        },
      ],
    };
  };

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
      console.log('WebSocket message received:', newData);
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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-cool-teal">Live Health Metrics</h1>
      
      {/* Live Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Heart Rate"
          value={latestData ? latestData.heartRate : '...'}
          unit="bpm"
          icon={<FaHeartbeat className="text-fresh-lime text-3xl" />}
        />
        <StatCard
          title="Sleep"
          value={latestData ? latestData.sleepHours : '...'}
          unit="hours"
          icon={<FaBed className="text-fresh-lime text-3xl" />}
        />
        <StatCard
          title="Steps Today"
          value={latestData ? latestData.steps : '...'}
          unit=""
          icon={<FaWalking className="text-fresh-lime text-3xl" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {historyData.length > 0 && (
          <>
            <LineChart
              chartData={formatChartData(historyData, 'heartRate', 'Heart Rate (bpm)', '#A3E635')}
              title="Heart Rate Over Time"
            />
            <LineChart
              chartData={formatChartData(historyData, 'steps', 'Steps Count', '#2DD4BF')}
              title="Step Count Over Time"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
