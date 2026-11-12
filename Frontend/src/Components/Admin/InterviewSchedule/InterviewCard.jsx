import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrashAlt, FaChevronDown, FaChevronUp, FaCalendarPlus } from "react-icons/fa";
import { getAvatarColor } from "../../../utils/ui";

const MODE_ICON = { Online: "💻", Offline: "🏢", Hybrid: "🔀" };

const InterviewCard = ({ data, onScheduleCreated, onScheduleDeleted }) => {
  // 🛡️ PROPS SHIELD: Prevent crash if data is missing or malformed
  if (!data || typeof data !== "object") {
    console.error("📍 InterviewCard: Received invalid data prop", data);
    return null;
  }

  const navigate      = useNavigate();
  const [expanded,    setExpanded]    = useState(false);
  const [schedules,   setSchedules]   = useState(data.schedules || []);

  const handleDelete = async (scheduleId) => {
    if (!confirm("Delete this schedule round?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/interviews/${scheduleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedules(prev => prev.filter(s => s.id !== scheduleId));
      onScheduleDeleted?.();
    } catch {
      alert("Delete failed.");
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
  const formatTime = (t) => {
    if (!t) return "—";
    const [h, m] = t.split(":");
    const hr = parseInt(h, 10);
    return `${hr > 12 ? hr - 12 : hr || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
  };

  const handleManageSchedule = () => {
    navigate("/AdminInterviewScheduleForm", { state: { company: data } });
  };

  return (
    <div className="bg-[#d8cfc3] p-6 rounded-xl shadow-md border border-gray-200 flex flex-col gap-3 group hover:shadow-lg transition-all">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`${getAvatarColor(String(data?.name || ""))} text-white w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold flex-shrink-0 shadow-sm`}>
          {String(data?.name || "C").charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg truncate text-gray-800">{data?.name || "Company Name"}</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider truncate">{data?.role || "Job Role"}</p>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg flex-shrink-0 border ${
          String(data?.status || "").includes("Complete") ? "bg-gray-100 text-gray-400 border-gray-200" : "bg-green-50 text-green-700 border-green-100"
        }`}>
          {String(data?.status || "").includes("Complete") ? "COMPLETED" : "IN PROGRESS"}
        </span>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Package</p>
            <p className="text-lg font-bold text-red-600">{data?.salary || "—"}</p>
        </div>
        <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Location</p>
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 line-clamp-1">
                <FaMapMarkerAlt className="text-gray-400" /> {data?.location || "Not specified"}
            </p>
        </div>
      </div>

      <div className="space-y-2 border-t border-white/40 pt-3">
        {data?.driveDate && (
            <p className="flex items-center gap-2 text-gray-600 text-[11px] font-bold uppercase tracking-wide">
            <FaCalendarAlt className="text-red-600" /> Planned Drive: {formatDate(data.driveDate)}
            </p>
        )}
      </div>

      {/* Schedule rounds toggle */}
      <div className="flex gap-2 items-stretch mt-2">
        <button
            onClick={() => setExpanded(!expanded)}
            className="flex-1 flex items-center justify-between bg-white border border-gray-100 rounded-lg px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition shadow-sm"
        >
            <span>Rounds ({schedules.length})</span>
            {expanded ? <FaChevronUp className="text-red-600" /> : <FaChevronDown />}
        </button>
        <button
            onClick={handleManageSchedule}
            className="bg-red-600 text-white rounded-lg px-4 flex items-center justify-center hover:bg-black transition shadow-sm"
            title="Schedule New Rounds"
        >
            <FaCalendarPlus />
        </button>
      </div>

      {expanded && (
        <div className="space-y-2 mt-2 animate-in fade-in duration-300">
          {schedules.length === 0 && (
            <div className="bg-white/40 border border-dashed border-gray-300 rounded-lg py-6 text-center">
                <p className="text-gray-400 text-xs font-medium">No rounds scheduled yet.</p>
                <button onClick={handleManageSchedule} className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 hover:underline">
                    Schedule Now
                </button>
            </div>
          )}
          {schedules.map((s) => s && (
            <div key={s.id || Math.random()} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-start justify-between gap-3 shadow-sm">
              <div>
                <p className="font-bold text-gray-800 text-sm">{s.round_name || "Untitled Round"}</p>
                <div className="flex items-center gap-3 mt-1.5">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded border">
                        <FaCalendarAlt className="text-red-500" /> {formatDate(s.interview_date)}
                    </p>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                        {s.interview_time ? s.interview_time.slice(0, 5) : "—"}
                    </p>
                </div>
                <p className="text-gray-400 font-medium text-[10px] mt-2 flex items-center gap-1">
                  {MODE_ICON[s.mode] || "📍"} {(s.mode || "Not specified").toUpperCase()} {s.venue_or_link ? `— ${s.venue_or_link}` : ""}
                </p>
              </div>
              <button
                onClick={() => handleDelete(s.id)}
                className="text-gray-300 hover:text-red-600 transition flex-shrink-0 mt-1"
                title="Remove Round"
              >
                <FaTrashAlt size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewCard;