import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../Components/Admin/SideBar";
import { RiDeleteBin6Line } from "react-icons/ri";

const InterviewScheduleForm = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const companyData = location.state?.company || {};

  const [rounds, setRounds] = useState([
    { id: 1, roundNo: '', roundName: '', venue: 'Panel No. 2', waitingArea: 'Krishna Murti hall', date: '2025-05-15', time: '08:00' }
  ]);

  const handleAddRound = () => {
    setRounds([...rounds, { id: Date.now(), roundNo: '', roundName: '', venue: '', waitingArea: '', date: '', time: '' }]);
  };

  const handleDeleteRound = (id) => {
    // Prevent deleting the last round
    if (rounds.length > 1) {
      setRounds(rounds.filter(round => round.id !== id));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden w-full">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4 md:p-8 md:ml-64 overflow-y-auto">

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
                defaultValue={companyData.name || "Muliicon"}
                className="w-full p-3 rounded-lg border outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">HR Name</label>
              <input
                type="text"
                defaultValue="Shweta Jethwa"
                className="w-full p-3 rounded-lg border outline-none"
              />
            </div>
          </div>
        </div>

        {/* Rounds Cards */}
        {rounds.map((round, index) => (
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
                  className="w-full p-3 rounded-lg border outline-none"
                />
              </div>

              {/* Round Name */}
              <div>
                <label className="block text-sm mb-1">Round Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aptitude Test"
                  className="w-full p-3 rounded-lg border outline-none"
                />
              </div>

              {/* Venue */}
              <div>
                <label className="block text-sm mb-1">Venue</label>
                <input
                  type="text"
                  defaultValue={round.venue}
                  className="w-full p-3 rounded-lg border outline-none"
                />
              </div>

              {/* Waiting Area */}
              <div>
                <label className="block text-sm mb-1">Waiting Area</label>
                <input
                  type="text"
                  defaultValue={round.waitingArea}
                  className="w-full p-3 rounded-lg border outline-none"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm mb-1">Date</label>
                <input
                  type="date"
                  defaultValue={round.date}
                  className="w-full p-3 rounded-lg border outline-none"
                />
              </div>

              {/* Timing */}
              <div>
                <label className="block text-sm mb-1">Timing</label>
                <input
                  type="time"
                  defaultValue={round.time}
                  className="w-full p-3 rounded-lg border outline-none"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pb-8">
          <button
            onClick={handleAddRound}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full md:w-auto"
          >
            Schedule Another Round
          </button>
          <button
            onClick={() => navigate("/InterviewSchedule", { state: { scheduledId: companyData.id } })}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 w-full md:w-auto"
          >
            Submit
          </button>
        </div>

      </div>

    </div>
  );
};

export default InterviewScheduleForm;