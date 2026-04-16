import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSpinner, FaBriefcase, FaMapMarkerAlt, FaCheckCircle,
  FaSearch, FaRegClock, FaTimesCircle, FaInfoCircle
} from 'react-icons/fa';
import useSocketRefresh from "../../hooks/useSocketRefresh";
import { getAvatarColor } from "../../utils/ui";

// ── Status badge helpers ──────────────────────────────────────────────────────
const APP_STATUS_UI = {
  applied:     { label: "Pending",     color: "bg-blue-100 text-blue-700 border-blue-200"    },
  shortlisted: { label: "Shortlisted", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  interview:   { label: "In Progress", color: "bg-orange-100 text-orange-700 border-orange-200" },
  selected:    { label: "Selected 🎉", color: "bg-green-100 text-green-700 border-green-200"  },
  rejected:    { label: "Not Selected",color: "bg-red-100 text-red-700 border-red-200"       },
};

// ── Inline Toast ──────────────────────────────────────────────────────────────
const Toast = ({ msg, ok, onClose }) => (
  <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg text-sm font-medium border animate-in
    ${ok ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
    {ok ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
    <span>{msg}</span>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">✕</button>
  </div>
);

// ── Confirmation Modal ─────────────────────────────────────────────────────────
const ConfirmModal = ({ job, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaInfoCircle className="text-red-600 text-xl" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Confirm Application</h3>
      <p className="text-sm text-gray-600 text-center mb-1">Apply for <span className="font-bold">{job?.role}</span></p>
      <p className="text-xs font-bold text-gray-500 text-center uppercase tracking-wider mb-6">{job?.company}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────

const StudJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs]               = useState([]);
  const [isPlaced, setIsPlaced]       = useState(false);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [applyingId, setApplyingId]   = useState(null);
  const [confirmJob, setConfirmJob]   = useState(null); // job to confirm
  const [toast, setToast]             = useState(null);

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch("/api/student/jobs", { headers: { Authorization: `Bearer ${token}` } });
      const result = await res.json();
      if (result.success) {
        setJobs(result.data);
        setIsPlaced(result.isPlaced);
      }
    } catch {
      console.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);
  useSocketRefresh('REFRESH_JOBS', fetchJobs);

  const handleApplyConfirmed = async () => {
    if (isPlaced) {
      showToast("Policy: You are already placed and cannot apply for more jobs.", false);
      setConfirmJob(null);
      return;
    }

    const job = confirmJob;
    setConfirmJob(null);
    setApplyingId(job.id);
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch(`/api/student/apply/${job.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        showToast("Application submitted successfully! 🎉", true);
        fetchJobs();
      } else {
        showToast(result.error || "Failed to apply.", false);
      }
    } catch {
      showToast("Network error. Please try again.", false);
    } finally {
      setApplyingId(null);
    }
  };

  const filtered = jobs.filter(j => {
    const q = search.toLowerCase();
    return (j.company?.toLowerCase().includes(q)) ||
           (j.role?.toLowerCase().includes(q))    ||
           (j.location?.toLowerCase().includes(q));
  });

  return (
    <div className="w-full">
      {/* Toast */}
      {toast && <Toast msg={toast.msg} ok={toast.ok} onClose={() => setToast(null)} />}

      {/* Confirm Modal */}
      {confirmJob && (
        <ConfirmModal job={confirmJob} onConfirm={handleApplyConfirmed} onCancel={() => setConfirmJob(null)} />
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-red-600">Career Opportunities</h1>
        <p className="text-gray-600 text-sm md:text-base mt-1 font-medium">
          Explore and apply for verified campus drives.
        </p>
        {isPlaced && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
             <FaCheckCircle className="text-blue-600 text-xl" />
             <div>
                <p className="text-blue-800 font-bold text-sm">You are already placed! 🎉</p>
                <p className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">Per the "One-Student-One-Job" policy, applications for other drives are disabled.</p>
             </div>
          </div>
        )}
      </header>

      {/* Search */}
      <div className="relative mb-6">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search by company, role, or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 bg-white"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <FaSpinner className="animate-spin text-red-600 text-4xl mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Finding available positions...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-[#ece6da] rounded-xl border border-[#e0dacd] shadow-sm">
          <FaBriefcase className="text-gray-300 text-6xl mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-bold">
            {search ? "No jobs match your search." : "No active job drives found."}
          </p>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Check back later for new opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(job => {
            const appUI = job.applicationStatus ? APP_STATUS_UI[job.applicationStatus] || APP_STATUS_UI.applied : null;
            const deadlineBadge = job.deadlinePassed
              ? { text: "Deadline Passed", color: "bg-red-100 text-red-700 border-red-200" }
              : job.daysLeft !== null && job.daysLeft <= 3
              ? { text: `${job.daysLeft}d left`, color: "bg-orange-100 text-orange-700 border-orange-200" }
              : job.daysLeft !== null
              ? { text: `${job.daysLeft}d left`, color: "bg-green-100 text-green-700 border-green-200" }
              : null;

            return (
              <div
                className={`bg-[#ece6da] p-6 rounded-xl border shadow-sm flex flex-col h-full transition-all hover:shadow-md ${
                  job.deadlinePassed ? 'opacity-70 border-red-200' : 'border-[#e0dacd]'
                }`}
                key={job.id}
              >
                {/* Company row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${getAvatarColor(job.company)} rounded-xl flex items-center justify-center text-white font-extrabold text-2xl shrink-0 uppercase w-14 h-14`}>
                    {job.company?.[0] || 'C'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-extrabold m-0 text-gray-900 uppercase tracking-tighter truncate">{job.company || "Company"}</h2>
                    <p className="text-gray-600 text-xs font-bold m-0 mt-0.5 uppercase tracking-widest">{job.role || "Job Role"}</p>
                  </div>
                  {/* Deadline badge */}
                  {deadlineBadge && (
                    <span className={`flex-shrink-0 text-[10px] font-bold uppercase border px-2 py-1 rounded-md ${deadlineBadge.color}`}>
                      {deadlineBadge.text}
                    </span>
                  )}
                </div>

                {/* Package */}
                <div className="text-red-700 text-2xl font-black mb-4 tracking-tighter">
                  {job.salary || "—"}
                </div>

                {/* Details */}
                <div className="space-y-2 mb-6 text-[11px] font-bold uppercase tracking-wider">
                  {job.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="text-red-600" /> {job.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaRegClock className="text-orange-500" />
                    Deadline: {job.deadline}
                  </div>
                  {job.driveDate !== '—' && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaCheckCircle className="text-green-500" />
                      Drive: {job.driveDate}
                    </div>
                  )}
                </div>

                {/* Current status badge (if applied) */}
                {appUI && (
                  <div className={`mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${appUI.color}`}>
                    <FaCheckCircle className="text-xs" /> {appUI.label}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 mt-auto">
                  <button
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/60 transition-colors"
                    onClick={() => navigate('/StudJobDetails', { state: { job, isPlacedGlobally: isPlaced } })}
                  >
                    View Details
                  </button>

                  {job.applicationStatus ? (
                    <button
                      className="flex-1 bg-gray-200 text-gray-500 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest cursor-not-allowed"
                      disabled
                    >
                      ✓ Applied
                    </button>
                  ) : job.deadlinePassed ? (
                    <button
                      className="flex-1 bg-red-100 text-red-500 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest cursor-not-allowed"
                      disabled
                    >
                      Deadline Over
                    </button>
                  ) : isPlaced ? (
                    <button
                      className="flex-1 bg-blue-100 text-blue-400 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest cursor-not-allowed border border-blue-200"
                      disabled
                    >
                      Placed 🎉
                    </button>
                  ) : (
                    <button
                      className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors disabled:bg-red-300"
                      onClick={() => setConfirmJob(job)}
                      disabled={applyingId === job.id}
                    >
                      {applyingId === job.id ? (
                        <span className="flex items-center justify-center gap-2"><FaSpinner className="animate-spin" /> Applying...</span>
                      ) : "Apply Now"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudJobs;
