import { FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";

/**
 * Stats bar shown above the student table.
 * Props:
 *  - total     {number}  total registered students
 *  - approved  {number}  count of approved students
 *  - pending   {number}  count of pending students
 */
const StatsHeader = ({ total, approved, pending }) => {
  return (
    <div className="p-6 border-b border-[#c4b5a6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/30">
      <p className="text-sm font-bold text-gray-700 uppercase tracking-tight flex items-center gap-2">
        <FaUsers className="text-blue-600" />
        <span className="text-xl text-[#e7000b]">{total}</span>
        Total Registered
      </p>

      <div className="flex gap-3">
        <div className="px-4 py-2 bg-green-50 rounded-xl border border-green-200 text-green-700 text-xs font-bold shadow-sm flex items-center gap-1.5">
          <FaCheckCircle /> APPROVED: {approved}
        </div>
        <div className="px-4 py-2 bg-yellow-50 rounded-xl border border-yellow-200 text-yellow-700 text-xs font-bold shadow-sm flex items-center gap-1.5">
          <FaClock /> PENDING: {pending}
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;
