const Header = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <h1 className="text-2xl md:text-3xl font-extrabold text-white">{title}</h1>
      {subtitle && <p className="text-sm text-gray-300 mt-1">{subtitle}</p>}
    </div>
  );
};

export default Header;
