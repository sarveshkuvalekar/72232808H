import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getStockPrices } from '../services/api';
import {
  Card, CardContent, Typography, MenuItem, Select
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import axios from 'axios';
import { getToken } from '../utils/auth';

const StockChart = ({ ticker }) => {
  const [minutes, setMinutes] = useState(50);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const loadPrices = async () => {
      const data = await getStockPrices(ticker, minutes);
      setPrices(data);
    };
    loadPrices();
  }, [ticker, minutes]);

  const chartData = {
    labels: prices.map((item) => new Date(item.lastUpdatedAt).toLocaleTimeString()),
    datasets: [{
      label: `${ticker} Price`,
      data: prices.map((item) => item.price),
      borderColor: 'blue',
      fill: false
    }]
  };

  


  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const token = await getToken();

        const response = await axios.get(
          "http://20.244.56.144/evaluation-service/stocks/NVDA?minutes=50",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching stock data", error);
      }
    };

    fetchStockData();
  }, []);


  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Stock Chart - {ticker}</Typography>
        <Select value={minutes} onChange={(e) => setMinutes(e.target.value)} sx={{ mb: 2 }}>
          {[10, 20, 30, 50, 60].map((val) => (
            <MenuItem key={val} value={val}>{val} min</MenuItem>
          ))}
        </Select>
        <Line data={chartData} />
      </CardContent>
    </Card>
  );
};

export default StockChart;
