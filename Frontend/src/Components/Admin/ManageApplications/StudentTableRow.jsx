import StatusSelect from "./StatusSelect";

// Status badge config — mirrors what StatusSelect uses
const STATUS_BADGE = {
  applied:     { label: "Pending",      color: "bg-gray-100 text-gray-600 border-gray-200"       },
  shortlisted: { label: "Shortlisted",  color: "bg-blue-50 text-blue-700 border-blue-200"         },
  interview:   { label: "In Progress",  color: "bg-orange-50 text-orange-700 border-orange-200"   },
  selected:    { label: "Selected ✓",   color: "bg-green-50 text-green-700 border-green-200"      },
  rejected:    { label: "Rejected",     color: "bg-red-50 text-red-700 border-red-200"            },
};

/**
 * A single student row inside the ManageApplications table.
 * Props:
 *  - student   {object}  student data from the API
 *  - schedules {array}   list of interview rounds for the job
 *  - onChange  {fn}      called with (applicationId, newStatus) on status change
 */
const StudentTableRow = ({ student, schedules, onChange }) => {
  const formattedDate = student.appliedAt
    ? new Date(student.appliedAt).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
      })
    : "—";

  const normalised = student.applicationStatus?.toLowerCase() || "applied";
  const badge = STATUS_BADGE[normalised] || STATUS_BADGE.applied;

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      {/* Student name & details */}
      <td className="px-6 py-4">
        <div className="font-bold text-gray-900 text-sm">{student.studentName}</div>
        <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">
          {student.enrollmentNumber} · {student.branch} Sem {student.semester}
        </div>
      </td>

      {/* CGPA badge */}
      <td className="px-6 py-4 text-center">
        <span className="bg-[#d8cfc3] text-gray-800 font-bold text-[11px] px-2.5 py-1 rounded-md shadow-sm">
          {student.cgpa ?? "—"}
        </span>
      </td>

      {/* Applied date */}
      <td className="px-6 py-4">
        <span className="text-xs font-bold text-gray-500">{formattedDate}</span>
      </td>

      {/* Current status badge */}
      <td className="px-6 py-4 text-center">
        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider border px-2.5 py-1 rounded-full ${badge.color}`}>
          {badge.label}
        </span>
        {schedules && schedules.length > 0 && (
          <div className="mt-1.5">
            <span className="text-[7px] font-extrabold bg-red-100 text-red-600 px-2 py-0.5 rounded border border-red-200 uppercase tracking-tighter">
              Interview Active
            </span>
          </div>
        )}
      </td>

      {/* Status dropdown */}
      <td className="px-6 py-4 text-center">
        <StatusSelect
          applicationId={student.applicationId}
          currentStatus={student.applicationStatus}
          onChange={onChange}
        />
      </td>
    </tr>
  );
};

export default StudentTableRow;
