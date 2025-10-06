
import LineChart from './LineChart';
import ChartContainer from './ChartContainer';

const StepsChart = ({ historyData, formatChartData }) => {
  const chartData = formatChartData(historyData, 'steps', 'Steps Count', '#2DD4BF');

  return (
    <ChartContainer title="Step Count Over Time">
      <LineChart chartData={chartData} />
    </ChartContainer>
  );
};

export default StepsChart;
