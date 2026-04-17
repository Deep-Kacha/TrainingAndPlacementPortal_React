import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSpinner, FaHistory, FaCheckCircle, FaHourglassHalf,
  FaTrophy, FaTimesCircle, FaCalendarAlt, FaSync
} from "react-icons/fa";
import useSocketRefresh from "../../hooks/useSocketRefresh";
import { getAvatarColor } from "../../utils/ui";

const STATUS_UI = {
  applied:     { icon: <FaHourglassHalf />, label: "Pending Review",   color: "text-blue-700 bg-blue-50 border-blue-200"     },
  shortlisted: { icon: <FaCheckCircle />,   label: "Shortlisted",      color: "text-indigo-700 bg-indigo-50 border-indigo-200" },
  interview:   { icon: <FaSync />,          label: "In Interview",     color: "text-orange-700 bg-orange-50 border-orange-200" },
  selected:    { icon: <FaTrophy />,        label: "Selected 🎉",      color: "text-green-700 bg-green-50 border-green-300"   },
  rejected:    { icon: <FaTimesCircle />,   label: "Not Selected",     color: "text-red-700 bg-red-50 border-red-200"         },
};

const StudApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isPlaced, setIsPlaced]         = useState(false);
  const [loading, setLoading]           = useState(true);

  const fetchApplications = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch("/api/student/applications", { headers: { Authorization: `Bearer ${token}` } });
      const result = await res.json();
      if (result.success) {
        setApplications(result.data);
        setIsPlaced(result.isPlaced || false);
      }
    } catch {
      console.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);
  useSocketRefresh('REFRESH_APPLICATIONS', fetchApplications);

  const counts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-red-600">
        My Applications
      </h1>
      <p className="text-gray-600 mb-8">
        Track your selection journey and status.
      </p>

      {/* Summary strip */}
      {!loading && applications.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {Object.entries(STATUS_UI).map(([key, ui]) => (
            <div key={key} className={`rounded-xl border border-gray-100 p-4 flex flex-col gap-1 transition-all bg-white shadow-sm`}>
              <div className="flex justify-between items-center">
                <span className={`text-lg ${ui.color.split(' ')[0]}`}>{ui.icon}</span>
                <p className="text-xl font-bold text-gray-800">{counts[key] || 0}</p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{ui.label.replace(' 🎉', '')}</p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
          <p className="text-gray-500 font-medium">Loading History...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-xl border border-gray-200 shadow-sm">
          <FaHistory className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-600 font-bold">No applications found.</p>
          <p className="text-gray-500 text-xs">Start your career journey by applying for jobs!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left min-w-[850px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Company</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Role & CTC</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Timeline</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => {
                const ui = STATUS_UI[app.status] || STATUS_UI.applied;
                return (
                  <tr key={app.applicationId} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`${getAvatarColor(app.company)} text-white rounded-lg flex items-center justify-center font-bold text-base uppercase shadow-sm w-10 h-10`}>
                          {app.company?.[0] || 'C'}
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">{app.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-gray-700 text-xs uppercase tracking-wider mb-1">{app.role}</p>
                      <p className="text-red-600 font-bold text-base">₹ {app.salary || '—'}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600 text-xs font-semibold">
                        <FaCalendarAlt className="text-gray-400" />
                        {app.appliedAt}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest shadow-sm ${ui.color}`}>
                        {ui.icon} {ui.label}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => navigate('/StudJobDetails', { state: { job: app, isPlacedGlobally: isPlaced } })}
                        className="text-red-700 text-[10px] font-bold uppercase tracking-widest hover:underline"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudApplications;