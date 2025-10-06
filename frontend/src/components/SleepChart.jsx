
import LineChart from './LineChart';
import ChartContainer from './ChartContainer';

const SleepChart = ({ historyData, formatChartData }) => {
  const chartData = formatChartData(historyData, 'sleepHours', 'Sleep (hours)', '#818CF8');

  return (
    <ChartContainer title="Sleep Over Time">
      <LineChart chartData={chartData} />
    </ChartContainer>
  );
};

export default SleepChart;
