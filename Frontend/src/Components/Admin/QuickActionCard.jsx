const QuickActionCard = ({ title, description, icon, linkColor, buttonText }) => {

  return (
    <div className="bg-[#d8cfc3] p-8 rounded-xl shadow text-center">

      <div className="flex justify-center mb-4 text-3xl">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-1">
        {title}
      </h3>

      <p className="text-gray-600 text-sm">
        {description}
      </p>

      <button className={`mt-4 font-semibold ${linkColor}`}>
        {buttonText}
      </button>

    </div>
  );
};

export default QuickActionCard;