import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";

const AdminInterviewScheduleForm = () => {

  const navigate     = useNavigate();
  const location     = useLocation();
  const companyData  = location.state?.company || {};

  const [companyDetails, setCompanyDetails] = useState({
    companyName: companyData.name || "",
    hrName: ""
  });

  const [rounds, setRounds] = useState([
    { id: 1, roundNo: "1", roundName: "", venue: "", waitingArea: "", date: "", time: "", mode: "Offline" }
  ]);

  const [errors,     setErrors]     = useState({ companyDetails: {}, rounds: [] });
  const [saving,     setSaving]     = useState(false);
  const [saveMsg,    setSaveMsg]    = useState({ text: "", ok: false });

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleCompanyChange = (field, value) => {
    setCompanyDetails({ ...companyDetails, [field]: value });
    setErrors(prev => ({ ...prev, companyDetails: { ...prev.companyDetails, [field]: "" } }));
  };

  const handleRoundChange = (id, field, value) => {
    setRounds(rounds.map(r => r.id === id ? { ...r, [field]: value } : r));
    setErrors(prev => ({
      ...prev,
      rounds: prev.rounds.map(rErr => rErr.id === id ? { ...rErr, [field]: "" } : rErr)
    }));
  };

  const handleAddRound = () => {
    const nextNo = rounds.length + 1;
    setRounds([...rounds, {
      id: Date.now(), roundNo: String(nextNo),
      roundName: "", venue: "", waitingArea: "", date: "", time: "", mode: "Offline"
    }]);
  };

  const handleDeleteRound = (id) => {
    if (rounds.length > 1) {
      setRounds(rounds.filter(round => round.id !== id));
      setErrors(prev => ({ ...prev, rounds: prev.rounds.filter(rErr => rErr.id !== id) }));
    }
  };

  // ── Validation ────────────────────────────────────────────────────────────

  const validate = () => {
    let isValid = true;
    let newErrors = { companyDetails: {}, rounds: [] };

    if (!companyDetails.companyName.trim()) {
      newErrors.companyDetails.companyName = "Company Name is required.";
      isValid = false;
    }
    if (!companyDetails.hrName.trim()) {
      newErrors.companyDetails.hrName = "HR Name is required.";
      isValid = false;
    }

    newErrors.rounds = rounds.map(r => {
      let rErr = { id: r.id };
      if (!String(r.roundNo).trim()) { rErr.roundNo    = "Round No is required.";    isValid = false; }
      if (!r.roundName.trim())       { rErr.roundName   = "Round Name is required.";  isValid = false; }
      if (!r.venue.trim())           { rErr.venue       = "Venue is required.";        isValid = false; }
      if (!r.date.trim())            { rErr.date        = "Date is required.";         isValid = false; }
      if (!r.time.trim())            { rErr.time        = "Timing is required.";       isValid = false; }
      return rErr;
    });

    setErrors(newErrors);
    return isValid;
  };

  // ── Submit — POST each round to backend ──────────────────────────────────

  const handleSubmit = async () => {
    if (!validate()) return;

    if (!companyData.id) {
      setSaveMsg({ text: "No job ID found. Please navigate here from Interview Schedule page.", ok: false });
      return;
    }

    setSaving(true);
    setSaveMsg({ text: "", ok: false });

    try {
      const token = localStorage.getItem("token");
      const results = await Promise.all(
        rounds.map(round =>
          fetch("/api/admin/interviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              job_id:         companyData.id,
              round_name:     `Round ${round.roundNo}: ${round.roundName}`,
              interview_date: round.date,
              interview_time: round.time,
              mode:           round.mode,
              venue_or_link:  round.venue + (round.waitingArea ? ` (Waiting: ${round.waitingArea})` : "")
            })
          }).then(r => r.json())
        )
      );

      const allOk = results.every(r => r.success);
      if (allOk) {
        setSaveMsg({ text: `✓ ${rounds.length} round(s) scheduled successfully!`, ok: true });
        setTimeout(() => navigate("/AdminInterviewSchedule"), 1500);
      } else {
        setSaveMsg({ text: "✗ Some rounds failed to save. Please try again.", ok: false });
      }
    } catch {
      setSaveMsg({ text: "✗ Network error. Please check your connection.", ok: false });
    } finally {
      setSaving(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-red-600">
            Internal Schedule Planner
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <p className="text-gray-800 font-bold text-sm md:text-base">
                {companyData.name || "Company"}
            </p>
            <span className="text-gray-300 hidden md:inline">|</span>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[11px]">
                {companyData.role || "Job Role"}
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white border text-gray-700 px-6 py-2.5 rounded-xl w-full md:w-auto hover:bg-gray-50 text-xs font-bold uppercase tracking-widest shadow-sm transition-all"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Job Context Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#d8cfc3] p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Package Offered</p>
            <p className="text-lg font-bold text-red-600">{companyData.salary || "Not Specified"}</p>
        </div>
        <div className="bg-[#d8cfc3] p-4 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Primary Location</p>
            <p className="text-sm font-bold text-gray-800">{companyData.location || "Not Specified"}</p>
        </div>
        <div className="bg-[#d8cfc3] p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Interview Policy</p>
                <p className="text-sm font-bold text-gray-800">Standard RKU</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                <FaCheckCircle />
            </div>
        </div>
      </div>

      {/* Success / Error Banner */}
      {saveMsg.text && (
        <div className={`mb-8 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 shadow-md animate-in slide-in-from-top duration-300 ${
          saveMsg.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}>
          {saveMsg.ok ? <FaCheckCircle className="text-lg" /> : <div className="w-5 h-5 rounded-full bg-white text-red-600 flex items-center justify-center font-bold">!</div>}
          {saveMsg.text}
        </div>
      )}

      {/* Company/HR Details Card */}
      <div className="bg-[#d8cfc3] p-8 rounded-xl shadow-md mb-8 border border-gray-200">
        <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            Point of Contact Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Company Name (Confirmed)</label>
            <input
              type="text"
              readOnly
              value={companyDetails.companyName}
              className="w-full p-4 rounded-xl border border-gray-300 outline-none text-sm font-bold bg-gray-50/50 text-gray-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Assign HR/Coordinator Name</label>
            <input
              type="text"
              placeholder="e.g. Shweta Jethwa"
              value={companyDetails.hrName}
              onChange={(e) => handleCompanyChange("hrName", e.target.value)}
              className={`w-full p-4 rounded-xl border outline-none text-sm font-bold transition-all ${
                errors.companyDetails?.hrName ? "border-red-600 bg-red-50" : "border-gray-300 bg-white focus:border-red-600 focus:shadow-sm"
              }`}
            />
            {errors.companyDetails?.hrName && (
              <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{errors.companyDetails.hrName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Round Cards */}
      {rounds.map((round, index) => {
        const roundError = errors.rounds?.find(e => e.id === round.id) || {};
        return (
          <div key={round.id} className="bg-[#d8cfc3] p-8 rounded-xl shadow-md mb-8 relative border border-gray-200">
            <div className="flex justify-between items-center mb-8 border-b border-white/40 pb-4">
              <h2 className="text-[11px] font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-sm">
                    {index + 1}
                </span>
                Round Configuration
              </h2>
              {rounds.length > 1 && (
                <button
                  onClick={() => handleDeleteRound(round.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  title="Remove Round"
                >
                  <RiDeleteBin6Line size={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Round No */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Round Number/Sequence</label>
                <input
                  type="text" placeholder="e.g. 1"
                  value={round.roundNo}
                  onChange={(e) => handleRoundChange(round.id, "roundNo", e.target.value)}
                  className={`w-full p-4 rounded-xl border outline-none text-sm font-bold transition-all ${
                    roundError.roundNo ? "border-red-600 bg-red-50" : "border-gray-200 bg-white focus:border-red-600"
                  }`}
                />
                {roundError.roundNo && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{roundError.roundNo}</p>}
              </div>

              {/* Round Name */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Round Designation</label>
                <input
                  type="text" placeholder="e.g. Technical Interview"
                  value={round.roundName}
                  onChange={(e) => handleRoundChange(round.id, "roundName", e.target.value)}
                  className={`w-full p-4 rounded-xl border outline-none text-sm font-bold transition-all ${
                    roundError.roundName ? "border-red-600 bg-red-50" : "border-gray-200 bg-white focus:border-red-600"
                  }`}
                />
                {roundError.roundName && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{roundError.roundName}</p>}
              </div>

              {/* Mode */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Interview Medium</label>
                <select
                  value={round.mode}
                  onChange={(e) => handleRoundChange(round.id, "mode", e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-200 outline-none text-sm font-bold bg-white focus:border-red-600 cursor-pointer shadow-sm"
                >
                  <option>Offline</option>
                  <option>Online</option>
                  <option>Hybrid</option>
                </select>
              </div>

              {/* Venue */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Location / Access Link</label>
                <input
                  type="text"
                  placeholder="e.g. Panel Room 402 or Teams Link"
                  value={round.venue}
                  onChange={(e) => handleRoundChange(round.id, "venue", e.target.value)}
                  className={`w-full p-4 rounded-xl border outline-none text-sm font-bold transition-all ${
                    roundError.venue ? "border-red-600 bg-red-50" : "border-gray-200 bg-white focus:border-red-600"
                  }`}
                />
                {roundError.venue && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{roundError.venue}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Internal Schedule Date</label>
                <input
                  type="date"
                  value={round.date}
                  onChange={(e) => handleRoundChange(round.id, "date", e.target.value)}
                  className={`w-full p-4 rounded-xl border outline-none text-sm font-bold transition-all ${
                    roundError.date ? "border-red-600 bg-red-50" : "border-gray-200 bg-white focus:border-red-600 shadow-sm"
                  }`}
                />
                {roundError.date && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{roundError.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Starting Timing</label>
                <input
                  type="time"
                  value={round.time}
                  onChange={(e) => handleRoundChange(round.id, "time", e.target.value)}
                  className={`w-full p-4 rounded-xl border outline-none text-sm font-bold transition-all ${
                    roundError.time ? "border-red-600 bg-red-50" : "border-gray-200 bg-white focus:border-red-600 shadow-sm"
                  }`}
                />
                {roundError.time && <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1">{roundError.time}</p>}
              </div>

            </div>
          </div>
        );
      })}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-4 pb-12">
        <button
          onClick={handleAddRound}
          className="bg-white border-2 border-dashed border-gray-300 text-gray-500 px-8 py-4 rounded-xl hover:border-red-600 hover:text-red-600 w-full md:w-auto font-bold text-xs uppercase tracking-widest transition-all hover:shadow-md"
        >
          + Add Functional Round
        </button>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-red-600 text-white px-12 py-4 rounded-xl hover:bg-black w-full md:w-auto font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-60 transition-all shadow-lg active:scale-95"
        >
          {saving ? <FaSpinner className="animate-spin text-lg" /> : <FaCheckCircle className="text-lg" />}
          {saving ? "Processing..." : "Commit Total Schedule"}
        </button>
      </div>

    </div>
  );
};

export default AdminInterviewScheduleForm;