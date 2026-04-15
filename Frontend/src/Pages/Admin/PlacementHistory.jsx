import { useState, useEffect } from "react";
import { FaSpinner, FaSearch, FaHistory, FaFilter } from "react-icons/fa";

const STATUS_CONFIG = {
  "In Progress": {
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    dot:   "bg-blue-500",
  },
  "Completed": {
    badge: "bg-green-50 text-green-700 border border-green-200",
    dot:   "bg-green-500",
  },
};

const AVATAR_COLORS = [
  "bg-blue-600",  "bg-purple-600", "bg-red-600",
  "bg-green-600", "bg-orange-500", "bg-teal-600",
  "bg-indigo-600","bg-pink-600",
];

const getAvatarColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

// ─────────────────────────────────────────────────────────────────────────────

const AdminPlacementHistory = () => {
  const [placements, setPlacements] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error,      setError]      = useState("");

  const fetchPlacements = async () => {
    setLoading(true);
    setError("");
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

  useEffect(() => { fetchPlacements(); }, []);

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filtered = placements.filter(p => {
    const q = search.toLowerCase();
    const matchSearch =
      (p.company?.toLowerCase().includes(q)) ||
      (p.role?.toLowerCase().includes(q))    ||
      (p.package?.toLowerCase().includes(q));
    const matchStatus =
      statusFilter === "All" || p.statusLabel === statusFilter;
    return matchSearch && matchStatus;
  });

  // ── Summary stats ──────────────────────────────────────────────────────────

  const totalPlaced     = placements.reduce((s, p) => s + (p.placedCount || 0), 0);
  const inProgress      = placements.filter(p => p.statusLabel === "In Progress").length;
  const completed       = placements.filter(p => p.statusLabel === "Completed").length;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="w-full">

      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">
          Placement History
        </h1>
        <p className="text-gray-500 text-sm md:text-base mt-1">
          Manage And Maintain All Placement Records
        </p>
      </div>

      {/* ── Summary Cards ── */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FaHistory className="text-blue-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Drives</p>
              <p className="text-xl font-bold text-gray-800">{placements.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">✓</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Placed</p>
              <p className="text-xl font-bold text-green-700">{totalPlaced}</p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span className="text-xs text-gray-500 font-medium">In Progress</span>
              <span className="font-bold text-gray-800 ml-1">{inProgress}</span>
            </div>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
              <span className="text-xs text-gray-500 font-medium">Completed</span>
              <span className="font-bold text-gray-800 ml-1">{completed}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Search + Filter Bar ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 px-4 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by company, role, or package..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 bg-gray-50"
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <FaFilter className="text-gray-400 text-sm" />
          {["All", "In Progress", "Completed"].map(opt => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                statusFilter === opt
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm font-medium">
          {error}
        </div>
      )}

      {/* ── Loading ── */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-20">
          <FaSpinner className="animate-spin text-red-600 text-3xl mb-3" />
          <p className="text-gray-400 text-sm font-medium">Loading Placement Records...</p>
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && !error && filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-20 text-center">
          <FaHistory className="text-gray-200 text-5xl mb-4" />
          <p className="text-gray-500 font-semibold text-base">No placement records found.</p>
          <p className="text-gray-400 text-sm mt-1">
            {search || statusFilter !== "All"
              ? "Try adjusting your search or filter."
              : "Approve company drives to see them here."}
          </p>
        </div>
      )}

      {/* ── Table ── */}
      {!loading && filtered.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[750px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Company Details
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Job Role
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Annual CTC
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center">
                    Placed Studs
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Drive Date
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Joining Date
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center">
                    Selection Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item) => {
                  const cfg = STATUS_CONFIG[item.statusLabel] || STATUS_CONFIG["In Progress"];
                  const avatarColor = getAvatarColor(item.company || "");
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      {/* Company */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${avatarColor} text-white flex items-center justify-center font-bold text-base flex-shrink-0`}>
                            {(item.company || "C").charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">
                            {item.company || "—"}
                          </span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4 text-gray-600 text-sm font-medium">
                        {item.role || "—"}
                      </td>

                      {/* CTC */}
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-red-600 text-sm">
                          {item.package || "—"}
                        </span>
                      </td>

                      {/* Placed Count */}
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          (item.placedCount || 0) > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {item.placedCount ?? 0}
                        </span>
                      </td>

                      {/* Drive Date */}
                      <td className="px-6 py-4 text-gray-600 text-sm font-medium">
                        {item.driveDate || "—"}
                      </td>

                      {/* Joining Date */}
                      <td className="px-6 py-4 text-gray-600 text-sm font-medium">
                        {item.joiningDate || "—"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {item.statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/40 text-xs text-gray-400 font-medium">
            Showing {filtered.length} of {placements.length} record{placements.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlacementHistory;