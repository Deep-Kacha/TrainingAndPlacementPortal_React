const StatCard = ({ title, value, icon, bg }) => {

  return (
    <div className="flex justify-between items-center bg-[#d8cfc3] p-6 rounded-xl shadow-sm">

      <div>
        <p className="text-gray-600">{title}</p>
        <h2 className="text-2xl font-bold text-blue-700">{value}</h2>
      </div>

      <div className={`p-3 rounded-lg ${bg}`}>
        {icon}
      </div>

    </div>
  );
};

export default StatCard;