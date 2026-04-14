import StatsHeader from "./StatsHeader";
import StudentRow from "./StudentRow";

/**
 * The complete student table including stats header and all rows.
 * Props:
 *  - students  {array}  list of normalised student objects
 *  - onToggle  {fn}     forwarded to StudentRow
 *  - onDelete  {fn}     forwarded to StudentRow
 */
const StudentTable = ({ students, onToggle, onDelete }) => {
  const approved = students.filter((s) => s.isApproved).length;
  const pending  = students.length - approved;

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <StatsHeader total={students.length} approved={approved} pending={pending} />

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[1100px] border-collapse">
          <thead className="bg-gray-100/50 text-[10px] font-extrabold uppercase tracking-widest text-gray-500 border-b border-[#c4b5a6]">
            <tr>
              <th className="p-5">Student Details</th>
              <th className="p-5">Enrollment No.</th>
              <th className="p-5">Branch &amp; Sem</th>
              <th className="p-5">Academic Info</th>
              <th className="p-5">Email Address</th>
              <th className="p-5">Payment</th>
              <th className="p-5">Documents</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-center">Approve</th>
              <th className="p-5 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
