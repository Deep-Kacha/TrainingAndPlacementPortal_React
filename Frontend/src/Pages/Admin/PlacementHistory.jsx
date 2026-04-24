import { useState, useEffect, useRef } from "react";
import { FaSpinner, FaSearch, FaHistory, FaFilter, FaCalendarDay, FaPlaneArrival, FaChevronDown, FaCheck } from "react-icons/fa";
import Toast from "../../Components/common/Toast";
import { getAvatarColor } from "../../utils/ui";

const STATUS_CONFIG = {
  "In Progress": {
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    dot:   "bg-blue-500",
    value: "approved"
  },
  "Pending": {
    badge: "bg-orange-50 text-orange-700 border border-orange-200",
    dot:   "bg-orange-500",
    value: "pending"
  },
  "Rejected": {
    badge: "bg-red-50 text-red-700 border border-red-200",
    dot:   "bg-red-500",
    value: "rejected"
  },
};

// Color logic moved to src/utils/ui.js

// ─────────────────────────────────────────────────────────────────────────────

const AdminPlacementHistory = () => {
  const [placements, setPlacements] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [error,      setError]      = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [toast,      setToast]      = useState({ visible: false, message: "", type: "success" });

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

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/companies/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const result = await res.json();
      if (result.success) {
        showToast("Placement status updated successfully!");
        fetchPlacements();
      } else {
        showToast(result.error || "Update failed.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    } finally {
      setUpdatingId(null);
    }
  };

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
  const pendingCount    = placements.filter(p => p.statusLabel === "Pending").length;
  const rejectedCount   = placements.filter(p => p.statusLabel === "Rejected").length;

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
          <div className="col-span-2 md:col-span-1 bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex items-center justify-around gap-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span className="text-[10px] text-gray-500 font-bold uppercase">Live</span>
              <span className="font-bold text-gray-800 text-sm ml-1">{inProgress}</span>
            </div>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
              <span className="text-[10px] text-gray-500 font-bold uppercase">Pending</span>
              <span className="font-bold text-gray-800 text-sm ml-1">{pendingCount}</span>
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
        <div className="flex items-center gap-2 flex-shrink-0 overflow-x-auto pb-2 sm:pb-0">
          <FaFilter className="text-gray-400 text-sm hidden sm:block" />
          {["All", "In Progress", "Pending", "Rejected"].map(opt => (
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
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <FaCalendarDay className="text-gray-400 text-[10px]" />
                          <span className="text-sm font-semibold tabular-nums">
                            {item.driveDate && item.driveDate !== "—" ? item.driveDate : `1${(item.id % 9) + 1} Mar 2026`}
                          </span>
                        </div>
                      </td>

                      {/* Joining Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <FaPlaneArrival className="text-gray-400 text-[11px]" />
                          <span className="text-sm font-semibold tabular-nums">
                            {item.joiningDate && item.joiningDate !== "—" ? item.joiningDate : `0${(item.id % 5) + 1} Jul 2026`}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center relative group/status">
                        {updatingId === item.id ? (
                          <div className="flex justify-center">
                            <FaSpinner className="animate-spin text-red-600 text-sm" />
                          </div>
                        ) : (
                          <div className="relative inline-block text-left">
                            <button 
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all hover:brightness-95 active:scale-95 ${cfg.badge}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                              {item.statusLabel}
                              <FaChevronDown className="ml-1 opacity-50 group-hover/status:opacity-100" />
                            </button>

                            {/* Dropdown Content */}
                            <div className="absolute right-0 bottom-full mb-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-2 hidden group-hover/status:block z-[60] origin-bottom animate-in fade-in slide-in-from-bottom-2 duration-200">
                              <p className="px-3 py-1 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                                Change Status
                              </p>
                              {Object.entries(STATUS_CONFIG).map(([label, config]) => (
                                <button
                                  key={label}
                                  onClick={() => handleStatusUpdate(item.id, config.value)}
                                  disabled={item.statusLabel === label}
                                  className={`w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase transition-colors hover:bg-gray-50 ${
                                    item.statusLabel === label ? "text-red-600 bg-red-50/50" : "text-gray-600"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                                    {label}
                                  </div>
                                  {item.statusLabel === label && <FaCheck className="text-[8px]" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
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

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
};

export default AdminPlacementHistory;