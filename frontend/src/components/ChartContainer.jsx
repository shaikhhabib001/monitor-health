import Card from './reactBits/Card';

const ChartContainer = ({ title, children }) => {
  return (
    <Card className="p-4">
      <h3 className="text-md md:text-lg font-semibold text-white mb-3">{title}</h3>
      <div className="h-72">
        {children}
      </div>
    </Card>
  );
};

export default ChartContainer;