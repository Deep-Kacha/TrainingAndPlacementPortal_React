/**
 * Toggle switch for approving / revoking a student.
 * Props:
 *  - studentId   {number}   student's DB id
 *  - isApproved  {boolean}  current approval state
 *  - onToggle    {fn}       called with (studentId, newValue)
 */
const ApprovalToggle = ({ studentId, isApproved, onToggle }) => {
  return (
    <div className="flex justify-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isApproved}
          onChange={(e) => onToggle(studentId, e.target.checked)}
        />
        <div className="w-9 h-5 bg-gray-200 rounded-full peer
          peer-checked:after:translate-x-full
          peer-checked:after:border-white
          after:content-['']
          after:absolute after:top-[2px] after:left-[2px]
          after:bg-white after:border-gray-300 after:border
          after:rounded-full after:h-4 after:w-4
          after:transition-all
          peer-checked:bg-green-600"
        />
      </label>
    </div>
  );
};

export default ApprovalToggle;
