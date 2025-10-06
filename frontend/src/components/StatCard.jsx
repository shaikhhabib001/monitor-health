import Card from './reactBits/Card';

const StatCard = ({ title, value, unit, icon, animationDelay = '0s' }) => {
  const cardStyle = { animationDelay };

  return (
    <Card className="p-6 hover:shadow-cyan-400/20 hover:border-cyan-400/50 hover:scale-[1.02] opacity-0 animate-fade-in-up" style={cardStyle}>
      <div className="flex items-center">
        <div className="mr-4 flex-none w-12 h-12 rounded-lg bg-slate-900/40 flex items-center justify-center text-white text-xl">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-300 truncate">{title}</p>
          <p className="text-2xl font-bold leading-none text-white">
            {value} {unit && <span className="text-base font-medium text-gray-300">{unit}</span>}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;