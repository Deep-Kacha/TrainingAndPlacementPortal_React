import { useState } from "react";
import { FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import PaymentBadge from "./PaymentBadge";
import ApprovalToggle from "./ApprovalToggle";
import { IS_DEMO_MODE } from "../../../demo/demoConfig";
import { openDemoDocument } from "../../../demo/demoStore";

/**
 * A single student row in the Students Management table.
 */
const StudentRow = ({ student, onToggle, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const registeredDate = student.registeredAt
    ? new Date(student.registeredAt).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
      })
    : "N/A";

  const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/uploads";

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

        <td className="p-5 text-center">
          {student.paymentProofPath ? (
            IS_DEMO_MODE ? (
              <button
                type="button"
                onClick={() => openDemoDocument("payment", student)}
                className="inline-block whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase bg-green-100 text-green-700 border border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm cursor-pointer"
              >
                VIEW PROOF
              </button>
            ) : (
              <a 
                href={`${BASE_URL}/${student.paymentProofPath}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase bg-green-100 text-green-700 border border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm"
              >
                VIEW PROOF
              </a>
            )
          ) : (
            <PaymentBadge status={student.paymentStatus} />
          )}
        </td>

        <td className="p-5 text-center">
          {student.consentFormPath ? (
            IS_DEMO_MODE ? (
              <button
                type="button"
                onClick={() => openDemoDocument("consent", student)}
                className="inline-block whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[9px] uppercase px-3 py-1.5 rounded shadow-sm transition-all cursor-pointer border-none"
              >
                VIEW FORM
              </button>
            ) : (
              <a 
                href={`${BASE_URL}/${student.consentFormPath}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[9px] uppercase px-3 py-1.5 rounded shadow-sm transition-all"
              >
                VIEW FORM
              </a>
            )
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
          <td colSpan="11" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-[10px] font-extrabold uppercase text-gray-400 mb-2 font-black tracking-widest">Academic Profile</h4>
                  <div className="text-xs space-y-1">
                    <p><span className="text-gray-500">10th:</span> <span className="font-bold">{student.tenth}%</span></p>
                    <p><span className="text-gray-500">12th:</span> <span className="font-bold">{student.twelfth}%</span></p>
                    <p><span className="text-gray-500">Backlogs:</span> <span className="font-bold text-red-600">{student.backlogs}</span></p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-extrabold uppercase text-gray-400 mb-2 font-black tracking-widest">Guardian Context</h4>
                  <div className="text-xs space-y-1">
                    <p><span className="text-gray-500">Parent:</span> <span className="font-bold">{student.parentName}</span></p>
                    <p><span className="text-gray-500">Mobile:</span> <span className="font-bold">{student.parentMobile}</span></p>
                    <p><span className="text-gray-500">Personal Email:</span> <span className="font-bold">{student.personalEmail}</span></p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-extrabold uppercase text-gray-400 mb-2 font-black tracking-widest">Submission Info</h4>
                  <div className="text-xs space-y-1">
                    <p><span className="text-gray-500">Location:</span> <span className="font-bold text-gray-800">{student.city}, {student.state}</span></p>
                    <p><span className="text-gray-500">Registered On:</span> <span className="font-bold text-blue-600">{registeredDate}</span></p>
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