import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAvatarColor } from "../../../utils/ui";

const STATUS_STYLES = {
  approved: { badge: "bg-green-100 text-green-700", label: "Approved" },
  rejected:  { badge: "bg-red-100 text-red-700",   label: "Rejected"  },
  pending:   { badge: "bg-yellow-100 text-yellow-700", label: "Pending" },
};

const CompanyCard = ({ data, onStatusChange, undoState, onUndo }) => {
  const status = data?.status || "pending";
  const isUndoable = undoState?.id === data?.id;
  const navigate = useNavigate();
  const { badge, label } = STATUS_STYLES[status] || STATUS_STYLES.pending;

  const goToDetail = (mode) =>
    navigate("/AdminJdDetail", { state: { jobId: data.id, mode } });

  return (
    <div className="bg-[#d8cfc3] p-6 rounded-xl shadow flex flex-col gap-3">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`${getAvatarColor(data?.name)} text-white w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold flex-shrink-0`}>
          {data?.name ? data.name.charAt(0).toUpperCase() : "C"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg truncate">{data?.name || "Company Name"}</h3>
          <p className="text-gray-600 text-sm truncate">{data?.role || "Job Role"}</p>
        </div>
        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex-shrink-0 ${badge}`}>
          {label}
        </span>
      </div>

      <p className="text-red-600 font-bold text-lg">
        {data?.salary || "—"}
      </p>

      <p className="flex items-center gap-2 text-gray-600 text-sm">
        <FaMapMarkerAlt />
        {data?.location || "Location not specified"}
      </p>

      <p className="text-gray-600 text-sm line-clamp-2">
        {data?.process || "No selection process details."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {status === "pending" ? (
          <>
            <button
              onClick={() => onStatusChange(data.id, "rejected")}
              className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm font-semibold"
            >
              ✕ DECLINE
            </button>
            <button
              onClick={() => onStatusChange(data.id, "approved")}
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm font-semibold"
            >
              ✓ APPROVE
            </button>
          </>
        ) : (
          <div className="sm:col-span-2 flex flex-wrap gap-2">
            <button
              disabled
              className={`flex-1 text-white py-2 rounded cursor-not-allowed text-sm font-semibold ${
                status === "approved" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {status === "approved" ? "✓ APPROVED" : "✕ DECLINED"}
            </button>
            {isUndoable && (
              <button
                onClick={onUndo}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition text-sm"
              >
                Undo
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => goToDetail("view")}
          className="border border-black py-2 rounded hover:bg-gray-50 transition text-sm font-semibold"
        >
          VIEW DETAILS
        </button>
        <button
          onClick={() => goToDetail("edit")}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm font-semibold"
        >
          EDIT DETAILS
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
