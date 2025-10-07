import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Resolve API and WS URLs with Vite env overrides and sensible local defaults.
const getUrls = () => {
  const viteApi = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL;
  const viteWs = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WS_URL;

  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const API_URL = viteApi || (isLocal ? 'http://localhost:5000/api/health-data' : 'https://smarthealthmonitoringtool-cftt.vercel.app/api/health-data');
  const WS_URL = viteWs || (isLocal ? 'ws://localhost:5000' : 'wss://smarthealthmonitoringtool-cftt.vercel.app');

  return { API_URL, WS_URL };
};

export const useHealthData = () => {
  const [latestData, setLatestData] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    const { API_URL, WS_URL } = getUrls();

    // Fetch initial historical data
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/history`);
        if (!isMountedRef.current) return;
        setHistoryData(res.data || []);
        if (res.data && res.data.length > 0) {
          setLatestData(res.data[res.data.length - 1]);
        }
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistory();

    // WebSocket connection with exponential backoff reconnect
    let reconnectAttempts = 0;

    const connect = () => {
      if (!isMountedRef.current) return;
      try {
        const ws = new WebSocket(WS_URL);
        wsRef.current = ws;

        ws.onopen = () => {
          reconnectAttempts = 0;
          console.log('WebSocket connected to', WS_URL);
        };

        ws.onmessage = (event) => {
          try {
            const newData = JSON.parse(event.data);
            if (!isMountedRef.current) return;
            setLatestData(newData);
            setHistoryData(prevData => {
              const next = [...prevData, newData].slice(-30);
              return next;
            });
          } catch (err) {
            console.error('Failed parsing WS message', err);
          }
        };

        ws.onclose = (ev) => {
          if (!isMountedRef.current) return;
          console.log('WebSocket closed, scheduling reconnect', ev.code, ev.reason);
          scheduleReconnect();
        };

        ws.onerror = (err) => {
          console.error('WebSocket error', err);
          // onclose will trigger reconnect
        };
      } catch (err) {
        console.error('WebSocket connect error', err);
        scheduleReconnect();
      }
    };

    const scheduleReconnect = () => {
      if (!isMountedRef.current) return;
      reconnectAttempts += 1;
      const timeout = Math.min(30000, 1000 * 2 ** Math.min(reconnectAttempts, 6));
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = setTimeout(() => {
        connect();
      }, timeout);
    };

    connect();

    return () => {
      isMountedRef.current = false;
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch (err) {
          console.warn('Error while closing WebSocket', err);
        }
        wsRef.current = null;
      }
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };
  }, []);

  return { latestData, historyData };
};
