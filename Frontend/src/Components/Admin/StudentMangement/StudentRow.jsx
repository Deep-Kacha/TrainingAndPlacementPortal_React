import { useState } from "react";
import { FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import PaymentBadge from "./PaymentBadge";
import ApprovalToggle from "./ApprovalToggle";

const BACKEND_BASE = "";

/**
 * A single student row in the Students Management table.
 * Props:
 *  - student   {object}  normalised student data
 *  - onToggle  {fn}      called with (studentId, isApproved)
 *  - onDelete  {fn}      called with (studentId, fullName)
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
        {/* Name + registration date */}
        <td className="p-5 flex items-center gap-3">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-red-600 transition-colors bg-gray-100 p-2 rounded-full cursor-pointer border-none"
          >
            {isExpanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
          </button>
          <div>
            <div className="font-bold text-gray-900">{student.fullName}</div>
            <div className="text-[10px] text-gray-500 font-extrabold uppercase tracking-tight">
              {registeredDate}
            </div>
          </div>
        </td>

        {/* Enrollment number */}
        <td className="p-5 font-bold text-gray-700 text-xs">{student.enrollmentNumber}</td>

        {/* Branch & semester */}
        <td className="p-5">
          <div className="font-bold text-gray-700 text-xs">{student.branch}</div>
          <div className="text-xs text-gray-500">Sem {student.semester}</div>
        </td>

        {/* CGPA */}
        <td className="p-5">
          <div className="text-xs font-extrabold text-[#e7000b]">{student.cgpa} CGPA</div>
        </td>

        {/* Email */}
        <td className="p-5 text-xs font-bold text-gray-600 lowercase">{student.email}</td>

        {/* Payment badge */}
        <td className="p-5">
          <PaymentBadge status={student.paymentStatus} />
        </td>

        {/* Document links */}
        <td className="p-5">
          {student.consentFormPath && (
            <a
              href={`/uploads/${student.consentFormPath}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-blue-600 font-bold no-underline hover:underline text-xs"
            >
              📄 CONSENT
            </a>
          )}
          {student.paymentProofPath && (
            <a
              href={`/uploads/${student.paymentProofPath}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-blue-600 font-bold no-underline hover:underline text-xs mt-1"
            >
              🖼 RECEIPT
            </a>
          )}
          {!student.consentFormPath && !student.paymentProofPath && (
            <span className="text-gray-400 text-xs font-bold">MISSING</span>
          )}
        </td>

        {/* Status pill */}
        <td className="p-5">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
              student.isApproved
                ? "bg-green-100 text-green-700 shadow-sm"
                : "bg-yellow-100 text-yellow-700 shadow-sm"
            }`}
          >
            {student.isApproved ? "APPROVED" : "PENDING"}
          </span>
        </td>

        {/* Approval toggle */}
        <td className="p-5 text-center">
          <ApprovalToggle
            studentId={student.id}
            isApproved={student.isApproved}
            onToggle={onToggle}
          />
        </td>

        {/* Delete */}
        <td className="p-5 text-center">
          <button
            onClick={() => onDelete(student.id, student.fullName)}
            className="text-gray-400 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer text-base"
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>

      {/* Expanded Detailed View Row */}
      {isExpanded && (
        <tr className="bg-gray-50 border-b border-[#c4b5a6]/30">
          <td colSpan="10" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-inner border border-gray-100">
              {/* Academic Details */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3 border-b pb-2">Academic Profile</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500 font-medium">10th Grade:</span> <span className="font-bold text-gray-800">{student.tenth}%</span></p>
                  <p><span className="text-gray-500 font-medium">12th Grade:</span> <span className="font-bold text-gray-800">{student.twelfth}%</span></p>
                  <p><span className="text-gray-500 font-medium">Active Backlogs:</span> <span className={`font-bold ${student.backlogs > 0 ? 'text-red-600' : 'text-green-600'}`}>{student.backlogs}</span></p>
                  <p><span className="text-gray-500 font-medium">Personal Email:</span> <span className="font-bold text-gray-800">{student.personalEmail}</span></p>
                </div>
              </div>

              {/* Guardian Info */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3 border-b pb-2">Guardian Contact</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500 font-medium">Parent Name:</span> <span className="font-bold text-gray-800">{student.parentName}</span></p>
                  <p><span className="text-gray-500 font-medium">Parent Email:</span> <span className="font-bold text-gray-800">{student.parentEmail}</span></p>
                  <p><span className="text-gray-500 font-medium">Parent Mobile:</span> <span className="font-bold text-gray-800">{student.parentMobile}</span></p>
                </div>
              </div>

              {/* Address Info */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3 border-b pb-2">Current Location</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500 font-medium block">Current Address:</span> <span className="font-semibold text-gray-700">{student.currentAddress}</span></p>
                  <p><span className="text-gray-500 font-medium block">Permanent Address:</span> <span className="font-semibold text-gray-700">{student.permanentAddress}</span></p>
                  <p><span className="text-gray-500 font-medium">City/State:</span> <span className="font-bold text-gray-800">{student.city}, {student.state} - {student.pincode}</span></p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default StudentRow;