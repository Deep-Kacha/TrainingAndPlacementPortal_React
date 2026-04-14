import StatusSelect from "./StatusSelect";

/**
 * A single student row inside the ManageApplications table.
 * Props:
 *  - student   {object}  student data from the API
 *  - onChange  {fn}      called with (applicationId, newStatus) on status change
 */
const StudentTableRow = ({ student, onChange }) => {
  const formattedDate = new Date(student.appliedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      {/* Student name & details */}
      <td className="px-6 py-4">
        <div className="font-bold text-gray-900 text-sm">{student.studentName}</div>
        <div className="text-[10px] font-bold text-gray-400 uppercase">
          {student.enrollmentNumber} | {student.branch} Sem {student.semester}
        </div>
      </td>

      {/* CGPA badge */}
      <td className="px-6 py-4 text-center">
        <span className="bg-[#d8cfc3] text-gray-800 font-bold text-[11px] px-2.5 py-1 rounded-md shadow-sm">
          {student.cgpa}
        </span>
      </td>

      {/* Applied date */}
      <td className="px-6 py-4">
        <span className="text-xs font-bold text-gray-500">{formattedDate}</span>
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
