const SectionCard = ({ icon, title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

      <div className="flex items-center gap-3 mb-4">

        <div className="bg-red-600 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm">
          {icon}
        </div>

        <h2 className="text-md font-semibold text-gray-700">
          {title}
        </h2>

      </div>

      {children}

    </div>
  );
};

export default SectionCard; 