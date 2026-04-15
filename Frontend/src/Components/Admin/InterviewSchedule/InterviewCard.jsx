import { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaTrashAlt, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";

const MODE_ICON = { Online: "💻", Offline: "🏢", Hybrid: "🔀" };

const InterviewCard = ({ data, onScheduleCreated, onScheduleDeleted }) => {
  const [expanded,    setExpanded]    = useState(false);
  const [showForm,    setShowForm]    = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [schedules,   setSchedules]   = useState(data.schedules || []);
  const [newRound, setNewRound] = useState({
    round_name: "", interview_date: "", interview_time: "", mode: "Online", venue_or_link: ""
  });

  const handleCreate = async () => {
    if (!newRound.round_name || !newRound.interview_date || !newRound.interview_time) {
      alert("Round name, date and time are required.");
      return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res   = await fetch("/api/admin/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ job_id: data.id, ...newRound })
      });
      const result = await res.json();
      if (result.success) {
        setSchedules(prev => [...prev, result.data]);
        setNewRound({ round_name: "", interview_date: "", interview_time: "", mode: "Online", venue_or_link: "" });
        setShowForm(false);
        onScheduleCreated?.();
      } else {
        alert("Failed: " + result.error);
      }
    } catch {
      alert("Network error.");
    } finally {
      setSaving(false);
    }
  };

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

  return (
    <div className="bg-[#d8cfc3] p-6 rounded-xl shadow flex flex-col gap-3">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold flex-shrink-0">
          {data?.name?.charAt(0).toUpperCase() || "C"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg truncate">{data?.name || "Company Name"}</h3>
          <p className="text-gray-600 text-sm truncate">{data?.role || "Job Role"}</p>
        </div>
        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0 ${
          data.status?.includes("Complete") ? "bg-gray-200 text-gray-600" : "bg-green-100 text-green-700"
        }`}>
          {data.status?.includes("Complete") ? "Complete" : "Pending"}
        </span>
      </div>

      {/* Meta */}
      <p className="text-red-600 font-bold text-lg">{data?.salary || "—"}</p>
      <p className="flex items-center gap-2 text-gray-600 text-sm">
        <FaMapMarkerAlt />{data?.location || "Not specified"}
      </p>
      {data?.driveDate && (
        <p className="flex items-center gap-2 text-gray-600 text-sm">
          <FaCalendarAlt /> Drive: {formatDate(data.driveDate)}
        </p>
      )}
      <p className="text-gray-600 text-sm line-clamp-2">{data?.process || "—"}</p>

      {/* Schedule rounds toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full bg-white/60 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-white/80 transition"
      >
        <span>Interview Rounds ({schedules.length})</span>
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {expanded && (
        <div className="space-y-2">
          {schedules.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-3">No rounds scheduled yet.</p>
          )}
          {schedules.map((s) => (
            <div key={s.id} className="bg-white rounded-lg px-4 py-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-gray-800 text-sm">{s.round_name}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {formatDate(s.interview_date)} · {formatTime(s.interview_time)}
                </p>
                <p className="text-gray-500 text-xs">
                  {MODE_ICON[s.mode] || "📍"} {s.mode} {s.venue_or_link ? `— ${s.venue_or_link}` : ""}
                </p>
              </div>
              <button
                onClick={() => handleDelete(s.id)}
                className="text-gray-400 hover:text-red-600 transition flex-shrink-0 mt-1"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}

          {/* Add round form */}
          {showForm ? (
            <div className="bg-white rounded-lg p-4 space-y-3 mt-2">
              <p className="text-sm font-bold text-gray-700 mb-1">Add New Round</p>
              <input
                type="text" placeholder="Round Name (e.g. Aptitude Test)"
                value={newRound.round_name}
                onChange={e => setNewRound(p => ({ ...p, round_name: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
              />
              <div className="grid grid-cols-2 gap-2">
                <input type="date" value={newRound.interview_date}
                  onChange={e => setNewRound(p => ({ ...p, interview_date: e.target.value }))}
                  className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
                />
                <input type="time" value={newRound.interview_time}
                  onChange={e => setNewRound(p => ({ ...p, interview_time: e.target.value }))}
                  className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
                />
              </div>
              <select value={newRound.mode}
                onChange={e => setNewRound(p => ({ ...p, mode: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
              >
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
              <input type="text" placeholder="Venue / Meeting Link (Optional)"
                value={newRound.venue_or_link}
                onChange={e => setNewRound(p => ({ ...p, venue_or_link: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button onClick={handleCreate} disabled={saving}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-60">
                  {saving ? "Saving..." : "Save Round"}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-700 mt-1"
            >
              <FaPlus className="text-xs" /> Add Round
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewCard;