
import LineChart from './LineChart';
import ChartContainer from './ChartContainer';

const HeartRateChart = ({ historyData, formatChartData }) => {
  const chartData = formatChartData(historyData, 'heartRate', 'Heart Rate (bpm)', '#A3E635');
  
  return (
    <ChartContainer title="Heart Rate Over Time">
      <LineChart chartData={chartData} />
    </ChartContainer>
  );
};

export default HeartRateChart;
