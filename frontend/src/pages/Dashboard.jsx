import StatCard from '../components/StatCard.jsx';
import { FaHeartbeat, FaBed, FaWalking } from 'react-icons/fa';
import HeartRateChart from '../components/HeartRateChart.jsx';
import StepsChart from '../components/StepsChart.jsx';
import SleepChart from '../components/SleepChart.jsx';
import { useHealthData } from '../hooks/useHealthData.js';
import Header from '../components/reactBits/Header.jsx';

const Dashboard = () => {
  const { latestData, historyData } = useHealthData();

  const formatChartData = (data, dataKey, label, color) => {
    const labels = data.map(d => {
      const dt = new Date(d.timestamp);
      return dt.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    });
    const values = data.map(d => d[dataKey]);

    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          borderColor: color,
          backgroundColor: `${color}80`,
          tension: 0.3,
          pointRadius: 2,
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <Header title="Monitor Health with Ease" subtitle="Real time overview of heart rate, steps and sleep" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Heart Rate"
          value={latestData ? latestData.heartRate : '...'}
          unit="bpm"
          icon={<FaHeartbeat className="text-fresh-lime text-3xl" />}
          animationDelay="0.1s"
        />
        <StatCard
          title="Sleep"
          value={latestData ? latestData.sleepHours : '...'}
          unit="hours"
          icon={<FaBed className="text-fresh-lime text-3xl" />}
          animationDelay="0.2s"
        />
        <StatCard
          title="Steps Today"
          value={latestData ? latestData.steps : '...'}
          unit=""
          icon={<FaWalking className="text-fresh-lime text-3xl" />}
          animationDelay="0.3s"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {historyData.length > 0 && (
          <>
            <HeartRateChart historyData={historyData} formatChartData={formatChartData} />
            <StepsChart historyData={historyData} formatChartData={formatChartData} />
            <SleepChart historyData={historyData} formatChartData={formatChartData} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;