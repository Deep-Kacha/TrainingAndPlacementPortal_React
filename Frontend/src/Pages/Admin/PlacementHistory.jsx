import { useState, useEffect } from "react";
import PlacementRow from "../../Components/Admin/PlacementHistory/PlacementRow";
import { FaSpinner } from "react-icons/fa";

const AdminPlacementHistory = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/placements", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setPlacements(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch placement history", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
        <p className="text-gray-500 font-medium">Loading history...</p>
      </div>
    );
  }


  return (
    <div className="w-full">

        {/* Header */}
        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-red-600">
            Placement History
          </h1>

          <p className="text-gray-600 text-sm md:text-base">
            Manage And maintain A Placement Records
          </p>

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left min-w-[900px]">

            <thead className="bg-gray-200">

              <tr>
                <th className="p-4">Company Name</th>
                <th className="p-4">Job Role</th>
                <th className="p-4">Package</th>
                <th className="p-4 text-center">Selected Students</th>
                <th className="p-4">Offer Date</th>
                <th className="p-4">Joining Date</th>
                <th className="p-4">Status</th>
              </tr>

            </thead>

            <tbody>

              {placements.map((item) => (
                <PlacementRow
                  key={item.id}
                  data={item}
                />
              ))}

            </tbody>

          </table>

        </div>

    </div>
  );
};

export default AdminPlacementHistory;