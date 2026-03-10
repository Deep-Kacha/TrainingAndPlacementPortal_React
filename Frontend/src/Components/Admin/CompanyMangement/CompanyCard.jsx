import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const CompanyCard = ({ data, onStatusChange, undoState, onUndo }) => {
  const status = data?.status || "pending";
  const isUndoable = undoState?.id === data?.id;
  const navigate = useNavigate();

  return (
    <div className="bg-[#d8cfc3] p-6 rounded-xl shadow">

      {/* Header */}

      <div className="flex items-center gap-4 mb-3">

        <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold">
          {data?.name ? data.name.charAt(0) : "C"}
        </div>

        <div>
          <h3 className="font-bold text-lg">{data?.name || "Company Name"}</h3>
          <p className="text-gray-600 text-sm">
            {data?.role || "Job Role"}
          </p>
        </div>

      </div>

      {/* Salary */}

      <p className="text-red-600 font-bold text-lg mb-2">
        {data?.salary || "Salary"}
      </p>

      {/* Location */}

      <p className="flex items-center gap-2 text-gray-600 text-sm mb-2">
        <FaMapMarkerAlt />
        {data?.location || "Location"}
      </p>

      {/* Selection Process */}

      <p className="text-gray-600 text-sm mb-4">
        {data?.process || "Selection Process"}
      </p>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-3 mb-3">

        {status === "pending" ? (
          <>
            <button
              onClick={() => onStatusChange(data.id, "declined")}
              className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              ✕ DECLINE
            </button>

            <button
              onClick={() => onStatusChange(data.id, "accepted")}
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              ✓ ACCEPT
            </button>
          </>
        ) : (
          <div className="col-span-2 flex gap-2">
            <button disabled className={`flex-1 text-white py-2 rounded cursor-not-allowed ${status === "accepted" ? "bg-green-600" : "bg-red-600"}`}>
              {status === "accepted" ? "✓ ACCEPTED" : "✕ DECLINED"}
            </button>
            {isUndoable && (
              <button onClick={onUndo} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                Undo
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">

        <button
          onClick={() => navigate("/JdDetail", { state: { mode: "view" } })}
          className="border border-black py-2 rounded hover:bg-gray-50 transition"
        >
          VIEW DETAILS
        </button>

        <button
          onClick={() => navigate("/JdDetail", { state: { mode: "edit" } })}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          EDIT DETAILS
        </button>

      </div>

    </div>
  );
};

export default CompanyCard;
