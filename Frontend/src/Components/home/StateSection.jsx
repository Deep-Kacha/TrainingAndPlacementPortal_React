import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const StatsSection = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/guest/stats");
        const result = await res.json();
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch public stats", error);
        // Fallback to defaults if API fails
        setStats([
          { value: "850+", label: "Registered Students" },
          { value: "92%", label: "Placement Rate" },
          { value: "120+", label: "Recruiters" },
          { value: "12 LPA", label: "Highest Package" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section id='placements' className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[100px]">
            <FaSpinner className="animate-spin text-red-600 text-3xl mb-4" />
            <p className="text-gray-500 font-medium">Loading Statistics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#d9d1c7] p-4 sm:p-6 text-center rounded-lg shadow-sm border border-[#c4b5a6] transition-transform hover:scale-105"
              >
                <div className="text-red-600 text-2xl md:text-3xl font-extrabold">
                  {stat.value}
                </div>
                <p className="text-gray-700 mt-2 font-bold text-sm md:text-base uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default StatsSection;