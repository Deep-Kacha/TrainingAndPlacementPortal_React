import React from "react";

const StatsSection = () => {

  // Static for now (future API)
  const stats = [
    { value: "850+", label: "Registered Students" },
    { value: "92%", label: "Placed Students" },
    { value: "120+", label: "Recruiters" },
    { value: "12 LPA", label: "Highest Package" },
  ];

  return (
    <section id='placements'className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 ">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#d9d1c7] p-6 text-center rounded-lg shadow"
          >
            <div className="text-red-600 text-2xl font-bold">
              {stat.value}
            </div>

            <p className="text-gray-700 mt-2">{stat.label}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default StatsSection;