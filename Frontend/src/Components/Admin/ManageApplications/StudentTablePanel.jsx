import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import StudentTableRow from "./StudentTableRow";

/**
 * Right panel: shows students who applied to the selected job.
 * Props:
 *  - selectedJob   {object|null}  the currently selected job (null = nothing selected)
 *  - students      {array}        list of student applicants
 *  - loading       {boolean}      show spinner while fetching
 *  - onStatusChange {fn}          called with (applicationId, newStatus)
 */
const StudentTablePanel = ({ selectedJob, students, schedules, loading, onStatusChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#c4b5a6] overflow-hidden min-h-[400px]">

      {/* Nothing selected yet */}
      {!selectedJob && (
        <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
          <FaArrowLeft className="text-4xl mb-4 opacity-20" />
          <p className="font-bold uppercase text-sm">
            Select a job from the list to view applicants
          </p>
        </div>
      )}

      {/* Job selected */}
      {selectedJob && (
        <>
          {/* Sub-header */}
          <div className="p-5 border-b border-[#c4b5a6] bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 m-0">{selectedJob.companyName}</h2>
              <p className="text-xs font-bold text-blue-600 uppercase mt-0.5">{selectedJob.jobRole}</p>
            </div>
            
            {/* Display rounds if any */}
            {schedules && schedules.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {schedules.map((s, idx) => (
                  <div key={idx} className="bg-white border border-red-100 rounded-lg px-3 py-1.5 shadow-sm">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Round {idx + 1}</p>
                    <p className="text-[10px] font-bold text-red-600 truncate max-w-[120px] leading-none">{s.round_name}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase w-fit">
              {students.length} Applicants
            </div>
          </div>

          {/* Table area */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-gray-400 flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" /> Loading students...
              </div>
            ) : students.length === 0 ? (
              <div className="p-10 text-center text-gray-500 font-bold uppercase text-xs">
                No applicants found for this job.
              </div>
            ) : (
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead className="bg-gray-50 text-[10px] font-bold uppercase text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4 text-center">CGPA</th>
                    <th className="px-6 py-4">Applied Date</th>
                    <th className="px-6 py-4 text-center">Current Status</th>
                    <th className="px-6 py-4 text-center">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {students.map((student) => (
                    <StudentTableRow
                      key={student.applicationId}
                      student={student}
                      schedules={schedules}
                      onChange={onStatusChange}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentTablePanel;
