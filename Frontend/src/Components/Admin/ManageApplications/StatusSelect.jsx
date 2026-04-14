const STATUSES = ["Applied", "Shortlisted", "Selected", "Rejected"];

const statusStyle = (status) => {
  switch (status) {
    case "Selected":    return "border-green-300 text-green-700 bg-green-50";
    case "Rejected":    return "border-red-300 text-red-700 bg-red-50";
    case "Shortlisted": return "border-blue-300 text-blue-700 bg-blue-50";
    default:            return "border-gray-200 text-gray-700";
  }
};

/**
 * Application status dropdown for a single student row.
 * Props:
 *  - applicationId  {number}  the application's DB id
 *  - currentStatus  {string}  currently selected status
 *  - onChange       {fn}      called with (applicationId, newStatus)
 */
const StatusSelect = ({ applicationId, currentStatus, onChange }) => {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onChange(applicationId, e.target.value)}
      className={`text-xs font-bold uppercase rounded-lg border px-3 py-2 outline-none
        focus:ring-2 focus:ring-red-200 cursor-pointer transition-all
        ${statusStyle(currentStatus)}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;
