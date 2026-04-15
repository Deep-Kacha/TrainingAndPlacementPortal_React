import { useState } from "react";
import { FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import PaymentBadge from "./PaymentBadge";
import ApprovalToggle from "./ApprovalToggle";

/**
 * A single student row in the Students Management table.
 */
const StudentRow = ({ student, onToggle, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const registeredDate = student.registeredAt
    ? new Date(student.registeredAt).toLocaleDateString()
    : "N/A";

  return (
    <>
      <tr
        className={`border-b border-[#c4b5a6]/30 text-sm transition-colors hover:bg-white/40 ${
          student.isApproved ? "bg-green-50/30" : "bg-white/10"
        }`}
      >
        <td className="p-5 flex items-center gap-3">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-red-600 transition-colors bg-gray-100 p-2 rounded-full cursor-pointer border-none"
          >
            {isExpanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
          </button>
          <div className="font-bold text-gray-900">{student.fullName}</div>
        </td>

        <td className="p-5 font-bold text-gray-700 text-xs">{student.enrollmentNumber}</td>

        <td className="p-5 text-xs text-gray-500">{student.branch}</td>

        <td className="p-5">
          <div className="text-xs font-extrabold text-[#e7000b]">{student.cgpa} CGPA</div>
        </td>

        <td className="p-5 text-xs font-bold text-gray-600 lowercase">{student.email}</td>

        <td className="p-5">
          <PaymentBadge status={student.paymentStatus} />
        </td>

        <td className="p-5">
          {student.consentFormPath ? (
              <span className="text-blue-600 font-bold text-[10px] uppercase">UPLOADED</span>
          ) : (
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-tight">MISSING</span>
          )}
        </td>

        <td className="p-5">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
            student.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}>
            {student.isApproved ? "APPROVED" : "PENDING"}
          </span>
        </td>

        <td className="p-5 text-center">
            <ApprovalToggle studentId={student.id} isApproved={student.isApproved} onToggle={onToggle} />
        </td>

        <td className="p-5 text-center">
          <button onClick={() => onDelete(student.id, student.fullName)} className="text-gray-400 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer">
            <FaTrashAlt />
          </button>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-gray-50 border-b border-[#c4b5a6]/30">
          <td colSpan="10" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-[10px] font-extrabold uppercase text-gray-400 mb-2">Academic Profile</h4>
                  <div className="text-xs space-y-1">
                    <p><span className="text-gray-500">10th:</span> <span className="font-bold">{student.tenth}%</span></p>
                    <p><span className="text-gray-500">12th:</span> <span className="font-bold">{student.twelfth}%</span></p>
                    <p><span className="text-gray-500">Backlogs:</span> <span className="font-bold text-red-600">{student.backlogs}</span></p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-extrabold uppercase text-gray-400 mb-2">Guardian Context</h4>
                  <div className="text-xs space-y-1">
                    <p><span className="text-gray-500">Parent:</span> <span className="font-bold">{student.parentName}</span></p>
                    <p><span className="text-gray-500">Mobile:</span> <span className="font-bold">{student.parentMobile}</span></p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-extrabold uppercase text-gray-400 mb-2">Location</h4>
                  <p className="text-xs font-bold text-gray-800">{student.city}, {student.state}</p>
                </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default StudentRow;