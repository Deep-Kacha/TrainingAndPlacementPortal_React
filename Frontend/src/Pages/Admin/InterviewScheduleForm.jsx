import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const AdminInterviewScheduleForm = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const companyData = location.state?.company || {};

  const [companyDetails, setCompanyDetails] = useState({
    companyName: companyData.name || "Multiicon",
    hrName: "Shweta Jethwa"
  });

  const [rounds, setRounds] = useState([
    { id: 1, roundNo: '', roundName: '', venue: 'Panel No. 2', waitingArea: 'Krishna Murti hall', date: '2025-05-15', time: '08:00' }
  ]);

  const [errors, setErrors] = useState({ companyDetails: {}, rounds: [] });

  const handleCompanyChange = (field, value) => {
    setCompanyDetails({ ...companyDetails, [field]: value });
    setErrors(prev => ({
      ...prev,
      companyDetails: { ...prev.companyDetails, [field]: "" }
    }));
  };

  const handleRoundChange = (id, field, value) => {
    setRounds(rounds.map(r => r.id === id ? { ...r, [field]: value } : r));
    setErrors(prev => ({
      ...prev,
      rounds: prev.rounds.map(rErr => rErr.id === id ? { ...rErr, [field]: "" } : rErr)
    }));
  };

  const handleAddRound = () => {
    setRounds([...rounds, { id: Date.now(), roundNo: '', roundName: '', venue: '', waitingArea: '', date: '', time: '' }]);
  };

  const handleDeleteRound = (id) => {
    if (rounds.length > 1) {
      setRounds(rounds.filter(round => round.id !== id));
      setErrors(prev => ({
        ...prev,
        rounds: prev.rounds.filter(rErr => rErr.id !== id)
      }));
    }
  };

  const validate = () => {
    let isValid = true;
    let newErrors = { companyDetails: {}, rounds: [] };

    if (!companyDetails.companyName.trim()) { newErrors.companyDetails.companyName = "Company Name is required."; isValid = false; }
    if (!companyDetails.hrName.trim()) { newErrors.companyDetails.hrName = "HR Name is required."; isValid = false; }

    newErrors.rounds = rounds.map(r => {
      let rErr = { id: r.id };
      if (!String(r.roundNo).trim()) { rErr.roundNo = "Round No is required."; isValid = false; }
      if (!r.roundName.trim()) { rErr.roundName = "Round Name is required."; isValid = false; }
      if (!r.venue.trim()) { rErr.venue = "Venue is required."; isValid = false; }
      if (!r.waitingArea.trim()) { rErr.waitingArea = "Waiting Area is required."; isValid = false; }
      if (!r.date.trim()) { rErr.date = "Date is required."; isValid = false; }
      if (!r.time.trim()) { rErr.time = "Timing is required."; isValid = false; }
      return rErr;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigate("/AdminInterviewSchedule", { state: { scheduledId: companyData.id } });
    }
  };

  return (
    <div className="w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0 relative z-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
              Interview Schedule Form
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Manage interview Rounds.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border px-5 py-2 rounded-lg w-full md:w-auto"
            >
              ← Back
            </button>
          </div>
        </div>


        {/* Company Details Card */}
        <div className="bg-[#d8cfc3] p-6 md:p-8 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-6">
            Company Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">Company Name</label>
              <input
                type="text"
                value={companyDetails.companyName}
                onChange={(e) => handleCompanyChange("companyName", e.target.value)}
                className={`w-full p-3 rounded-lg border outline-none ${errors.companyDetails?.companyName ? "border-red-500" : ""}`}
              />
              {errors.companyDetails?.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyDetails.companyName}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">HR Name</label>
              <input
                type="text"
                value={companyDetails.hrName}
                onChange={(e) => handleCompanyChange("hrName", e.target.value)}
                className={`w-full p-3 rounded-lg border outline-none ${errors.companyDetails?.hrName ? "border-red-500" : ""}`}
              />
              {errors.companyDetails?.hrName && <p className="text-red-500 text-xs mt-1">{errors.companyDetails.hrName}</p>}
            </div>
          </div>
        </div>

        {/* Rounds Cards */}
        {rounds.map((round, index) => {
          const roundError = errors.rounds?.find(e => e.id === round.id) || {};
          return (
            <div key={round.id} className="bg-[#d8cfc3] p-6 md:p-8 rounded-xl shadow-md mb-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">
                Round {index + 1} Details
              </h2>
              {rounds.length > 1 && (
                <button
                  onClick={() => handleDeleteRound(round.id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
                  title="Delete Round"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Round No */}
              <div>
                <label className="block text-sm mb-1">Round No</label>
                <input
                  type="text"
                  placeholder="e.g. 1"
                  value={round.roundNo}
                  onChange={(e) => handleRoundChange(round.id, "roundNo", e.target.value)}
                  className={`w-full p-3 rounded-lg border outline-none ${roundError.roundNo ? "border-red-500" : ""}`}
                />
                {roundError.roundNo && <p className="text-red-500 text-xs mt-1">{roundError.roundNo}</p>}
              </div>

              {/* Round Name */}
              <div>
                <label className="block text-sm mb-1">Round Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aptitude Test"
                  value={round.roundName}
                  onChange={(e) => handleRoundChange(round.id, "roundName", e.target.value)}
                  className={`w-full p-3 rounded-lg border outline-none ${roundError.roundName ? "border-red-500" : ""}`}
                />
                {roundError.roundName && <p className="text-red-500 text-xs mt-1">{roundError.roundName}</p>}
              </div>

              {/* Venue */}
              <div>
                <label className="block text-sm mb-1">Venue</label>
                <input
                  type="text"
                  value={round.venue}
                  onChange={(e) => handleRoundChange(round.id, "venue", e.target.value)}
                  className={`w-full p-3 rounded-lg border outline-none ${roundError.venue ? "border-red-500" : ""}`}
                />
                {roundError.venue && <p className="text-red-500 text-xs mt-1">{roundError.venue}</p>}
              </div>

              {/* Waiting Area */}
              <div>
                <label className="block text-sm mb-1">Waiting Area</label>
                <input
                  type="text"
                  value={round.waitingArea}
                  onChange={(e) => handleRoundChange(round.id, "waitingArea", e.target.value)}
                  className={`w-full p-3 rounded-lg border outline-none ${roundError.waitingArea ? "border-red-500" : ""}`}
                />
                {roundError.waitingArea && <p className="text-red-500 text-xs mt-1">{roundError.waitingArea}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm mb-1">Date</label>
                <input
                  type="date"
                  value={round.date}
                  onChange={(e) => handleRoundChange(round.id, "date", e.target.value)}
                  className={`w-full p-3 rounded-lg border outline-none ${roundError.date ? "border-red-500" : ""}`}
                />
                {roundError.date && <p className="text-red-500 text-xs mt-1">{roundError.date}</p>}
              </div>

              {/* Timing */}
              <div>
                <label className="block text-sm mb-1">Timing</label>
                <input
                  type="time"
                  value={round.time}
                  onChange={(e) => handleRoundChange(round.id, "time", e.target.value)}
                  className={`w-full p-3 rounded-lg border outline-none ${roundError.time ? "border-red-500" : ""}`}
                />
                {roundError.time && <p className="text-red-500 text-xs mt-1">{roundError.time}</p>}
              </div>
            </div>
          </div>
        )})}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pb-8">
          <button
            onClick={handleAddRound}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full md:w-auto"
          >
            Schedule Another Round
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 w-full md:w-auto"
          >
            Submit
          </button>
        </div>

    </div>
  );
};

export default AdminInterviewScheduleForm;