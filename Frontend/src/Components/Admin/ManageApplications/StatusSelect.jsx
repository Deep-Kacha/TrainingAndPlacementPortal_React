/**
 * Application status dropdown for a single student's application in the Admin panel.
 * Maps DB enum values to human-readable labels with color coding.
 */

// DB enum → { label, classes }
const STATUS_MAP = {
  applied:     { label: "Pending",      classes: "border-gray-300   text-gray-700   bg-gray-50"   },
  shortlisted: { label: "Shortlisted",  classes: "border-blue-300   text-blue-700   bg-blue-50"   },
  interview:   { label: "In Progress",  classes: "border-orange-300 text-orange-700 bg-orange-50" },
  selected:    { label: "Selected ✓",   classes: "border-green-300  text-green-700  bg-green-50"  },
  rejected:    { label: "Rejected",     classes: "border-red-300    text-red-700    bg-red-50"    },
};

const DB_VALUES = Object.keys(STATUS_MAP);

const StatusSelect = ({ applicationId, currentStatus, onChange }) => {
  const normalised = currentStatus?.toLowerCase() || "applied";
  const current = STATUS_MAP[normalised] || STATUS_MAP.applied;

  return (
    <select
      value={normalised}
      onChange={(e) => onChange(applicationId, e.target.value)}
      className={`text-xs font-bold rounded-lg border px-3 py-2 outline-none
        focus:ring-2 focus:ring-red-200 cursor-pointer transition-all
        ${current.classes}`}
    >
      {DB_VALUES.map((dbVal) => (
        <option key={dbVal} value={dbVal}>
          {STATUS_MAP[dbVal].label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;
