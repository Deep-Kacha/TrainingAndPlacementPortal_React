import { useState, useEffect } from "react";
import { FaSpinner, FaTrophy, FaBuilding, FaUserGraduate, FaSearch } from "react-icons/fa";

const AdminPlacementHistory = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [error, setError]           = useState("");

  useEffect(() => { fetchPlacements(); }, []);

  const fetchPlacements = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch("/api/admin/placements/summary", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setPlacements(result.data);
      } else {
        setError(result.error || "Failed to load placement data.");
      }
    } catch {
      setError("Network error. Could not fetch placement history.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = placements.filter(p => {
    const q = search.toLowerCase();
    return (
      p.company?.toLowerCase().includes(q) ||
      p.role?.toLowerCase().includes(q) ||
      p.package?.toLowerCase().includes(q)
    );
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
      <p className="text-gray-500 font-medium">Loading Placement History...</p>
    </div>
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">Placement History</h1>
        <p className="text-gray-600 text-sm md:text-base mt-1">
          Job-level placement summary for all approved campus drives.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="relative mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search by company, role, or package..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg border bg-white outline-none focus:ring-2 focus:ring-red-300 text-sm"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl shadow">
          <FaTrophy className="text-gray-300 text-5xl mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">No placement records found.</p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Company</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Job Role</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Package</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Drive Date</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b transition-colors text-sm hover:bg-gray-50/80">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-600 text-white w-9 h-9 flex items-center justify-center rounded-lg font-bold flex-shrink-0">
                        {item.company?.charAt(0).toUpperCase() || "C"}
                      </div>
                      <span className="font-semibold text-gray-800">{item.company || "—"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700 font-medium">{item.role || "—"}</td>
                  <td className="p-4 font-extrabold text-[#e7000b]">{item.package || "—"}</td>
                  <td className="p-4 text-gray-600 font-medium">{item.driveDate}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                      item.status === "approved" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                    }`}>
                      {item.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPlacementHistory;