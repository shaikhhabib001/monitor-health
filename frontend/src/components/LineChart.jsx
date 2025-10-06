import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#A3E635', // Fresh Lime for legend text
        },
      },
      title: {
        display: false, // Title will be handled by ChartContainer
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#2DD4BF', // Cool Teal for x-axis labels
        },
        grid: {
          color: 'rgba(45, 212, 191, 0.1)', // Lighter grid lines
        },
      },
      y: {
        ticks: {
          color: '#2DD4BF', // Cool Teal for y-axis labels
        },
        grid: {
          color: 'rgba(45, 212, 191, 0.1)', // Lighter grid lines
        },
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;
