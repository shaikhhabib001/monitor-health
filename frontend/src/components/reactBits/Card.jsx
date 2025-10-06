const Card = ({ children, className = '', style }) => {
  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-700/50 transition-all duration-300 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
