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

const LineChart = ({ chartData, title }) => {
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
        display: true,
        text: title,
        color: '#FFFFFF', // White title
        font: {
          size: 18,
        },
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

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg h-80">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default LineChart;
